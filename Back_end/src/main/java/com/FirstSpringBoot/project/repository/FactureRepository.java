package com.FirstSpringBoot.project.repository;

import com.FirstSpringBoot.project.model.Facture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FactureRepository extends JpaRepository<Facture, Long> {
    // Par exemple :
//    List<Facture> findByEtatPaiement(String etatPaiement);
}