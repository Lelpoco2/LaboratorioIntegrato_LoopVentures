package com._Home.backend.security;

import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com._Home.backend.models.SpecialUser;
import com._Home.backend.repos.SpecialUserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{

    private final SpecialUserRepo specialUserRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        SpecialUser specialUser = specialUserRepo.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("User not found" + email));

        Set<GrantedAuthority> authorities = specialUser.getRoles()
            .stream()
            .map(role -> (GrantedAuthority) () -> "ROLE_" + role.getRole())
            .collect(java.util.stream.Collectors.toSet());
            
        return User.builder()
                .username(specialUser.getEmail())
                .password(specialUser.getPassword())
                .authorities(authorities)
                .build();
    }

}
