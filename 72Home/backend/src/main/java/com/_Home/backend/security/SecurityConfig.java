package com._Home.backend.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
<<<<<<< HEAD
=======

import java.util.Arrays;
>>>>>>> 9b2ecc9a169f402e8936e2bb52538a4f6d91cc0c

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChainDev(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
<<<<<<< HEAD
            .cors(cors->{})
=======
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
>>>>>>> 9b2ecc9a169f402e8936e2bb52538a4f6d91cc0c
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/api/**").permitAll()
                .anyRequest().permitAll()
            );
        return http.build();           
    }

    @Bean
<<<<<<< HEAD
    public CorsConfigurationSource corsConfigurationSource () {
        CorsConfiguration config = new CorsConfiguration();

        // Setting DEV 

        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(List.of("*"));
        // config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
=======
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
>>>>>>> 9b2ecc9a169f402e8936e2bb52538a4f6d91cc0c
        return source;
    }
}
