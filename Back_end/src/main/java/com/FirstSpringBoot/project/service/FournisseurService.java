package com.FirstSpringBoot.project.service;

import com.FirstSpringBoot.project.model.Fournisseur;
import com.FirstSpringBoot.project.repository.FournisseurRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FournisseurService {
    private final FournisseurRepository repository;

    public FournisseurService(FournisseurRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public Fournisseur create(Fournisseur fournisseur) {
        return repository.save(fournisseur);
    }

    // READ
    public List<Fournisseur> findAll() {
        return repository.findAll();
    }

    public Fournisseur findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fournisseur non trouvé"));
    }

    // UPDATE
    public Fournisseur update(Long id, Fournisseur updatedFournisseur) {
        Fournisseur existing = findById(id);
        existing.setNom(updatedFournisseur.getNom());
        existing.setAdresse(updatedFournisseur.getAdresse());
        // Mettre à jour les autres champs...
        return repository.save(existing);
    }

    // DELETE
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
