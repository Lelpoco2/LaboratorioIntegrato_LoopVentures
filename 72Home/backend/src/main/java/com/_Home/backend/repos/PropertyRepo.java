package com._Home.backend.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com._Home.backend.models.Property;

public interface PropertyRepo extends JpaRepository<Property, Integer> {

}
