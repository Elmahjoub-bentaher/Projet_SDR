package com.FirstSpringBoot.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LigneCommande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLigne;

    private Integer quantite;
    private Float prixUnitaire;
    private String descriptionArticle;

    @ManyToOne
    @JoinColumn(name = "commande_id")
    private Commande commande;
}

