package com.FirstSpringBoot.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUtilisateur;

    private String nom;
    private String email;
    private String motDePasse;
    private String role;

    @OneToMany(mappedBy = "utilisateur")
    private List<Commande> commandes;
}

