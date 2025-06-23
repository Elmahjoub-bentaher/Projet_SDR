package com.FirstSpringBoot.project.util;

import com.FirstSpringBoot.project.model.Commande;
import com.FirstSpringBoot.project.model.Facture;
import com.FirstSpringBoot.project.repository.CommandeRepository;
import com.FirstSpringBoot.project.repository.FactureRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

import org.springframework.core.annotation.Order;

@Order(5)
@Component
public class FactureDataLoader implements CommandLineRunner {

    private final FactureRepository factureRepository;
    private final CommandeRepository commandeRepository;

    public FactureDataLoader(FactureRepository factureRepository, CommandeRepository commandeRepository) {
        this.factureRepository = factureRepository;
        this.commandeRepository = commandeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (factureRepository.count() == 0 && commandeRepository.count() > 0) {
            loadInitialFactures();
        }
    }

    private void loadInitialFactures() {
		
        List<Commande> commandes = commandeRepository.findAll();
		
        Facture f1 = new Facture(null, "FAC-001", 1200.50f, LocalDate.now().plusDays(30), null, "Non payée", commandes.get(0));
        Facture f2 = new Facture(null, "FAC-002", 950.00f, LocalDate.now().plusDays(15), LocalDate.now(), "Payée", commandes.get(1));
        Facture f3 = new Facture(null, "FAC-003", 600.75f, LocalDate.now().plusDays(10), null, "En attente", commandes.get(2));

        factureRepository.saveAll(List.of(f1, f2, f3));
        System.out.println("Factures initiales chargées (" + factureRepository.count() + ")");
    }
}
