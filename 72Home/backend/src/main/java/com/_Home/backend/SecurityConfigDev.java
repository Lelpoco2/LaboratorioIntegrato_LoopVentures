package com._Home.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfigDev {

    @Bean
    SecurityFilterChain securityFilterChainDev(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.requestMatchers("/api/**").permitAll()
                                                .requestMatchers("/api/actuator/**").permitAll()
                                    );
        return http.build();           
    }
}


