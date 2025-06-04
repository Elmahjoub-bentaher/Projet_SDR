
export interface Utilisateur {
  idUtilisateur: number;
  nom: string;
  email: string;
  motDePasse: string;
  role: 'admin' | 'utilisateur';
}

export interface Fournisseur {
  idFournisseur: number;
  nom: string;
  adresse: string;
  email: string;
  telephone: string;
  siret: string;
  conditionsPaiement: string;
}

export interface LigneCommande {
  idLigne: number;
  quantite: number;
  prixUnitaire: number;
  descriptionArticle: string;
  idCommande: number;
}

export interface Commande {
  idCommande: number;
  dateCommande: string;
  dateLivraisonPrevue: string;
  etat: 'en attente' | 'validée' | 'livrée';
  montantTotal: number;
  idFournisseur: number;
  idUtilisateur: number;
  lignesCommande?: LigneCommande[];
  fournisseur?: Fournisseur;
}

export interface Livraison {
  idLivraison: number;
  dateLivraisonReelle: string;
  etatLivraison: 'conforme' | 'non conforme' | 'partielle';
  idCommande: number;
}

export interface Facture {
  idFacture: number;
  numeroFacture: string;
  montant: number;
  dateEcheance: string;
  datePaiement?: string;
  etatPaiement: 'en attente' | 'payée';
  idCommande: number;
}
