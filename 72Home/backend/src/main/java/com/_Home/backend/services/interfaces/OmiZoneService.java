package com._Home.backend.services.interfaces;

import java.util.List;

import com._Home.backend.models.OmiZone;

public interface OmiZoneService {

    List<OmiZone> getAllOmiZones();
    List<OmiZone> getOmiZoneByOmiZoneName(String name);
    OmiZone insertOmiZone(OmiZone omiZone);
    OmiZone updateOmiZone(OmiZone omiZone);
    void deleteOmiZone(Integer id);
    
}
