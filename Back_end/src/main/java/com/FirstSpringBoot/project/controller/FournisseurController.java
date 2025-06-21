package com.FirstSpringBoot.project.controller;

import com.FirstSpringBoot.project.model.Fournisseur;
import com.FirstSpringBoot.project.service.FournisseurService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fournisseurs")
public class FournisseurController {
    private final FournisseurService service;

    public FournisseurController(FournisseurService service) {
        this.service = service;
    }

    @PostMapping
    public Fournisseur create(@RequestBody Fournisseur fournisseur) {
        return service.create(fournisseur);
    }

    @GetMapping
    public List<Fournisseur> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Fournisseur findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PutMapping("/{id}")
    public Fournisseur update(@PathVariable Long id, @RequestBody Fournisseur fournisseur) {
        return service.update(id, fournisseur);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

