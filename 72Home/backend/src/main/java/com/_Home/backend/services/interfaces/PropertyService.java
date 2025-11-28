package com._Home.backend.services.interfaces;

import java.util.List;

import com._Home.backend.models.Property;

public interface PropertyService {

    List<Property> getAllProperty();
    Property insertProperty(Property property);
    Property getPropertyById(Integer id);
    Property updateProperty(Property property);
    void deleteProperty(Integer id);

    

}
