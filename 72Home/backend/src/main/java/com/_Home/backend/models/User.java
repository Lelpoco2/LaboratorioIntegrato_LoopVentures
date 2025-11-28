package com._Home.backend.models;


import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
@Data // Lombok annotation for: getters, setters, toString, equals, and hashCode compactly
public class User {

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    // Set up relationship with Property
    @JsonIgnore
    @Column(name = "property_id")
    private Integer propertyId;

    @JsonIgnore
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private java.sql.Timestamp createdAt;
    
}
