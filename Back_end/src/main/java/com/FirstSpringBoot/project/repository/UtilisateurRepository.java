package com.FirstSpringBoot.project.repository;

import com.FirstSpringBoot.project.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    // Vous pouvez ajouter ici des méthodes de requête custom si besoin
}