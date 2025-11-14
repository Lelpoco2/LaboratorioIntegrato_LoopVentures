package com._Home.backend.models;

import com._Home.backend.enums.Condition;
import com._Home.backend.enums.EnergeticClass;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "properties")
@Data
public class Property {

    private Integer id;
    private String address;
    private String city;
    private String zipCode;
    private Double surfaceArea;
    private Integer rooms;
    private Integer floor; 
    private EnergeticClass energeticClass; //
    private Condition condition; //
    private Boolean hasBox; 
    private Boolean hasElevator; 
    private Boolean hasBalcony;
    private Boolean hasGarden;
    private Boolean hasTerrace;


}
