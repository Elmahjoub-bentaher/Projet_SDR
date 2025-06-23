package com.FirstSpringBoot.project.repository;

import com.FirstSpringBoot.project.model.Facture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FactureRepository extends JpaRepository<Facture, Long> {
    List<Facture> findByEtatPaiement(String etatPaiement);
    List<Facture> findByNumeroFactureContaining(String keyword);
}
