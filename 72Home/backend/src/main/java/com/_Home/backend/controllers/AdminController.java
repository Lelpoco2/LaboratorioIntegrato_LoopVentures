package com._Home.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com._Home.backend.dto.SpecialUserDTO;
import com._Home.backend.repos.OmiZoneRepo;
import com._Home.backend.repos.PropertyEvaluationRepo;
import com._Home.backend.repos.PropertyRepo;
import com._Home.backend.repos.SpecialUserRepo;
import com._Home.backend.repos.UserRepo;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepo.count());
        stats.put("totalProperties", propertyRepo.count());
        stats.put("totalEvaluations", propertyEvaluationRepo.count());
        stats.put("totalOmiZones", omiZoneRepo.count());
        
        // Calculate average evaluation price
        Double averagePrice = propertyEvaluationRepo.findAll().stream()
            .map(evaluation -> evaluation.getPropertyValue())
            .filter(value -> value != null)
            .mapToDouble(Double::doubleValue)
            .average()
            .orElse(0.0);
        
        stats.put("averageEvaluationPrice", Math.round(averagePrice * 100.0) / 100.0);
        
        dashboard.put("statistics", stats);
        
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/special-users")
    @PreAuthorize("hasRole('AMMINISTRATORE')")
    public ResponseEntity<List<SpecialUserDTO>> getAllSpecialUsers() {
        List<SpecialUserDTO> specialUsers = specialUserRepo.findAll().stream()
            .map(SpecialUserDTO::fromSpecialUser)
            .collect(Collectors.toList());
        return ResponseEntity.ok(specialUsers);
    }

    
    


}
