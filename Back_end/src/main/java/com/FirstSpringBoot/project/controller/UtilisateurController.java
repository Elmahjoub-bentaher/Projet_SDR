package com.FirstSpringBoot.project.controller;

import com.FirstSpringBoot.project.model.Utilisateur;
import com.FirstSpringBoot.project.service.UtilisateurService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    public UtilisateurController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    // Create a new user
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Utilisateur createUser(@RequestBody Utilisateur user) {
        return utilisateurService.createUser(user);
    }

    // Get all users
    @GetMapping
    public List<Utilisateur> getAllUsers() {
        return utilisateurService.getAllUsers();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public Utilisateur getUserById(@PathVariable Long id) {
        return utilisateurService.getUserById(id);
    }

    // Get user by email
    @GetMapping("/by-email/{email}")
    public Utilisateur getUserByEmail(@PathVariable String email) {
        return utilisateurService.getUserByEmail(email);
    }

    // Update user
    @PutMapping("/{id}")
    public Utilisateur updateUser(@PathVariable Long id, @RequestBody Utilisateur userDetails) {
        return utilisateurService.updateUser(id, userDetails);
    }

    // Delete user
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        utilisateurService.deleteUser(id);
    }
}