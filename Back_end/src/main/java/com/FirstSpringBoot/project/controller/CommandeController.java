// package com.FirstSpringBoot.project.controller;

// import com.FirstSpringBoot.project.request.CommandeRequest;
// import com.FirstSpringBoot.project.model.Commande;
// import com.FirstSpringBoot.project.service.CommandeService;
// import jakarta.validation.Valid;
// import org.springframework.http.HttpStatus;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/commandes")
// public class CommandeController {

//     private final CommandeService commandeService;

//     public CommandeController(CommandeService commandeService) {
//         this.commandeService = commandeService;
//     }

//     // @PostMapping
//     // @ResponseStatus(HttpStatus.CREATED)
//     // public Commande createCommande(@Valid @RequestBody CommandeRequest request) {
//     //     return commandeService.createCommande(request);
//     // }
//     @PostMapping
//     public Commande createCommande(@RequestBody Commande commande) {
//         return commandeService.createCommande(commande);
//     }

//     @GetMapping
//     public List<Commande> getAllCommandes() {
//         return commandeService.getAllCommandes();
//     }

//     @GetMapping("/{id}")
//     public Commande getCommandeById(@PathVariable Long id) {
//         return commandeService.getCommandeById(id);
//     }

//     @PutMapping("/{id}")
//     public Commande updateCommande(@PathVariable Long id, 
//                                  @Valid @RequestBody CommandeRequest request) {
//         return commandeService.updateCommande(id, request);
//     }

//     @DeleteMapping("/{id}")
//     @ResponseStatus(HttpStatus.NO_CONTENT)
//     public void deleteCommande(@PathVariable Long id) {
//         commandeService.deleteCommande(id);
//     }
// }

package com.FirstSpringBoot.project.controller;

import com.FirstSpringBoot.project.model.Commande;
import com.FirstSpringBoot.project.service.CommandeService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commandes")
public class CommandeController {

    private final CommandeService commandeService;

    public CommandeController(CommandeService commandeService) {
        this.commandeService = commandeService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Commande createCommande(@RequestBody Commande commande) {
        return commandeService.createCommande(commande);
    }

    @GetMapping
    public List<Commande> getAllCommandes() {
        return commandeService.getAllCommandes();
    }

    @GetMapping("/{id}")
    public Commande getCommandeById(@PathVariable Long id) {
        return commandeService.getCommandeById(id);
    }

    @PutMapping("/{id}")
    public Commande updateCommande(@PathVariable Long id, 
                                 @RequestBody Commande commande) {
        return commandeService.updateCommande(id, commande);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCommande(@PathVariable Long id) {
        commandeService.deleteCommande(id);
    }
}