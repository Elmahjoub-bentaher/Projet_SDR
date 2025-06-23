import React, { createContext, useContext, useState, useEffect } from 'react';
import { Commande, Fournisseur, LigneCommande, Livraison, Facture, Utilisateur } from '@/types';

interface DataContextType {
  commandes: Commande[];
  fournisseurs: Fournisseur[];
  lignesCommande: LigneCommande[];
  livraisons: Livraison[];
  factures: Facture[];
  utilisateurs: Utilisateur[];
  addCommande: (commande: Omit<Commande, 'idCommande'>) => void;
  updateCommande: (id: number, commande: Partial<Commande>) => void;
  addFournisseur: (fournisseur: Omit<Fournisseur, 'idFournisseur'>) => void;
  updateFournisseur: (id: number, fournisseur: Partial<Fournisseur>) => void;
  addLigneCommande: (ligne: Omit<LigneCommande, 'idLigne'>) => void;
  addLivraison: (livraison: Omit<Livraison, 'idLivraison'>) => void;
  addFacture: (facture: Omit<Facture, 'idFacture'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([]);
  const [lignesCommande, setLignesCommande] = useState<LigneCommande[]>([]);
  const [livraisons, setLivraisons] = useState<Livraison[]>([]);
  const [factures, setFactures] = useState<Facture[]>([]);
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoints = [
        { name: 'commandes', setter: setCommandes },
        { name: 'fournisseurs', setter: setFournisseurs },
        { name: 'utilisateurs', setter: setUtilisateurs },
        { name: 'lignes-commande', setter: setLignesCommande },
        { name: 'livraisons', setter: setLivraisons },
        { name: 'factures', setter: setFactures },
      ];

      endpoints.forEach(async ({ name, setter }) => {
        try {
          const res = await fetch(`http://${window.location.hostname}:8080/api/${name}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });

          if (!res.ok) throw new Error(`Failed to fetch ${name}: ${res.status}`);
          const data = await res.json();
          setter(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error(`Error fetching ${name}:`, error);
          setter([]);
        }
      });
    };

    fetchData();
  }, []);

  const addCommande = async (commande: Omit<Commande, 'idCommande'>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/commandes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(commande),
      });

      const data = await res.json();
      if (res.ok) setCommandes(prev => [...prev, data]);
      else console.error('Erreur ajout commande (status):', res.status, data);
    } catch (error) {
      console.error('Erreur ajout commande :', error);
    }
  };

  const updateCommande = async (id: number, commandeUpdate: Partial<Commande>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/commandes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(commandeUpdate),
      });

      const updated = await res.json();
      if (res.ok) {
        setCommandes(prev => prev.map(c => c.idCommande === id ? updated : c));
      } else {
        console.error('Erreur mise à jour commande (status):', res.status, updated);
      }
    } catch (error) {
      console.error('Erreur mise à jour commande :', error);
    }
  };

  const addFournisseur = async (fournisseur: Omit<Fournisseur, 'idFournisseur'>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/fournisseurs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(fournisseur),
      });

      const data = await res.json();
      if (res.ok) setFournisseurs(prev => [...prev, data]);
      else console.error('Erreur ajout fournisseur (status):', res.status, data);
    } catch (error) {
      console.error('Erreur ajout fournisseur :', error);
    }
  };

  const updateFournisseur = async (id: number, fournisseurUpdate: Partial<Fournisseur>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/fournisseurs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(fournisseurUpdate),
      });

      const updated = await res.json();
      if (res.ok) {
        setFournisseurs(prev => prev.map(f => f.idFournisseur === id ? updated : f));
      } else {
        console.error('Erreur mise à jour fournisseur (status):', res.status, updated);
      }
    } catch (error) {
      console.error('Erreur mise à jour fournisseur :', error);
    }
  };

  const addLigneCommande = async (ligne: Omit<LigneCommande, 'idLigne'>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/lignes-commande`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(ligne),
      });

      const data = await res.json();
      if (res.ok) setLignesCommande(prev => [...prev, data]);
      else console.error('Erreur ajout ligne commande (status):', res.status, data);
    } catch (error) {
      console.error('Erreur ajout ligne commande :', error);
    }
  };

  const addLivraison = async (livraison: Omit<Livraison, 'idLivraison'>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/livraisons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(livraison),
      });

      const data = await res.json();
      if (res.ok) setLivraisons(prev => [...prev, data]);
      else console.error('Erreur ajout livraison (status):', res.status, data);
    } catch (error) {
      console.error('Erreur ajout livraison :', error);
    }
  };

  const updateLivraison = async (id: number, livraisonUpdate: Partial<Livraison>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/livraisons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(livraisonUpdate),
      });

      const updated = await res.json();
      if (res.ok) {
        setLivraisons(prev => prev.map(f => f.idLivraison === id ? updated : f));
      } else {
        console.error('Erreur mise à jour livraison (status):', res.status, updated);
      }
    } catch (error) {
      console.error('Erreur mise à jour livraison :', error);
    }
  };

  const addFacture = async (facture: Omit<Facture, 'idFacture'>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/factures`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(facture),
      });

      const data = await res.json();
      if (res.ok) setFactures(prev => [...prev, data]);
      else console.error('Erreur ajout facture (status):', res.status, data);
    } catch (error) {
      console.error('Erreur ajout facture :', error);
    }
  };

  return (
    <DataContext.Provider value={{
      commandes,
      fournisseurs,
      lignesCommande,
      livraisons,
      factures,
      utilisateurs,
      addCommande,
      updateCommande,
      addFournisseur,
      updateFournisseur,
      addLigneCommande,
      addLivraison,
      addFacture,
      updateLivraison
    }}>
      {children}
    </DataContext.Provider>
  );
};
