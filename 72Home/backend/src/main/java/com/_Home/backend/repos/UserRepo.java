package com._Home.backend.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com._Home.backend.models.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    
}
