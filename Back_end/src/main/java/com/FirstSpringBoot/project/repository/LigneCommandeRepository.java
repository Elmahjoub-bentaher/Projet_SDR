package com.FirstSpringBoot.project.repository;

import com.FirstSpringBoot.project.model.LigneCommande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LigneCommandeRepository extends JpaRepository<LigneCommande, Long> {
    // Par exemple :
//    List<LigneCommande> findByCommandeIdCommande(Long commandeId);
	List<LigneCommande> findByCommande_IdCommande(Long commandeId);
}
