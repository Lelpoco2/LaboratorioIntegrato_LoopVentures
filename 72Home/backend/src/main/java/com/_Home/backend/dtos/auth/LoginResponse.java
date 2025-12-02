package com._Home.backend.dtos.auth;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    private String token;
    private String type = "Bearer";
    private String email;
    private List<String> roles;
    private Integer userId;
}
