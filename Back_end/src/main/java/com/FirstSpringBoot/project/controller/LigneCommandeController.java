package com.FirstSpringBoot.project.controller;

import com.FirstSpringBoot.project.model.LigneCommande;
import com.FirstSpringBoot.project.repository.LigneCommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lignes-commande")
public class LigneCommandeController {

    @Autowired
    private LigneCommandeRepository ligneCommandeRepository;

    // GET all lignes
    @GetMapping
    public List<LigneCommande> getAllLignes() {
        return ligneCommandeRepository.findAll();
    }

    // GET lignes by commande ID
    @GetMapping("/commande/{id}")
    public List<LigneCommande> getLignesByCommande(@PathVariable Long id) {
        return ligneCommandeRepository.findByCommande_IdCommande(id);
    }
}
