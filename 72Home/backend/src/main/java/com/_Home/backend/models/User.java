
package com._Home.backend.models;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
<<<<<<< HEAD
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
=======
import jakarta.persistence.PrePersist;
>>>>>>> 9b2ecc9a169f402e8936e2bb52538a4f6d91cc0c
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
<<<<<<< HEAD
    
    // Setting the many-to-many relationship between User and Role
    @ManyToMany
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
=======
    // Set up relationship with Property
    @JsonIgnore
    @Column(name = "property_id")
    private Integer propertyId;
>>>>>>> 9b2ecc9a169f402e8936e2bb52538a4f6d91cc0c

    @JsonIgnore
    @Column(name = "created_at")
    private java.sql.Timestamp createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = new java.sql.Timestamp(System.currentTimeMillis());
    }
    
}
