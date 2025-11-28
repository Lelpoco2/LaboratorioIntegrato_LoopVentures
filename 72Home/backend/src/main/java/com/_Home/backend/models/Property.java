package com._Home.backend.models;

import com._Home.backend.enums.BuildingType;
import com._Home.backend.enums.Condition;
import com._Home.backend.enums.EnergeticClass;
import com._Home.backend.enums.HeatingType;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "properties")
@Data
public class Property {

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String address;
    private String city;
    private String zipCode;
    private Double surfaceArea; //
    private Integer rooms; //
    private Integer floor; //
    private EnergeticClass energeticClass;
    @Column(name = "property_condition")
    private Condition condition; // 
    private Boolean hasBox; //
    private Double boxSurfaceArea; // Not mandatory
    private Boolean hasElevator; //
    private Boolean hasBalcony; //
    private Boolean hasGarden; //
    private Boolean hasTerrace; //
    private Integer bathrooms; //
    private HeatingType heatingType; //
    private BuildingType buildingType; //

    @JsonIgnore
    @Column(name = "created_at")
    private java.sql.Timestamp createdAt;


}
