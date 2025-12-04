package com._Home.backend.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com._Home.backend.models.Property;

@Repository
public interface PropertyRepo extends JpaRepository<Property, Integer> {

    @Query("SELECT DISTINCT p FROM Property p JOIN PropertyEvaluation pe ON p.id = pe.property.id WHERE pe.user.id = :userId")
    List<Property> findPropertiesByUserId(@Param("userId") Integer userId);
    
    @Query("SELECT p FROM Property p WHERE p.id IN (SELECT u.propertyId FROM User u WHERE u.id = :userId AND u.propertyId IS NOT NULL)")
    List<Property> findPropertiesOwnedByUser(@Param("userId") Integer userId);

    // Find properties taken by a specific special user (administrator)
    List<Property> findBySpecialUserId(Integer specialUserId);

}
