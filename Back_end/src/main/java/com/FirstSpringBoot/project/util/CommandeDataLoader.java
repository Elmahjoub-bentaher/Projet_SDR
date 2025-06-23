package com.FirstSpringBoot.project.util;

import com.FirstSpringBoot.project.model.*;
import com.FirstSpringBoot.project.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.List;

@Component
public class CommandeDataLoader implements CommandLineRunner {

    private final CommandeRepository commandeRepository;
    private final FournisseurRepository fournisseurRepository;
    private final UtilisateurRepository utilisateurRepository;

    public CommandeDataLoader(
        CommandeRepository commandeRepository,
        FournisseurRepository fournisseurRepository,
        UtilisateurRepository utilisateurRepository
    ) {
        this.commandeRepository = commandeRepository;
        this.fournisseurRepository = fournisseurRepository;
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (commandeRepository.count() == 0) {
            loadMinimalCommandes();
        }
    }

    private void loadMinimalCommandes() {
        // Only require the absolute minimum relations:
        // 1. Fournisseur (required by @ManyToOne)
        // 2. Utilisateur (required by @ManyToOne)
        List<Fournisseur> fournisseurs = fournisseurRepository.findAll();
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll();

        if (fournisseurs.isEmpty() || utilisateurs.isEmpty()) {
            System.out.println("Skipping command loading - missing suppliers or users");
            return;
        }

        // Create command with only mandatory fields
        Commande commande = new Commande();
        commande.setDateCommande(LocalDate.now());
        commande.setDateLivraisonPrevue(LocalDate.now().plusDays(7));
        commande.setEtat("NEW");
        commande.setMontantTotal(0.0f); // Will be calculated later
        commande.setFournisseur(fournisseurs.get(0)); // Required
        commande.setUtilisateur(utilisateurs.get(0)); // Required

        // Explicitly NOT creating:
        // - LignesCommande (optional, can be added later)
        // - Livraison (optional @OneToOne)
        // - Facture (optional @OneToOne)
        
        commandeRepository.save(commande);
        System.out.println("Loaded minimal command (ID: " + commande.getIdCommande() + ")");
    }
}