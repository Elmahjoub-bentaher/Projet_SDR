package com.FirstSpringBoot.project.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class LivraisonRequest {
    private LocalDate dateLivraisonReelle;
    private String etatLivraison;
    private Long idCommande;
}
