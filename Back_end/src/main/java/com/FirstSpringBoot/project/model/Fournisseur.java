package com.FirstSpringBoot.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fournisseur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFournisseur;

    private String nom;
    private String adresse;
    private String email;
    private String telephone;
    private String siret;
    private String conditionsPaiement;

    @OneToMany(mappedBy = "fournisseur")
	@JsonIgnoreProperties({"commandes"})
    private List<Commande> commandes;
}

