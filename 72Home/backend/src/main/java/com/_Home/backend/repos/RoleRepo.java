package com._Home.backend.repos;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com._Home.backend.models.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role, UUID> {
    Optional<Role> findByRole(String role);
}
