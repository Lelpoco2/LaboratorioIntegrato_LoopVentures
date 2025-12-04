package com._Home.backend.config;

import java.util.HashSet;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com._Home.backend.models.Role;
import com._Home.backend.models.SpecialUser;
import com._Home.backend.repos.RoleRepo;
import com._Home.backend.repos.SpecialUserRepo;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final SpecialUserRepo specialUserRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Crea il ruolo AMMINISTRATORE se non esiste
        Role adminRole = roleRepo.findByRole("AMMINISTRATORE")
            .orElseGet(() -> {
                Role role = new Role();
                role.setRole("AMMINISTRATORE");
                return roleRepo.save(role);
            });

        // Crea uno SpecialUser di prova se non esiste
        if (specialUserRepo.findByEmail("admin@test.com").isEmpty()) {
            SpecialUser admin = new SpecialUser();
            admin.setFirstName("Admin");
            admin.setLastName("Test");
            admin.setEmail("admin@test.com");
            admin.setPhone("+39 123 456 7890");
            admin.setPassword(passwordEncoder.encode("password123")); // Password hashata con BCrypt
            admin.setRoles(new HashSet<>());
            admin.getRoles().add(adminRole);
            
            specialUserRepo.save(admin);
            System.out.println("✅ SpecialUser AMMINISTRATORE creato: admin@test.com / password123");
        }
    }
}
