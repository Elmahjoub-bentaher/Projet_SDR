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
public class Facture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFacture;

    private String numeroFacture;
    private Float montant;
    private LocalDate dateEcheance;
    private LocalDate datePaiement;
    private String etatPaiement;

    @OneToOne
    @JoinColumn(name = "commande_id", nullable = false)
    private Commande commande;
}
