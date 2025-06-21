package com.FirstSpringBoot.project.controller;

import com.FirstSpringBoot.project.model.Utilisateur;
import com.FirstSpringBoot.project.request.LoginRequest;
import com.FirstSpringBoot.project.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth") // Base path for authentication endpoints
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Handles user login requests.
     * When successful, Spring Security's context is updated.
     * @param loginRequest DTO containing email and password.
     * @return ResponseEntity indicating success or failure.
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Optional<Authentication> authentication = authService.authenticateUser(loginRequest);

        if (authentication.isPresent()) {
            return ResponseEntity.ok(Collections.singletonMap("message", "Login successful! Welcome " + authentication.get().getName()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Invalid email or password."));
        }
    }

  
}
