package com.FirstSpringBoot.project.util;

import com.FirstSpringBoot.project.model.Commande;
import com.FirstSpringBoot.project.model.Livraison;
import com.FirstSpringBoot.project.repository.CommandeRepository;
import com.FirstSpringBoot.project.repository.LivraisonRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

/**
 * CommandLineRunner to insert initial delivery data into the database on application startup.
 */
import org.springframework.core.annotation.Order;

@Order(4)
@Component
public class LivraisonDataLoader implements CommandLineRunner {

    private final LivraisonRepository livraisonRepository;
    private final CommandeRepository commandeRepository;

    public LivraisonDataLoader(LivraisonRepository livraisonRepository, CommandeRepository commandeRepository) {
        this.livraisonRepository = livraisonRepository;
        this.commandeRepository = commandeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (livraisonRepository.count() == 0 && commandeRepository.count() > 0) {
            loadInitialLivraisons();
        }
    }

    private void loadInitialLivraisons() {
        List<Commande> commandes = commandeRepository.findAll();

        if (commandes.size() >= 3) {
            Livraison livraison1 = createLivraison(commandes.get(0), LocalDate.now().minusDays(2), "conforme");
            Livraison livraison2 = createLivraison(commandes.get(1), LocalDate.now().minusDays(1), "partielle");
            Livraison livraison3 = createLivraison(commandes.get(2), LocalDate.now(), "non conforme");

            livraisonRepository.saveAll(List.of(livraison1, livraison2, livraison3));
            System.out.println("Loaded initial livraison data (" + livraisonRepository.count() + " livraisons)");
        } else {
            System.out.println("Pas assez de commandes pour créer les livraisons initiales.");
        }
    }

    private Livraison createLivraison(Commande commande, LocalDate date, String etat) {
        Livraison livraison = new Livraison();
        livraison.setCommande(commande);
        livraison.setDateLivraisonReelle(date);
        livraison.setEtatLivraison(etat);
        return livraison;
    }
}
