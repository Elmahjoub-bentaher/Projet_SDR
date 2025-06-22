package com.FirstSpringBoot.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import org.springframework.core.annotation.Order;

@Order(3)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCommande;

    private LocalDate dateCommande;
    private LocalDate dateLivraisonPrevue;
    private String etat;
    private Float montantTotal;

    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;

    @ManyToOne
    @JoinColumn(name = "fournisseur_id")
    private Fournisseur fournisseur;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL)
    private List<LigneCommande> lignes;

    //@OneToOne(mappedBy = "commande", cascade = CascadeType.ALL)
    //private Livraison livraison;

    @OneToOne(mappedBy = "commande", cascade = CascadeType.ALL)
    private Facture facture;
}
