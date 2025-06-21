package com.FirstSpringBoot.project.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String motDePasse;
}
