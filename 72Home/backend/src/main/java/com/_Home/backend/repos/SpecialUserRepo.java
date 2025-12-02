package com._Home.backend.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com._Home.backend.models.SpecialUser;

@Repository
public interface SpecialUserRepo extends JpaRepository<SpecialUser, Integer> {
    
    @EntityGraph(attributePaths = {"roles"})
    Optional<SpecialUser> findByEmail(String email);
}
