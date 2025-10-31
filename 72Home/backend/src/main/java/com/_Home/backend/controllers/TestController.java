package com._Home.backend.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com._Home.backend.repos.UserRepo;

@RestController
@RequestMapping("/api")
public class TestController {

    @Autowired
    private UserRepo userRepo;
    
    @GetMapping("/hello")
    public Map<String, String> hello() {
        return Map.of("message", "Hello, world!");
    }

    @GetMapping("/user")
    public Map<String, String> getUser() {
        return userRepo.findAll().stream()
            .findFirst()
            .map(user -> Map.of(
                "id", user.getId().toString(),
                "user_name", user.getUsername(),
                "email", user.getEmail()
            ))
            .orElse(Map.of("message", "No users found"));
    }
}

