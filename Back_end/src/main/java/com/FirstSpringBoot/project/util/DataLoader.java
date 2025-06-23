package com.FirstSpringBoot.project.util;

import com.FirstSpringBoot.project.model.Role;
import com.FirstSpringBoot.project.service.AuthService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * CommandLineRunner to insert initial user data into the database on application startup.
 * This ensures that an admin and a standard user are available for testing/initial use.
 */
import org.springframework.core.annotation.Order;

@Order(2)
@Component
public class DataLoader implements CommandLineRunner {

    private final AuthService authService;

    public DataLoader(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create an Admin user
        authService.createInitialUser("Admin User", "admin@example.com", "adminpassword", Role.ADMIN);
        System.out.println("Initial admin user 'admin@example.com' created (or already exists).");

        // Create a Standard User
        authService.createInitialUser("Standard User", "standarduser@example.com", "standardpassword", Role.USER_STANDARD);
        System.out.println("Initial standard user 'standarduser@example.com' created (or already exists).");
    }
}
