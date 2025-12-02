package com._Home.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com._Home.backend.repos.OmiZoneRepo;
import com._Home.backend.repos.PropertyEvaluationRepo;
import com._Home.backend.repos.PropertyRepo;
import com._Home.backend.repos.SpecialUserRepo;
import com._Home.backend.repos.UserRepo;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final SpecialUserRepo specialUserRepo;
    private final UserRepo userRepo;
    private final PropertyRepo propertyRepo;
    private final PropertyEvaluationRepo propertyEvaluationRepo;
    private final OmiZoneRepo omiZoneRepo;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('AMMINISTRATORE')")
    public ResponseEntity<?> getDashboard(@AuthenticationPrincipal UserDetails userDetails) {
        Map<String, Object> dashboard = new HashMap<>(); 
        dashboard.put("message", "Welcome to the admin dashboard, " + userDetails.getUsername() + "!");
        
        // Statistiche
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepo.count());
        stats.put("totalProperties", propertyRepo.count());
        stats.put("totalEvaluations", propertyEvaluationRepo.count());
        stats.put("totalOmiZones", omiZoneRepo.count());
        dashboard.put("statistics", stats);
        
        return ResponseEntity.ok(dashboard);
    }

    
    


}
