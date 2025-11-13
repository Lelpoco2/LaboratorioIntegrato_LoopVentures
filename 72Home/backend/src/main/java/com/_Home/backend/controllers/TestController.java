package com._Home.backend.controllers;

import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com._Home.backend.services.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
public class TestController {

    @Autowired
    private UserService userService;
    
    @GetMapping("/hello")
    public Map<String, String> hello() {
        return Map.of("message", "Hello, world!");
    }

    @GetMapping("/user")
    public List<Map<String, String>> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/userpost")
    public Map<String, String> insertUser(@RequestBody com._Home.backend.models.User user) {
        return userService.insertUser(user);
    }
    
}

