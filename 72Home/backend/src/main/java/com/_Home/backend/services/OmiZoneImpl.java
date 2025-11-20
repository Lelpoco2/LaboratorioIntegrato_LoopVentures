package com._Home.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com._Home.backend.models.OmiZone;
import com._Home.backend.repos.OmiZoneRepo;

@Service
public class OmiZoneImpl implements OmiZoneService {

    @Autowired
    private OmiZoneRepo omiZoneRepo;

    @Override
    public List<OmiZone> getAllOmiZones() {
        return omiZoneRepo.findAll();
    }


}
