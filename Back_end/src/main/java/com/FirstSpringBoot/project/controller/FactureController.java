package com.FirstSpringBoot.project.controller;

import com.FirstSpringBoot.project.model.Facture;
import com.FirstSpringBoot.project.service.FactureService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/factures")
public class FactureController {
    private final FactureService service;

    public FactureController(FactureService service) {
        this.service = service;
    }

    @PostMapping
    public Facture create(@RequestBody Facture facture) {
        return service.create(facture);
    }

    @GetMapping
    public List<Facture> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Facture findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PutMapping("/{id}")
    public Facture update(@PathVariable Long id, @RequestBody Facture facture) {
        return service.update(id, facture);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
