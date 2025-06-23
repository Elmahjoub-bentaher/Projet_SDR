package com.FirstSpringBoot.project.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class FactureRequest {
    private LocalDate dateEcheance;
    private String etatPaiement;
    private Long idCommande;
    private Long montant;
    private String numeroFacture;
}
