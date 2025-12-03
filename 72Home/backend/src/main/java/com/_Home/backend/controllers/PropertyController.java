package com._Home.backend.controllers;

import java.util.List;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com._Home.backend.dto.PropertyWithPriceDTO;
import com._Home.backend.models.Property;
import com._Home.backend.repos.PropertyEvaluationRepo;
import com._Home.backend.services.interfaces.PropertyService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;
    
    @Autowired
    private PropertyEvaluationRepo propertyEvaluationRepo;

    @GetMapping("/properties")
    public ResponseEntity<List<PropertyWithPriceDTO>> getAllProperties() {
        List<Property> properties = propertyService.getAllProperty();
        List<PropertyWithPriceDTO> propertiesWithPrices = properties.stream()
            .map(property -> {
                Double latestPrice = propertyEvaluationRepo.findLatestByProperty(property)
                    .map(evaluation -> evaluation.getPropertyValue())
                    .orElse(null);
                return PropertyWithPriceDTO.fromProperty(property, latestPrice);
            })
            .collect(Collectors.toList());
        return ResponseEntity.ok(propertiesWithPrices);
    }

    @GetMapping("/properties/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Integer id) {
        Property property = propertyService.getPropertyById(id);
        if (property != null) {
            return ResponseEntity.ok(property);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/properties")
    public ResponseEntity<Property> createProperty(@RequestBody Property property) {
        Property createdProperty = propertyService.insertProperty(property);
        return ResponseEntity.ok(createdProperty);
    }

    @PutMapping("/properties/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Integer id, @RequestBody Property propertyDetails) {
        Property existingProperty = propertyService.getPropertyById(id);
        if (existingProperty != null) {
            // Update fields from propertyDetails to existingProperty
            // Add specific field updates as needed based on Property model
            Property updatedProperty = propertyService.updateProperty(propertyDetails);
            return ResponseEntity.ok(updatedProperty);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/properties/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Integer id) {
        Property existingProperty = propertyService.getPropertyById(id);
        if (existingProperty != null) {
            propertyService.deleteProperty(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
