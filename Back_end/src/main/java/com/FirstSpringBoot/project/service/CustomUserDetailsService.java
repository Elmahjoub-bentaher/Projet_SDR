package com.FirstSpringBoot.project.security;

import com.FirstSpringBoot.project.model.Utilisateur;
import com.FirstSpringBoot.project.repository.UtilisateurRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UtilisateurRepository utilisateurRepository;

    public CustomUserDetailsService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Create a Spring Security UserDetails object
        // Roles in Spring Security usually need the "ROLE_" prefix
        return new User(utilisateur.getEmail(),
                        utilisateur.getMotDePasse(), // This is the encoded password
                        Collections.singletonList(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + utilisateur.getRole().name())));
    }
}