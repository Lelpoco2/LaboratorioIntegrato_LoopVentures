package com._Home.backend.models;

import com._Home.backend.enums.Status;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "omi_zones")
@Data
public class OmiZone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String cityName;
    private String province;
    private String region;
    private String cityCat;
    private String cityAmm;
    private char zone;
    private String omiZone;
    private String description;
    private String TerritorialArea;
    private Status status;
    private Double codTip;
    private Double maxSelling; 
    private Double minSelling;
    private Double maxRenting;
    private Double minRenting;
    private String geometry;

}
