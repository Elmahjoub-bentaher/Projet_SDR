package com.FirstSpringBoot.project.repository;

import com.FirstSpringBoot.project.model.Fournisseur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FournisseurRepository extends JpaRepository<Fournisseur, Long> {
    // Méthodes personnalisées (optionnelles)
    List<Fournisseur> findByNomContaining(String keyword);
    boolean existsBySiret(String siret);
}