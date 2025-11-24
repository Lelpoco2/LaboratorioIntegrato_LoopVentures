package com._Home.backend.services.interfaces;

import java.util.List;

import com._Home.backend.models.OmiZone;

public interface OmiZoneService {

    List<OmiZone> getAllOmiZones();
    OmiZone getOmiZoneById(Integer id);
    OmiZone insertOmiZone(OmiZone omiZone);
    OmiZone updateOmiZone(OmiZone omiZone);
    void deleteOmiZone(Integer id);
    
}
