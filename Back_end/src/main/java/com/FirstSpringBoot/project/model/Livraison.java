package com.FirstSpringBoot.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Livraison {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLivraison;

    private LocalDate dateLivraisonReelle;
    private String etatLivraison;

    @OneToOne
    @JoinColumn(name = "commande_id")
    private Commande commande;
}

