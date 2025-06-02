package com.FirstSpringBoot.project.repository;

import com.FirstSpringBoot.project.model.Livraison;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LivraisonRepository extends JpaRepository<Livraison, Long> {
    // Méthodes custom si besoin :
//    Optional<Livraison> findByCommandeIdCommande(Long commandeId);
}