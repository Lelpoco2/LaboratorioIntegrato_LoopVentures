package com._Home.backend.services.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com._Home.backend.models.OmiZone;
import com._Home.backend.repos.OmiZoneRepo;
import com._Home.backend.services.interfaces.OmiZoneService;

@Service
public class OmiZoneImpl implements OmiZoneService {

    @Autowired
    private OmiZoneRepo omiZoneRepo;

    @Override
    public List<OmiZone> getAllOmiZones() {
        return omiZoneRepo.findAll();
    }

    @Override
    public List<OmiZone> getOmiZoneByOmiZoneName(String name) {
        return omiZoneRepo.findByOmiZone(name);
    }

    @Override
    public OmiZone insertOmiZone(OmiZone omiZone) {
        return omiZoneRepo.save(omiZone);
    }

    @Override
    public OmiZone updateOmiZone(OmiZone omiZone) {
        return omiZoneRepo.save(omiZone);
    }

    @Override
    public void deleteOmiZone(Integer id) {
        omiZoneRepo.deleteById(id);
    }


}
