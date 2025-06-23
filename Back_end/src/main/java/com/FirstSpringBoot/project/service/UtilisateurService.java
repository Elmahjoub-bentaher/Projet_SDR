package com.FirstSpringBoot.project.service;

import com.FirstSpringBoot.project.model.Utilisateur;
import com.FirstSpringBoot.project.model.Role;
import com.FirstSpringBoot.project.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    // Create new user with encoded password
    public Utilisateur createUser(Utilisateur user) {
        if (utilisateurRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        
        user.setMotDePasse(passwordEncoder.encode(user.getMotDePasse()));
        // Set default role if not specified
        if (user.getRole() == null) {
            user.setRole(Role.USER_STANDARD);
        }
        return utilisateurRepository.save(user);
    }

    // Get all users
    public List<Utilisateur> getAllUsers() {
        return utilisateurRepository.findAll();
    }

    // Get user by ID
    public Utilisateur getUserById(Long id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    // Get user by email
    public Utilisateur getUserByEmail(String email) {
        return utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    // Update user details
    public Utilisateur updateUser(Long id, Utilisateur userDetails) {
        Utilisateur existingUser = getUserById(id);
        
        if (userDetails.getNom() != null) {
            existingUser.setNom(userDetails.getNom());
        }
        
        if (userDetails.getEmail() != null && !userDetails.getEmail().equals(existingUser.getEmail())) {
            if (utilisateurRepository.existsByEmail(userDetails.getEmail())) {
                throw new RuntimeException("Email already in use");
            }
            existingUser.setEmail(userDetails.getEmail());
        }
        
        if (userDetails.getMotDePasse() != null) {
            existingUser.setMotDePasse(passwordEncoder.encode(userDetails.getMotDePasse()));
        }
        
        if (userDetails.getRole() != null) {
            existingUser.setRole(userDetails.getRole());
        }
        
        return utilisateurRepository.save(existingUser);
    }

    // Delete user
    public void deleteUser(Long id) {
        if (!utilisateurRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        utilisateurRepository.deleteById(id);
    }
}