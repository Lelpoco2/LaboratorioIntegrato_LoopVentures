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



import org.springframework.stereotype.Service;

import com._Home.backend.models.Property;
import com._Home.backend.models.PropertyEvaluation;

@Service
public class PropertyEvaluationServiceImpl implements PropertyEvaluationService {

    @Override
    public Double evaluateProperty(Property property) {
        

        


        throw new UnsupportedOperationException("Unimplemented method 'evaluateProperty'");
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


    // Private methods for evaluation calculations

    public Double[] getLocationByAddress(String address) {

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

    private Double calculateBaseSquareMeterSurfacePrice(String address, Double surfaceArea) {
        
         

        return null;
    }

    

}
