package com._Home.backend.controllers;

// import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties.Authentication;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com._Home.backend.dtos.auth.ErrorResponse;
import com._Home.backend.dtos.auth.LoginRequest;
import com._Home.backend.dtos.auth.LoginResponse;
import com._Home.backend.models.SpecialUser;
import com._Home.backend.repos.SpecialUserRepo;
import com._Home.backend.services.jwt.JwtService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final SpecialUserRepo specialUserRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        
        try {

            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), 
                    loginRequest.getPassword()
                )
            );

            var roles = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .map(role -> role.replace("ROLE_", ""))
                .collect(Collectors.toList());

                SpecialUser user = specialUserRepo.findByEmail(loginRequest.getEmail()).
                orElseThrow(() -> new RuntimeException("User not found"));
            
                String token = jwtService.generateJwtToken(
                    loginRequest.getEmail(),
                    roles,
                    user.getId()
                );

                LoginResponse response = LoginResponse.builder()
                    .token(token)
                    .type("Bearer")
                    .email(user.getEmail())
                    .roles(roles)
                    .userId(user.getId())
                    .build();

                return ResponseEntity.ok(response);
            
        } catch (BadCredentialsException e) {
            ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.UNAUTHORIZED.value(),
                "Credenziali non valide",
                LocalDateTime.now()
            );
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Errore durante l'autenticazione" + e.getMessage(),
                LocalDateTime.now()
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
