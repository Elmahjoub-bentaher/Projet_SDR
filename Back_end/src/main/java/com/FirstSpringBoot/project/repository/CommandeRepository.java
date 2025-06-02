package com.FirstSpringBoot.project.repository;

import com.FirstSpringBoot.project.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {
    // Exemples de méthodes custom :
    // List<Commande> findByEtat(String etat);
    // List<Commande> findByUtilisateurIdUtilisateur(Long utilisateurId);
}
