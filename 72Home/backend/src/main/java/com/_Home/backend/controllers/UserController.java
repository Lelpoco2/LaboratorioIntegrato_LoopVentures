package com._Home.backend.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com._Home.backend.dto.UserDeletionInfoDTO;
import com._Home.backend.models.Property;
import com._Home.backend.models.PropertyEvaluation;
import com._Home.backend.models.User;
import com._Home.backend.repos.PropertyEvaluationRepo;
import com._Home.backend.repos.PropertyRepo;
import com._Home.backend.services.interfaces.UserService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private PropertyRepo propertyRepo;
    
    @Autowired
    private PropertyEvaluationRepo propertyEvaluationRepo;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.insertUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @PutMapping("users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User userDetails) {
        User existingUser = userService.getUserById(id);
        if (existingUser != null) {
            existingUser.setFirstName(userDetails.getFirstName());
            existingUser.setLastName(userDetails.getLastName());
            existingUser.setPhone(userDetails.getPhone());
            existingUser.setEmail(userDetails.getEmail());
            // Update other fields as necessary
            User updatedUser = userService.updateUser(existingUser);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/users/{id}")
    @Transactional
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        User existingUser = userService.getUserById(id);
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }
        
        try {
            // Step 1: Get properties owned by the user (via property_id)
            List<Property> ownedProperties = propertyRepo.findPropertiesOwnedByUser(id);
            
            // Step 2: For each owned property, delete all evaluations referencing it
            for (Property property : ownedProperties) {
                List<PropertyEvaluation> propertyEvals = propertyEvaluationRepo.findByProperty(property);
                if (!propertyEvals.isEmpty()) {
                    propertyEvaluationRepo.deleteAll(propertyEvals);
                }
            }
            
            // Step 3: Delete evaluations made by this user
            List<PropertyEvaluation> userEvaluations = propertyEvaluationRepo.findByUser(existingUser);
            if (!userEvaluations.isEmpty()) {
                propertyEvaluationRepo.deleteAll(userEvaluations);
            }
            
            propertyEvaluationRepo.flush();
            
            // Step 4: Delete the properties owned by the user
            if (!ownedProperties.isEmpty()) {
                propertyRepo.deleteAll(ownedProperties);
                propertyRepo.flush();
            }
            
            // Step 5: Finally delete the user
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/users/{id}/deletion-info")
    public ResponseEntity<UserDeletionInfoDTO> getUserDeletionInfo(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        
        Long evaluationsCount = propertyEvaluationRepo.countByUser(user);
        List<Property> ownedProperties = propertyRepo.findPropertiesOwnedByUser(id);
        
        UserDeletionInfoDTO info = new UserDeletionInfoDTO();
        info.setUserId(user.getId());
        info.setUserName(user.getFirstName() + " " + user.getLastName());
        info.setRelatedEvaluationsCount(evaluationsCount.intValue());
        info.setRelatedPropertiesCount(ownedProperties.size());
        info.setHasRelatedData(evaluationsCount > 0 || !ownedProperties.isEmpty());
        
        return ResponseEntity.ok(info);
    }

    // Other CRUD endpoints can be added here similarly

    
}
