package com._Home.backend.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com._Home.backend.models.User;

public interface UserRepo extends JpaRepository<User, Integer> {

    
}
