package com.FirstSpringBoot.project.util;

import com.FirstSpringBoot.project.model.Fournisseur;
import com.FirstSpringBoot.project.repository.FournisseurRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

/**
 * CommandLineRunner to insert initial supplier data into the database on application startup.
 */
import org.springframework.core.annotation.Order;

@Order(1)
@Component
public class FournisseurDataLoader implements CommandLineRunner {

    private final FournisseurRepository fournisseurRepository;

    public FournisseurDataLoader(FournisseurRepository fournisseurRepository) {
        this.fournisseurRepository = fournisseurRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (fournisseurRepository.count() == 0) {
            loadInitialFournisseurs();
        }
    }

    private void loadInitialFournisseurs() {
        Fournisseur technoPlus = createFournisseur(
            "TechnoPlus Inc.",
            "123 Tech Avenue, Silicon Valley, CA 94025",
            "contact@technoplus.com",
            "+1 650-123-4567",
            "12345678901234",
            "Net 30 days"
        );

        Fournisseur globalElectronics = createFournisseur(
            "Global Electronics",
            "456 Circuit Road, Boston, MA 02108",
            "sales@globalelectronics.com",
            "+1 617-987-6543",
            "98765432109876",
            "50% advance, 50% on delivery"
        );

        Fournisseur officeSolutions = createFournisseur(
            "Office Solutions Ltd.",
            "789 Business Park, Chicago, IL 60601",
            "info@officesolutions.com",
            "+1 312-555-7890",
            "45678901234567",
            "Payment due immediately"
        );

        fournisseurRepository.saveAll(List.of(technoPlus, globalElectronics, officeSolutions));
        System.out.println("Loaded initial supplier data (" + fournisseurRepository.count() + " suppliers)");
    }

    private Fournisseur createFournisseur(String nom, String adresse, String email, 
                                        String telephone, String siret, String conditionsPaiement) {
        Fournisseur fournisseur = new Fournisseur();
        fournisseur.setNom(nom);
        fournisseur.setAdresse(adresse);
        fournisseur.setEmail(email);
        fournisseur.setTelephone(telephone);
        fournisseur.setSiret(siret);
        fournisseur.setConditionsPaiement(conditionsPaiement);
        return fournisseur;
    }
}