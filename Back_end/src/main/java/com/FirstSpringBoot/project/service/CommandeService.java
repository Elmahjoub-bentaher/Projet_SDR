package com.FirstSpringBoot.project.service;

import com.FirstSpringBoot.project.request.CommandeRequest;
import com.FirstSpringBoot.project.model.*;
import com.FirstSpringBoot.project.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class CommandeService {

    private final CommandeRepository commandeRepository;
    private final FournisseurRepository fournisseurRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final LigneCommandeRepository ligneCommandeRepository;

    public CommandeService(CommandeRepository commandeRepository,
                         FournisseurRepository fournisseurRepository,
                         UtilisateurRepository utilisateurRepository,
                         LigneCommandeRepository ligneCommandeRepository) {
        this.commandeRepository = commandeRepository;
        this.fournisseurRepository = fournisseurRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.ligneCommandeRepository = ligneCommandeRepository;
    }

    @Transactional
    public Commande createCommande(CommandeRequest request) {
        Fournisseur fournisseur = fournisseurRepository.findById(request.getIdFournisseur())
                .orElseThrow(() -> new RuntimeException("Fournisseur not found"));
        
        Utilisateur utilisateur = utilisateurRepository.findById(request.getIdUtilisateur())
                .orElseThrow(() -> new RuntimeException("Utilisateur not found"));

        Commande commande = new Commande();
        commande.setDateCommande(LocalDate.now());
        commande.setDateLivraisonPrevue(request.getDateLivraisonPrevue());
        commande.setEtat(request.getEtat() != null ? request.getEtat() : "CREATED");
        commande.setFournisseur(fournisseur);
        commande.setUtilisateur(utilisateur);

        Commande savedCommande = commandeRepository.save(commande);

        if (request.getLignes() != null && !request.getLignes().isEmpty()) {
            List<LigneCommande> lignes = request.getLignes().stream()
                    .map(ligne -> {
                        LigneCommande lc = new LigneCommande();
                        lc.setQuantite(ligne.getQuantite());
                        lc.setPrixUnitaire(ligne.getPrixUnitaire());
                        lc.setDescriptionArticle(ligne.getDescriptionArticle());
                        lc.setCommande(savedCommande);
                        return lc;
                    }).collect(Collectors.toList());
            
            ligneCommandeRepository.saveAll(lignes);
            savedCommande.setLignes(lignes);
            savedCommande.setMontantTotal(calculateTotal(lignes));
        }

        return commandeRepository.save(savedCommande);
    }

    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }
    
    public Commande getCommandeById(Long id) {
        return commandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande not found"));
    }

    @Transactional
    public Commande updateCommande(Long id, CommandeRequest updateDTO) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande not found"));
        
        if (updateDTO.getEtat() != null) {
            commande.setEtat(updateDTO.getEtat());
        }
        
        if (updateDTO.getDateLivraisonPrevue() != null) {
            commande.setDateLivraisonPrevue(updateDTO.getDateLivraisonPrevue());
        }
        
        return commandeRepository.save(commande);
    }

    @Transactional
    public void deleteCommande(Long id) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande not found"));
        
        if (commande.getLignes() != null) {
            ligneCommandeRepository.deleteAll(commande.getLignes());
        }
        
        commandeRepository.delete(commande);
    }

    private Float calculateTotal(List<LigneCommande> lignes) {
        return lignes.stream()
                .map(l -> l.getQuantite() * l.getPrixUnitaire())
                .reduce(0f, Float::sum);
    }
}