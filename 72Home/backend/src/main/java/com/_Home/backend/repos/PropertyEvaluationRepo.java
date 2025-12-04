package com._Home.backend.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com._Home.backend.models.Property;
import com._Home.backend.models.PropertyEvaluation;
import com._Home.backend.models.User;

@Repository
public interface PropertyEvaluationRepo extends JpaRepository<PropertyEvaluation, Integer> {
    
    List<PropertyEvaluation> findByProperty(Property property);
    
    List<PropertyEvaluation> findByUser(User user);
    
    Long countByUser(User user);
    
    @Query("SELECT pe FROM PropertyEvaluation pe WHERE pe.property = :property ORDER BY pe.createdAt DESC")
    Optional<PropertyEvaluation> findLatestByProperty(@Param("property") Property property);

}
