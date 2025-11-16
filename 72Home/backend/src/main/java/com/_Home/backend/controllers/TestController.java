package com._Home.backend.controllers;

import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com._Home.backend.models.Property;
import com._Home.backend.models.User;
import com._Home.backend.services.PropertyEvaluationServiceImpl;
import com._Home.backend.services.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private PropertyEvaluationServiceImpl propeval;

    @Autowired
    private UserService userService;
    
    @GetMapping("/hello")
    public Map<String, String> hello() {
        return Map.of("message", "Hello, world!");
    }

    @GetMapping("/user")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/userpost")
    public User insertUser(@RequestBody User user) {
        return userService.insertUser(user);
    }

    // @GetMapping("/geocode")
    // public ResponseEntity<Double[]> geocodeProperty() {
    //     Double[] coords = propeval.getLocationByAddress("Via Sant'Ottavio 30, Torino, TO");
    //     if (coords != null) {
    //         return ResponseEntity.ok(coords);
    //     } else {
    //         return ResponseEntity.ok(new Double[] {0.0, 0.0});
    //     }
    // }
    
}

