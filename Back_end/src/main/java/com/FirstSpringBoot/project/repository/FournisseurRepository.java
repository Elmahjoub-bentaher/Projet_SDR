package com.FirstSpringBoot.project.repository;

import com.FirstSpringBoot.project.model.Fournisseur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FournisseurRepository extends JpaRepository<Fournisseur, Long> {
    // Méthodes custom si besoin, par ex. :
//    Optional<Fournisseur> findBySiret(String siret);
}