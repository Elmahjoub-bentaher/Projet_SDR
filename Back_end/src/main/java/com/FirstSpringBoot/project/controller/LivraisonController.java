package com.FirstSpringBoot.project.controller;

import com.FirstSpringBoot.project.model.Livraison;
import com.FirstSpringBoot.project.service.LivraisonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livraisons")
public class LivraisonController {
    private final LivraisonService service;

    public LivraisonController(LivraisonService service) {
        this.service = service;
    }

    @PostMapping
    public Livraison create(@RequestBody Livraison livraison) {
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
    public Livraison update(@PathVariable Long id, @RequestBody Livraison livraison) {
        return service.update(id, livraison);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

