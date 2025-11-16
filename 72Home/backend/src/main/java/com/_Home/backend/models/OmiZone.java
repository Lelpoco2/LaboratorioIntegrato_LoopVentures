package com._Home.backend.models;

import com._Home.backend.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
    @Column(name = "nome_comune")
    private String cityName;
    @Column(name = "provincia")
    private String province;
    @Column(name = "regione")
    private String region;
    @Column(name = "comune_cat")
    private String cityCat;
    @Column(name = "comune_amm")
    private String cityAmm;
    @Column(name = "fascia")
    private char zone;
    @Column(name = "zona_omi")
    private String omiZone;
    @Column(name = "descr_tipologia")
    private String description;
    @Column(name = "area_territoriale")
    private String territorialArea;
    @Column(name = "stato")
    @Enumerated(EnumType.STRING)
    private Status status;
    @Column(name = "cod_tip")
    private Double codTip;
    @Column(name = "compr_max")
    private Double maxSelling; 
    @Column(name = "compr_min")
    private Double minSelling;
    @Column(name = "loc_max")
    private Double maxRenting;
    @Column(name = "loc_min")
    private Double minRenting;
    @Column(name = "geometry", columnDefinition = "geometry")
    private String geometry;

}
