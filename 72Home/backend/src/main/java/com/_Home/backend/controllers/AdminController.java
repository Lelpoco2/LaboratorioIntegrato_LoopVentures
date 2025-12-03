package com._Home.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com._Home.backend.dto.PropertyWithPriceDTO;
import com._Home.backend.dto.SpecialUserDTO;
import com._Home.backend.models.Property;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


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

    @GetMapping("/taken-properties")
    @PreAuthorize("hasRole('AMMINISTRATORE')")
    public ResponseEntity<List<PropertyWithPriceDTO>> getTakenProperties(@AuthenticationPrincipal UserDetails userDetails) {
        // Get the SpecialUser by email (which is the username in UserDetails)
        var specialUser = specialUserRepo.findByEmail(userDetails.getUsername())
            .orElseThrow(() -> new RuntimeException("Special user not found"));
        
        // Find all properties taken by this special user
        List<Property> takenProperties = propertyRepo.findBySpecialUserId(specialUser.getId());
        
        // Convert to DTOs with prices
        List<PropertyWithPriceDTO> propertiesWithPrices = takenProperties.stream()
            .map(property -> {
                Double latestPrice = propertyEvaluationRepo.findLatestByProperty(property)
                    .map(evaluation -> evaluation.getPropertyValue())
                    .orElse(null);
                PropertyWithPriceDTO dto = PropertyWithPriceDTO.fromProperty(property, latestPrice);
                
                // Add administrator name
                dto.setAssignedAdministrator(specialUser.getFirstName() + " " + specialUser.getLastName());
                
                return dto;
            })
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(propertiesWithPrices);
    }

    @PostMapping("/take-property/{propertyId}")
    @PreAuthorize("hasRole('AMMINISTRATORE')")
    public ResponseEntity<?> takeProperty(
            @PathVariable Integer propertyId,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        // Get the SpecialUser by email
        var specialUser = specialUserRepo.findByEmail(userDetails.getUsername())
            .orElseThrow(() -> new RuntimeException("Special user not found"));
        
        // Find the property
        var property = propertyRepo.findById(propertyId)
            .orElseThrow(() -> new RuntimeException("Property not found"));
        
        // Check if property is already taken
        if (Boolean.TRUE.equals(property.getTaken())) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Property already taken by another administrator"
            ));
        }
        
        // Assign property to this special user
        property.setSpecialUserId(specialUser.getId());
        property.setTaken(true);
        propertyRepo.save(property);
        
        return ResponseEntity.ok(Map.of(
            "message", "Property successfully taken",
            "propertyId", propertyId,
            "assignedTo", specialUser.getFirstName() + " " + specialUser.getLastName()
        ));
    }

    
    


}
