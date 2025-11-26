package com._Home.backend.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com._Home.backend.dtos.EmailRequestDTO;
import com._Home.backend.models.OmiZone;
import com._Home.backend.models.Property;
import com._Home.backend.models.User;
import com._Home.backend.services.classes.TemplateLoaderService;
import com._Home.backend.services.implementations.MailServiceImpl;
import com._Home.backend.services.implementations.PropertyEvaluationServiceImpl;
import com._Home.backend.services.interfaces.OmiZoneService;
import com._Home.backend.services.interfaces.UserService;

// Controller for testing various services. It is not show in in the Swagger API documentation.

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private TemplateLoaderService templateLoaderService;

    @Autowired
    private MailServiceImpl mailService;

    @Autowired
    private PropertyEvaluationServiceImpl propeval;

    @Autowired
    private UserService userService;

    @Autowired
    private OmiZoneService omiZoneService;

    @GetMapping("/hello")
    public Map<String, String> hello() {
        return Map.of("message", "Hello, world!");
    }

    @GetMapping("/user")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/userpost")
    public User insertUser(@RequestBody User user) {
        return userService.insertUser(user);
    }

    @GetMapping("/omizones")
    public List<OmiZone> getAllOmiZones() {
        return omiZoneService.getAllOmiZones();
    }

    @GetMapping("/calculate")
    public Double getPrice(@RequestParam Property property) {
        return propeval.evaluateProperty(property);
    }

    @GetMapping("/findzone")
    public OmiZone testFindZone(@RequestParam Double lon, @RequestParam Double lat) {
        String wktPoint = String.format("POINT(%f %f)", lon, lat);
        return propeval.getOmiZoneByWktPoint(wktPoint);
    }

    @PostMapping("/evaluate")
    public Double evaluateFullProperty(@RequestBody Property property) {
        return propeval.evaluateProperty(property);
    }

    // The errors showing are normals because the Repo classes are not yet fixed.
    @PostMapping("/send")
    public ResponseEntity<Map<String,String>> sendEmail(@RequestBody EmailRequestDTO request) throws Exception {

        try {
            User user = request.getUser();
            Property property = request.getProperty();
            
            // Get property valuation
            Double valuation = propeval.evaluateProperty(property);
            
            // Get OmiZone by address to retrieve min/max selling values
            String fullAddress = property.getAddress() + "," + property.getZipCode() + property.getCity();
            OmiZone omiZone = propeval.getOmiZoneByAddress(fullAddress);

            Map<String, String> variables = Map.of(
                    "name", String.valueOf(user.getFirstName()),
                    "valuation", String.valueOf(valuation),
                    "valuationMin", String.valueOf(omiZone.getMinSelling()),
                    "valuationMax", String.valueOf(omiZone.getMaxSelling()),
                    "propertyAdress", String.valueOf(property.getAddress()),
                    "surface", String.valueOf(property.getSurfaceArea()),
                    "rooms", String.valueOf(property.getRooms()),
                    "floor", String.valueOf(property.getFloor()),
                    "EnergyClass", String.valueOf(property.getEnergeticClass()));


            String htmlBody = templateLoaderService.loadTemplate("template1.html", variables);

            mailService.sendEvaluationEmail(user.getEmail(), "La Tua Valutazione Immobiliare", htmlBody);

            return ResponseEntity.ok(Map.of("status", "Email sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("status", "Failed to send email: " + e.getMessage()));
        }
    }

    // * Change to public the private method getLocationByAddress in
    // PropertyEvaluationServiceImpl to use this test endpoint

    // @GetMapping("/findzonebyaddress")
    // public OmiZone testFindZoneByAddress(@RequestParam String address) {
    // Double[] coords = propeval.getLocationByAddress(address);
    // if (coords == null) return null;
    // String wktPoint = String.format("POINT(%f %f)", coords[1], coords[0]);
    // return propeval.getOmiZoneByWktPoint(wktPoint);
    // }

    // * Change to public the private method getLocationByAddress in
    // PropertyEvaluationServiceImpl to use this test endpoint

    // @GetMapping("/geocode")
    // public ResponseEntity<Double[]> geocodeProperty() {
    // Double[] coords = propeval.getLocationByAddress("Via Sant'Ottavio 30, Torino,
    // TO");
    // if (coords != null) {
    // return ResponseEntity.ok(coords);
    // } else {
    // return ResponseEntity.ok(new Double[] {0.0, 0.0});
    // }
    // }

}
