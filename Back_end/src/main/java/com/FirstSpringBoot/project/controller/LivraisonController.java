package com.FirstSpringBoot.project.controller;

import com.FirstSpringBoot.project.dto.LivraisonRequest;
import com.FirstSpringBoot.project.model.Commande;
import com.FirstSpringBoot.project.model.Livraison;
import com.FirstSpringBoot.project.service.LivraisonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livraisons")
@CrossOrigin(origins = "*")
public class LivraisonController {

    private final LivraisonService service;

    public LivraisonController(LivraisonService service) {
        this.service = service;
    }

    @PostMapping
    public Livraison create(@RequestBody LivraisonRequest req) {
        Commande commande = new Commande();
        commande.setIdCommande(req.getIdCommande());

        Livraison livraison = new Livraison();
        livraison.setDateLivraisonReelle(req.getDateLivraisonReelle());
        livraison.setEtatLivraison(req.getEtatLivraison());
        livraison.setCommande(commande);

        return service.create(livraison);
    }

    @GetMapping
    public List<Livraison> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Livraison findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PutMapping("/{id}")
    public Livraison update(@PathVariable Long id, @RequestBody LivraisonRequest req) {
        Commande commande = new Commande();
        commande.setIdCommande(req.getIdCommande());

        Livraison livraison = new Livraison();
        livraison.setDateLivraisonReelle(req.getDateLivraisonReelle());
        livraison.setEtatLivraison(req.getEtatLivraison());
        livraison.setCommande(commande);

        return service.update(id, livraison);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
