package com._Home.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com._Home.backend.models.Property;
import com._Home.backend.repos.PropertyRepo;



public class PropertyServiceImpl implements PropertyService {

    @Autowired
    private PropertyRepo propertyRepo;



    @Override
    public List<Property> getAllProperty() {
        return propertyRepo.findAll();
    }


    @Override
    public Property insertProperty(Property property) {
        return propertyRepo.save(property);
    }


    @Override
    public Property getPropertyById(Integer id) {
        return propertyRepo.findById(id).orElse(null);
    }


    @Override
    public Property updateProperty(Property property) {
        return propertyRepo.save(property);
    }


    @Override
    public void deleteProperty(Integer id) {
        propertyRepo.deleteById(id);
    }



}
