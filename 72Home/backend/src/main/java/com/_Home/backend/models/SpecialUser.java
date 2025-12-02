package com._Home.backend.models;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "special_users")
@Data
public class SpecialUser {

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    
    @JsonIgnore
    @Column(name = "property_id")
    private Integer propertyId;

    @Column(name = "password")
    private String password;

    @JsonIgnore
    @Column(name = "created_at")
    private java.sql.Timestamp createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = new java.sql.Timestamp(System.currentTimeMillis());
    }

    @ManyToMany
    @JoinTable(
        name = "special_user_roles",
        joinColumns = @JoinColumn(name = "special_user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

}
