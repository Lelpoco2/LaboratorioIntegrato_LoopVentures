package com._Home.backend.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com._Home.backend.models.Property;

@Repository
public interface PropertyRepo extends JpaRepository<Property, Integer> {

}
