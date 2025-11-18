package com._Home.backend.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URLEncoder;
import java.util.List;
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

@Service
public class PropertyEvaluationServiceImpl implements PropertyEvaluationService {

    @Autowired
    private OmiZoneRepo omiZoneRepository;


    @Override
    public Double evaluateProperty(Property property) {
        
        Double totalCoefficient = 0.0;
        
        Double[] coords = getLocationByAddress(property.getAddress() + "," + property.getCity());

        Double basePrice = calculateBaseSquareMeterSurfacePrice(coords, property.getSurfaceArea());

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

        Double energyClassCoeff = energyClassCoefficient(property.getEnergeticClass());

        Double buildingTypeCoeff = buildingTypeCoefficient(property.getBuildingType());

        Double heatingTypeCoeff = heatingTypeCoefficient(property.getHeatingType());


        totalCoefficient = roomCoeff * bathroomCoeff * floorCoeff * boxCoeff * balconyCoeff * terraceCoeff
                         * conditionCoeff * energyClassCoeff * buildingTypeCoeff * heatingTypeCoeff;

        Double finalPrice = basePrice * totalCoefficient;

        return Math.round(finalPrice * 100.0) / 100.0;
        
    }

    @Override
    public List<PropertyEvaluation> getAllPropertyEvaluations() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllPropertyEvaluations'");
    }

    @Override
    public PropertyEvaluation savePropertyEvaluation(PropertyEvaluation propertyEvaluation) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'savePropertyEvaluation'");
    }

    @Override
    public PropertyEvaluation getPropertyEvaluationById(Integer id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getPropertyEvaluationById'");
    }

    public OmiZone getOmiZoneByWktPoint(String wktPoint) {
        return omiZoneRepository.findZoneContainingPoint(wktPoint);
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

    private Double calculateBaseSquareMeterSurfacePrice(Double[] coords, Double surfaceArea) {
        
         String wktPoint = String.format("POINT(%f %f)", coords[1], coords[0]);
         OmiZone omiZone = omiZoneRepository.findZoneContainingPoint(wktPoint);
         if (omiZone != null) {
            Double avarageSquareMeterPrice = (omiZone.getMaxSelling()+omiZone.getMinSelling()) / 2;
            Double basePrice = avarageSquareMeterPrice * surfaceArea;
            
            return basePrice;
         } 

        return null;
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


    private Double boxCoefficient (Boolean hasBox) {
        return hasBox ? 1.03 : 1.0;
    }

    private Double balconyCoefficient (Boolean hasBalcony) {
        return hasBalcony ? 1.03 : 1.0;
    }

    private Double terraceCoefficient (Boolean hasTerrace) {
        return hasTerrace ? 1.07 : 1.0;
    }
}
