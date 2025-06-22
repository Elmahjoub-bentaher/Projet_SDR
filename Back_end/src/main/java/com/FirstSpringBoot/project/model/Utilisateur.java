// package com.FirstSpringBoot.project.model;

// import jakarta.persistence.*;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// import java.util.List;

// @Entity
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// public class Utilisateur {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long idUtilisateur;

//     private String nom;
//     private String email;
//     private String motDePasse;
//     private String role;

//     @OneToMany(mappedBy = "utilisateur")
//     private List<Commande> commandes;
// }




package com.FirstSpringBoot.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "users") 
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUtilisateur;

    private String nom;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String motDePasse;

    @Enumerated(EnumType.STRING) // IMPORTANT: Persist the enum as its string name in the database
    @Column(nullable = false)
    private Role role; // Changed from String to Role enum

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference(value = "utilisateur-commandes")
    private List<Commande> commandes;

    // Note: If you don't have a 'Commande' entity, you can remove the 'commandes' field
    // and the @OneToMany annotation.
}


