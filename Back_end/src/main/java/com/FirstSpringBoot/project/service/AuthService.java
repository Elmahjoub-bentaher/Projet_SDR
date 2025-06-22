package com.FirstSpringBoot.project.service;

import com.FirstSpringBoot.project.model.Role;
import com.FirstSpringBoot.project.model.Utilisateur;
import com.FirstSpringBoot.project.repository.UtilisateurRepository;
import com.FirstSpringBoot.project.request.LoginRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthService(UtilisateurRepository utilisateurRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Authenticates a user based on provided email and password.
     * @param loginRequest Contains email and plain text password.
     * @return An Optional containing the Authentication object if successful, or empty if authentication fails.
     */
    public Optional<Authentication> authenticateUser(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getMotDePasse())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return Optional.of(authentication);
        } catch (Exception e) {
            System.err.println("Authentication failed for user " + loginRequest.getEmail() + ": " + e.getMessage());
            return Optional.empty();
        }
    }


    /**
     * Creates an initial user if they do not already exist in the database.
     * This is ideal for pre-populating with specific users and roles at startup.
     * @param nom User's name.
     * @param email User's email (will be the username).
     * @param motDePasse User's plain text password.
     * @param role The role to assign (ADMIN or USER_STANDARD).
     * @return The created or existing Utilisateur entity.
     */
    public Utilisateur createInitialUser(String nom, String email, String motDePasse, Role role) {
        return utilisateurRepository.findByEmail(email)
                .orElseGet(() -> {
                    Utilisateur user = new Utilisateur();
                    user.setNom(nom);
                    user.setEmail(email);
                    user.setMotDePasse(passwordEncoder.encode(motDePasse)); // Encode password
                    user.setRole(role);
                    //user.setCommandes(null); // Or new ArrayList<>();
                    return utilisateurRepository.save(user);
                });
    }
}
