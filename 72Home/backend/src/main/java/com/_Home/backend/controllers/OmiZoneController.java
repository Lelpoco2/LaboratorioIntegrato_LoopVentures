package com._Home.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com._Home.backend.models.OmiZone;
import com._Home.backend.services.interfaces.OmiZoneService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api")
public class OmiZoneController {

    @Autowired
    private OmiZoneService omiZoneService;

    @GetMapping("/omizones")
    public ResponseEntity<List<OmiZone>> getAllOmiZones() {
        return ResponseEntity.ok(omiZoneService.getAllOmiZones());
    }

    @GetMapping("/omizones/{id}")
    public ResponseEntity<OmiZone> getOmiZoneById(Integer id) {
        OmiZone omiZone = omiZoneService.getOmiZoneById(id);
        if (omiZone != null) {
            return ResponseEntity.ok(omiZone);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/omizones")
    public ResponseEntity<OmiZone> insertOmiZone(OmiZone omiZone) {
        OmiZone createdOmiZone = omiZoneService.insertOmiZone(omiZone);
        return ResponseEntity.ok(createdOmiZone);
    } 

    @PutMapping("/omizones/{id}")
    public ResponseEntity<OmiZone> updateOmiZone(@PathVariable Integer id, @RequestBody OmiZone omiZone) {
        OmiZone updatedOmiZone = omiZoneService.updateOmiZone(omiZone);
        if (updatedOmiZone != null) {
            return ResponseEntity.ok(updatedOmiZone);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}