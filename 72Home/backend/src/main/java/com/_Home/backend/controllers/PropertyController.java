package com._Home.backend.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com._Home.backend.models.Property;
import com._Home.backend.services.interfaces.PropertyService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @GetMapping("/properties")
    public List<Property> getMethodName() {
        return propertyService.getAllProperty();
    }

    @GetMapping("/properties/{id}")
    public Property getPropertyById(@RequestParam Integer id) {
        return propertyService.getPropertyById(id);
    }

    @PostMapping("/properties")
    public Property insertProperty(@RequestParam Property property) {
        return propertyService.insertProperty(property);
    }

    @PutMapping("/properties")
    public Property updateProperty(@RequestParam Property property) {
        return propertyService.updateProperty(property);
    }

    @DeleteMapping("/properties/{id}")
    public void deleteProperty(@RequestParam Integer id) {
        propertyService.deleteProperty(id);
    }


}
