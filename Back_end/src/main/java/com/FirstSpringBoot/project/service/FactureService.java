package com.FirstSpringBoot.project.service;

import com.FirstSpringBoot.project.model.Facture;
import com.FirstSpringBoot.project.repository.FactureRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FactureService {
    private final FactureRepository repository;

    public FactureService(FactureRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public Facture create(Facture facture) {
        return repository.save(facture);
    }

    // READ
    public List<Facture> findAll() {
        return repository.findAll();
    }

    public Facture findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Facture non trouvée"));
    }

    // UPDATE
    public Facture update(Long id, Facture updatedFacture) {
        Facture existing = findById(id);
        existing.setNumeroFacture(updatedFacture.getNumeroFacture());
        existing.setMontant(updatedFacture.getMontant());
        existing.setDateEcheance(updatedFacture.getDateEcheance());
        existing.setDatePaiement(updatedFacture.getDatePaiement());
        existing.setEtatPaiement(updatedFacture.getEtatPaiement());
        return repository.save(existing);
    }

    // DELETE
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
