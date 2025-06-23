package com.FirstSpringBoot.project.util;

import com.FirstSpringBoot.project.model.Commande;
import com.FirstSpringBoot.project.model.Fournisseur;
import com.FirstSpringBoot.project.model.Utilisateur;
import com.FirstSpringBoot.project.repository.CommandeRepository;
import com.FirstSpringBoot.project.repository.FournisseurRepository;
import com.FirstSpringBoot.project.repository.UtilisateurRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

/**
 * Charge des commandes initiales si la base est vide.
 */
import org.springframework.core.annotation.Order;

@Order(3)
@Component
public class CommandeDataLoader implements CommandLineRunner {

    private final CommandeRepository commandeRepository;
    private final FournisseurRepository fournisseurRepository;
    private final UtilisateurRepository utilisateurRepository;

    public CommandeDataLoader(CommandeRepository commandeRepository,
                               FournisseurRepository fournisseurRepository,
                               UtilisateurRepository utilisateurRepository) {
        this.commandeRepository = commandeRepository;
        this.fournisseurRepository = fournisseurRepository;
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (commandeRepository.count() == 0 &&
            fournisseurRepository.count() > 0 &&
            utilisateurRepository.count() > 0) {
            loadInitialCommande();
        }
    }

    private void loadInitialCommande() {
        List<Fournisseur> fournisseurs = fournisseurRepository.findAll();
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll();

        Fournisseur f = fournisseurs.get(0);
        Utilisateur u = utilisateurs.get(0);

        Commande c1 = createCommande(f, u, 1500f, "En cours");
        Commande c2 = createCommande(f, u, 2000f, "validée");
        Commande c3 = createCommande(f, u, 1000f, "livrée");

        commandeRepository.saveAll(List.of(c1, c2, c3));
        System.out.println("✅ 3 commandes initiales ajoutées");
    }

    private Commande createCommande(Fournisseur fournisseur, Utilisateur utilisateur, float montant, String etat) {
        Commande commande = new Commande();
        commande.setDateCommande(LocalDate.now());
        commande.setDateLivraisonPrevue(LocalDate.now().plusDays(5));
        commande.setEtat(etat);
        commande.setMontantTotal(montant);
        commande.setFournisseur(fournisseur);
        commande.setUtilisateur(utilisateur);
        return commande;
    }
}
