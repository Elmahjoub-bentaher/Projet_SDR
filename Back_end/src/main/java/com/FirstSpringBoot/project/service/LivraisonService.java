package com.FirstSpringBoot.project.service;

import com.FirstSpringBoot.project.model.Livraison;
import com.FirstSpringBoot.project.model.Commande;
import com.FirstSpringBoot.project.repository.CommandeRepository;
import com.FirstSpringBoot.project.repository.LivraisonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
@Transactional
public class LivraisonService {
	
	private final CommandeRepository commandeRepository;

    private final LivraisonRepository repository;

    public LivraisonService(LivraisonRepository repository, CommandeRepository commandeRepository) {
        this.repository = repository;
		this.commandeRepository = commandeRepository;
    }

    public Livraison create(Livraison livraison) {
		// Récupérer l'entité Commande de la base
		Long commandeId = livraison.getCommande().getIdCommande();
		Commande commande = commandeRepository.findById(commandeId)
			.orElseThrow(() -> new RuntimeException("Commande introuvable avec ID: " + commandeId));

		livraison.setCommande(commande);
		
        return repository.save(livraison);
    }

    public List<Livraison> findAll() {
        return repository.findAll();
    }

    public Livraison findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livraison non trouvée avec ID: " + id));
    }

    public Livraison update(Long id, Livraison updatedLivraison) {
        Livraison existing = findById(id);
        existing.setDateLivraisonReelle(updatedLivraison.getDateLivraisonReelle());
        existing.setEtatLivraison(updatedLivraison.getEtatLivraison());
        existing.setCommande(updatedLivraison.getCommande());
        return repository.save(existing);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Impossible de supprimer : livraison non trouvée.");
        }
        repository.deleteById(id);
    }
}
