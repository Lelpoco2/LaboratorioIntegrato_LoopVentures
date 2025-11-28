package com._Home.backend.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com._Home.backend.dtos.EmailRequestDTO;
import com._Home.backend.models.OmiZone;
import com._Home.backend.models.Property;
import com._Home.backend.models.PropertyEvaluation;
import com._Home.backend.models.User;
import com._Home.backend.services.classes.TemplateLoaderService;
import com._Home.backend.services.implementations.PropertyEvaluationServiceImpl;
import com._Home.backend.services.interfaces.MailService;
import com._Home.backend.services.interfaces.PropertyEvaluationService;
import com._Home.backend.services.interfaces.PropertyService;
import com._Home.backend.services.interfaces.UserService;

@RestController
@RequestMapping("/api")
public class MainController {

    @Autowired
    private UserService userService;

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private PropertyEvaluationService propertyEvaluationService;

    @Autowired
    private PropertyEvaluationServiceImpl propertyEvaluationServiceImpl;

    @Autowired
    private MailService mailService;

    @Autowired
    private TemplateLoaderService templateLoaderService;

    @PostMapping("/form-submit")
    public ResponseEntity<Map<String, String>> formSubmit(@RequestBody EmailRequestDTO emailData) {
        try {
            // 1. Save the property to the database
            Property savedProperty = propertyService.insertProperty(emailData.getProperty());
            
            // 2. Set the property ID to the user and save the user
            User user = emailData.getUser();
            user.setPropertyId(savedProperty.getId());
            User savedUser = userService.insertUser(user);
            
            // 3. Calculate the property value
            Map<String, Double> evaluationResult = propertyEvaluationService.evaluateProperty(savedProperty);
            Double propertyValue = evaluationResult.get("totalPrice");
            
            // 4. Save the property evaluation
            PropertyEvaluation propertyEvaluation = new PropertyEvaluation();
            propertyEvaluation.setProperty(savedProperty);
            propertyEvaluation.setUser(savedUser);
            propertyEvaluation.setPropertyValue(propertyValue);
            propertyEvaluationService.savePropertyEvaluation(propertyEvaluation);
            
            // 5. Get OmiZone data for the email template
            String fullAddress = savedProperty.getAddress() + ", " + savedProperty.getZipCode() + " " + savedProperty.getCity();
            List<OmiZone> omiZones = propertyEvaluationServiceImpl.getOmiZoneByAddress(fullAddress);
            
            // Use the first zone for 'Abitazioni civili' if available
            OmiZone omiZone = omiZones.stream()
                .filter(zone -> "Abitazioni civili".equals(zone.getDescription()))
                .findFirst()
                .orElse(omiZones.get(0));

            // 6. Prepare template variables
            Map<String, String> variables = Map.of(
                "name", String.valueOf(savedUser.getFirstName()),
                "valuation", String.valueOf(propertyValue),
                "valuationMin", String.valueOf(omiZone.getMinSelling()),
                "valuationMax", String.valueOf(omiZone.getMaxSelling()),
                "propertyAddress", String.valueOf(savedProperty.getAddress()),
                "surface", String.valueOf(savedProperty.getSurfaceArea()),
                "rooms", String.valueOf(savedProperty.getRooms()),
                "floor", String.valueOf(savedProperty.getFloor()),
                "energyClass", String.valueOf(savedProperty.getEnergeticClass()));

            // 7. Load template and send email
            String htmlBody = templateLoaderService.loadTemplate("template1.html", variables);
            mailService.sendEvaluationEmail(savedUser.getEmail(), "La Tua Valutazione Immobiliare", htmlBody);
            
            // Return success response
            return ResponseEntity.ok(Map.of(
                "message", "Form submitted successfully",
                "propertyValue", String.valueOf(propertyValue)
            ));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Failed to process form submission",
                "details", e.getMessage()
            ));
        }
    }
}
