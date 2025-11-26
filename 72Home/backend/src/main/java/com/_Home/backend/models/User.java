package com._Home.backend.models;


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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String phone;
    private String email;
    // Set up relationship with Property
    
    @Column(name = "property_id")
    private Integer propertyId;

    @Column(name = "created_at")
    private java.sql.Timestamp createdAt;
    
}
