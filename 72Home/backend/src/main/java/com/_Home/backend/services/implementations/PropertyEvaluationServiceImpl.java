package com._Home.backend.services.implementations;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com._Home.backend.enums.BuildingType;
import com._Home.backend.enums.Condition;
import com._Home.backend.enums.EnergeticClass;
import com._Home.backend.enums.HeatingType;
import com._Home.backend.models.OmiZone;
import com._Home.backend.models.Property;
import com._Home.backend.models.PropertyEvaluation;
import com._Home.backend.repos.OmiZoneRepo;
import com._Home.backend.repos.PropertyEvaluationRepo;
import com._Home.backend.services.interfaces.PropertyEvaluationService;

@Service
public class PropertyEvaluationServiceImpl implements PropertyEvaluationService {

    @Autowired
    private OmiZoneRepo omiZoneRepository;

    @Autowired
    private PropertyEvaluationRepo propertyEvaluationRepo;


    @Override
    public Map<String, Double> evaluateProperty(Property property) {
        
        Double totalCoefficient = 0.0;
        
        Double[] coords = getLocationByAddress(property.getAddress() + ", " + property.getZipCode() + " " + property.getCity());
        
        if (coords == null) {
            throw new IllegalArgumentException("Impossibile ottenere le coordinate per l'indirizzo fornito: " + 
                property.getAddress() + ", " + property.getZipCode() + " " + property.getCity());
        }

        // Fetch OMI zones once for this location
        String wktPoint = String.format("POINT(%f %f)", coords[1], coords[0]);
        List<OmiZone> omiZones = omiZoneRepository.findZoneContainingPoint(wktPoint);
        
        if (omiZones == null || omiZones.isEmpty()) {
            throw new IllegalArgumentException("Nessuna zona OMI trovata per le coordinate fornite.");
        }

        Double basePrice = calculateBaseSquareMeterSurfacePrice(omiZones, property.getSurfaceArea());

        Double roomCoeff = roomCoefficent(property.getRooms());
        
        Double bathroomCoeff = bathroomCoefficient(property.getBathrooms());
        
        Double floorCoeff = 0.0;

        if (property.getBuildingType() == BuildingType.VILLA || property.getBuildingType() == BuildingType.INDEPENDENT_HOUSE) {
            floorCoeff = 1.0; 
        } else { 
            floorCoeff = floorCoefficient(property.getFloor(), property.getHasElevator(), property.getHasGarden());
        }

        Double boxCoeff = boxCoefficient(property.getHasBox());
        
        Double balconyCoeff = balconyCoefficient(property.getHasBalcony());
        
        Double terraceCoeff = terraceCoefficient(property.getHasTerrace());

        Double conditionCoeff = conditionCoefficient(property.getCondition());

        Double canteenCoeff = canteenCoefficient(property.getHasCanteen());

        Double energyClassCoeff = energyClassCoefficient(property.getEnergeticClass());

        Double buildingTypeCoeff = buildingTypeCoefficient(property.getBuildingType());

        Double heatingTypeCoeff = heatingTypeCoefficient(property.getHeatingType());


        totalCoefficient = roomCoeff * bathroomCoeff * floorCoeff * boxCoeff * balconyCoeff * terraceCoeff
                         * conditionCoeff * energyClassCoeff * buildingTypeCoeff * heatingTypeCoeff * canteenCoeff;

        Double finalPrice = basePrice * totalCoefficient;
        
        Map<String, Double> result = new HashMap<>();
        result.put("propertyPrice", finalPrice);
        
        // Calculate box price separately if hasBox is true and boxSurfaceArea is provided
        if (property.getHasBox() != null && property.getHasBox() && 
            property.getBoxSurfaceArea() != null && property.getBoxSurfaceArea() > 0) {
            try {
                Double boxPrice = calculateBoxSurfacePrice(omiZones, property.getBoxSurfaceArea());
                result.put("boxPrice", boxPrice);
            } catch (IllegalArgumentException e) {
                // Box OMI data not available for this location, set to 0
                result.put("boxPrice", 0.0);
            }
        } else {
            result.put("boxPrice", 0.0); 
        }
        
        result.put("totalPrice", result.get("propertyPrice") + result.get("boxPrice"));
        
        return result;
        
    }

    @Override
    public List<PropertyEvaluation> getAllPropertyEvaluations() {
        return propertyEvaluationRepo.findAll();
    }

    @Override
    public PropertyEvaluation savePropertyEvaluation(PropertyEvaluation propertyEvaluation) {
        return propertyEvaluationRepo.save(propertyEvaluation);
    }

    @Override
    public PropertyEvaluation getPropertyEvaluationById(Integer id) {
        return propertyEvaluationRepo.findById(id).orElse(null);
    }

    public List<OmiZone> getOmiZoneByWktPoint(String wktPoint) {
        return omiZoneRepository.findZoneContainingPoint(wktPoint);
    }

    public List<OmiZone> getOmiZoneByAddress(String address) {
        Double[] coords = getLocationByAddress(address);
        if (coords == null) {
            throw new IllegalArgumentException("Impossibile ottenere le coordinate per l'indirizzo fornito: " + address);
        }
        String wktPoint = String.format("POINT(%f %f)", coords[1], coords[0]);
        List<OmiZone> zones = omiZoneRepository.findZoneContainingPoint(wktPoint);
        if (zones == null || zones.isEmpty()) {
            throw new IllegalArgumentException("Nessuna zona OMI trovata per l'indirizzo: " + address);
        }
        return zones;
    }


    //! Private methods for evaluation calculations

    private Double[]  getLocationByAddress(String address) {

        Double DELTA_LAT = 0.0011245;
        Double DELTA_LON = 0.0012913;
        
        try {
            String encodedAddress = URLEncoder.encode(address, "UTF-8");
            String urlString = "https://nominatim.openstreetmap.org/search?q=" + encodedAddress + "&format=json&limit=1";
            
            HttpURLConnection conn = (HttpURLConnection) URI.create(urlString).toURL().openConnection();

            conn.setRequestProperty("User-Agent", "omiapp/1.0");
            conn.setConnectTimeout(10000);
            conn.setReadTimeout(10000);
            
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            StringBuilder response = new StringBuilder();
            String line;
            while ((line = in.readLine()) != null) {
                response.append(line);
            }
            in.close();

            JSONArray array = new JSONArray(response.toString());
            if (array.length() > 0) {
                JSONObject obj = array.getJSONObject(0);
                Double lat = obj.getDouble("lat");
                Double lon = obj.getDouble("lon");
                return new Double[] { lat-DELTA_LAT, lon-DELTA_LON };
            }

        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("Errore di encoding dell'indirizzo: " + e.getMessage(), e);
        } catch (java.io.IOException e) {
            throw new RuntimeException("Errore di comunicazione con il servizio di geolocalizzazione: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Errore generico durante la geolocalizzazione: " + e.getMessage(), e);
        }

        return null;
    }

    private Double calculateBaseSquareMeterSurfacePrice(List<OmiZone> omiZones, Double surfaceArea) {
        // Filter for "Abitazioni civili" with "NORMALE" or "OTTIMO" status
        List<OmiZone> filteredZones = omiZones.stream()
            .filter(zone -> "Abitazioni civili".equals(zone.getDescription()))
            .filter(zone -> zone.getStatus() != null && 
                ("NORMALE".equals(zone.getStatus().name()) || "OTTIMO".equals(zone.getStatus().name())))
            .toList();
        
        if (filteredZones.isEmpty()) {
            throw new IllegalArgumentException("Nessuna zona OMI per 'Abitazioni civili' con stato 'NORMALE' o 'OTTIMO' trovata.");
        }
        
        // Calculate average price across all matching zones
        Double totalAveragePrice = filteredZones.stream()
            .mapToDouble(zone -> (zone.getMaxSelling() + zone.getMinSelling()) / 2)
            .average()
            .orElseThrow(() -> new IllegalArgumentException("Errore nel calcolo del prezzo medio."));
        
        Double basePrice = totalAveragePrice * surfaceArea;
        
        return basePrice;
    }

    private Double roomCoefficent(Integer room)
    {
        if (room == null) throw new IllegalArgumentException("Il campo room non può essere null");

        else if (room == 1){
            return 1.07;
        }
        else if (room == 2){
            return 1.0;
        }
        else if (room == 3){
            return 0.98;
        }
        else if (room == 4){
            return 0.97;
        }
        else if (room >= 5){
            return 0.95;
        }
        else {
            return 1.0;
        }
        
    }

    private Double bathroomCoefficient(Integer bathroom){
        if (bathroom == null) throw new IllegalArgumentException("Il campo bathroom non può essere null");
        else if (bathroom == 1) {
            return 1.0;
        } else if (bathroom == 2) {
            return 1.05;
        } else if (bathroom >= 3) {
            return 1.08;
        } else {
            return 1.0;
        }
    }

    private Double floorCoefficient(Integer floor, Boolean hasElevator, Boolean hasGarden)
    {
        if(floor == null) throw new IllegalArgumentException("Il campo floor non può essere null");

        if (floor == 0 && hasGarden) {
            return 1.10;
        } else if (floor == 0 && (hasGarden == null || !hasGarden)) {
            return 0.9;
        } 
        
        if (floor == 1) return 0.97;
        else if (floor == 2) return 1.00;
        
        if(hasElevator) { 
            if (floor == 3) return 1.05;
            else if (floor >= 4) return 1.10;

        } else {

            if (floor == 3) return 0.90;
            else if (floor >= 4) return 0.80;
        } 
        
        return 1.0;

    }

    private Double conditionCoefficient(Condition condition){
        if (condition == null) throw new IllegalArgumentException("Il campo Condition non può essere null");
        switch (condition) {
            case NEW: return 1.2;
            case GOOD: return 1.1;
            case BAD: return 0.9;
            case NEEDS_RENOVATION: return 0.8;
            default: return 1.0;
        }
    }

    private Double energyClassCoefficient(EnergeticClass energeticClass) {
        // If the customer do not know the energetic class, we assume a neutral coefficient
        if (energeticClass == null) return 1.0;
        switch (energeticClass) {
            case A4: return 1.15;
            case A3: return 1.13;
            case A2: return 1.11;
            case A1: return 1.09;
            case A:  return 1.10;
            case B:  return 1.06;
            case C:  return 1.03;
            case D:  return 1.0;
            case E:  return 0.95;
            case F:  return 0.92;
            case G:  return 0.88;
            default: return 1.0;
        }
    }

    private Double buildingTypeCoefficient(BuildingType buildingType){
        if (buildingType == null) throw new IllegalArgumentException("Il campo BuildingType non può essere null");
        switch (buildingType) {
            case APARTMENT: return 1.0;
            case INDEPENDENT_HOUSE: return 1.05;
            case VILLA: return 1.10;
            default: return 1.0;
        }

    }

    private Double heatingTypeCoefficient(HeatingType heatingType) {
        if (heatingType == null) throw new IllegalArgumentException("Il campo HeatingType non può essere null");
        switch (heatingType) {
            case  INDEPENDENT: return 1.05;
            case  CENTRALIZED: return 1.0;
            case NONE: return 0.85;
            default: return null;
        }
    }


    private Double calculateBoxSurfacePrice(List<OmiZone> omiZones, Double boxSurfaceArea) {
        // Filter for "Box" or "Autorimesse" description with "BUONO", "NORMALE" or "OTTIMO" status
        List<OmiZone> filteredBoxZones = omiZones.stream()
            .filter(zone -> zone.getDescription() != null && 
                (zone.getDescription().contains("Box") || zone.getDescription().contains("Autorimesse")))
            .filter(zone -> zone.getStatus() != null && 
                ("BUONO".equals(zone.getStatus().name()) || 
                 "NORMALE".equals(zone.getStatus().name()) || 
                 "OTTIMO".equals(zone.getStatus().name())))
            .toList();
        
        if (filteredBoxZones.isEmpty()) {
            throw new IllegalArgumentException("Nessuna zona OMI per 'Box/Autorimesse' con stato 'BUONO', 'NORMALE' o 'OTTIMO' trovata.");
        }
        
        // Calculate average price across all matching box zones
        Double totalAverageBoxPrice = filteredBoxZones.stream()
            .mapToDouble(zone -> (zone.getMaxSelling() + zone.getMinSelling()) / 2)
            .average()
            .orElseThrow(() -> new IllegalArgumentException("Errore nel calcolo del prezzo medio del Box."));
        
        Double boxPrice = totalAverageBoxPrice * boxSurfaceArea;
        
        return boxPrice;
    }

    private Double boxCoefficient (Boolean hasBox) {
        return hasBox ? 1.03 : 1.0;
    }

    private Double balconyCoefficient (Boolean hasBalcony) {
        return hasBalcony ? 1.03 : 1.0;
    }

    private Double terraceCoefficient (Boolean hasTerrace) {
        return hasTerrace ? 1.07 : 1.0;
    }

    private Double canteenCoefficient(Boolean hasCanteen) {
        return hasCanteen ? 1.02 : 1.0;
    }

    /**
     * Rounds price to nearest hundred and formats with thousand separators
     * Example: 493450.0 -> 493400 -> "493.400"
     */
    private String formatPrice(Double price) {
        // Round to nearest hundred
        long rounded = Math.round(price / 100.0) * 100;
        
        // Format with thousand separator (dot)
        DecimalFormat formatter = new DecimalFormat("#,###", DecimalFormatSymbols.getInstance(Locale.ITALIAN));
        return formatter.format(rounded);
    }
}
