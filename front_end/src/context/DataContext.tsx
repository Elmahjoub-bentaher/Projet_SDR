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

  // API fetch on mount
  // useEffect(() => {
  // const fetchData = async () => {
  //   try {
  //     const [
  //       commandesRes,
  //       fournisseursRes,
  //       utilisateursRes,
  //       lignesRes,
  //       livraisonsRes,
  //       facturesRes
  //     ] =C
  //       fetch(`http://${window.location.hostname}:8080/api/commandes`, {method: "GET", headers: { "Content-Type": "application/json", }, credentials: "include", }),
	// 	fetch(`http://${window.location.hostname}:8080/api/fournisseurs`, {method: "GET", headers: { "Content-Type": "application/json", }, credentials: "include", }),
	// 	fetch(`http://${window.location.hostname}:8080/api/utilisateurs`, {method: "GET", headers: { "Content-Type": "application/json", }, credentials: "include", }),
	// 	fetch(`http://${window.location.hostname}:8080/api/lignes-commande`, {method: "GET", headers: { "Content-Type": "application/json", }, credentials: "include", }),
	// 	fetch(`http://${window.location.hostname}:8080/api/livraisons`, {method: "GET", headers: { "Content-Type": "application/json", }, credentials: "include", }),
	// 	fetch(`http://${window.location.hostname}:8080/api/factures`, {method: "GET", headers: { "Content-Type": "application/json", }, credentials: "include", })
  //     ]);

  //     const [
  //       commandesData,
  //       fournisseursData,
  //       utilisateursData,
  //       lignesCommandeData,
  //       livraisonsData,
  //       facturesData
  //     ] = await Promise.all([
  //       commandesRes.json(),
  //       fournisseursRes.json(),
  //       utilisateursRes.json(),
  //       lignesRes.json(),
  //       livraisonsRes.json(),
  //       facturesRes.json()
  //     ]);
      
  //     setCommandes(Array.isArray(commandesData) ? commandesData : []);
	//   setFournisseurs(Array.isArray(fournisseursData) ? fournisseursData : []);
	//   setUtilisateurs(Array.isArray(utilisateursData) ? utilisateursData : []);
	//   setLignesCommande(Array.isArray(lignesCommandeData) ? lignesCommandeData : []);
	//   setLivraisons(Array.isArray(livraisonsData) ? livraisonsData : []);
	//   setFactures(Array.isArray(facturesData) ? facturesData : []);
    
  //   } catch (error) {
  //     console.error("Erreur lors du chargement des données:", error);
  //   }
  // };

  // fetchData();
  // }, []);
  useEffect(() => {
  const fetchData = async () => {
    // Define all endpoints and their corresponding state setters
    const endpoints = [
      { name: 'commandes', setter: setCommandes },
      { name: 'fournisseurs', setter: setFournisseurs },
      { name: 'utilisateurs', setter: setUtilisateurs },
      { name: 'lignes-commande', setter: setLignesCommande },
      { name: 'livraisons', setter: setLivraisons },
      { name: 'factures', setter: setFactures },
    ];

    // Fetch data for each endpoint independently
    endpoints.forEach(async ({ name, setter }) => {
      try {
        const res = await fetch(`http://${window.location.hostname}:8080/api/${name}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch ${name}: ${res.status}`);
        }

        const data = await res.json();
        setter(Array.isArray(data) ? data : []); // Ensure data is always an array
        console.log(`${name} data loaded:`, data); // Debug log
      } catch (error) {
        console.error(`Error fetching ${name}:`, error);
        setter([]); // Set empty array on error
      }
    });
  };

  fetchData();
}, []);


  const addCommande = async (commande: Omit<Commande, 'idCommande'>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/commandes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', credentials: "include", },
        body: JSON.stringify(commande),
      });
      if (res.ok) {
        const newCommande = await res.json();
        setCommandes(prev => [...prev, newCommande]);
      }
    } catch (error) {
      console.error('Erreur ajout commande :', error);
    }
  };

  const updateCommande = async (id: number, commandeUpdate: Partial<Commande>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/commandes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', credentials: "include", },
        body: JSON.stringify(commandeUpdate),
      });
      if (res.ok) {
        const updated = await res.json();
        setCommandes(prev => prev.map(c => c.idCommande === id ? updated : c));
      }
    } catch (error) {
      console.error('Erreur mise à jour commande :', error);
    }
  };

  const addFournisseur = async (fournisseur: Omit<Fournisseur, 'idFournisseur'>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/fournisseurs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', credentials: "include", },
        body: JSON.stringify(fournisseur),
      });
      if (res.ok) {
        const newFournisseur = await res.json();
        setFournisseurs(prev => [...prev, newFournisseur]);
      }
    } catch (error) {
      console.error('Erreur ajout fournisseur :', error);
    }
  };

  const updateFournisseur = async (id: number, fournisseurUpdate: Partial<Fournisseur>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/fournisseurs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', credentials: "include", },
        body: JSON.stringify(fournisseurUpdate),
      });
      if (res.ok) {
        const updated = await res.json();
        setFournisseurs(prev => prev.map(f => f.idFournisseur === id ? updated : f));
      }
    } catch (error) {
      console.error('Erreur mise à jour fournisseur :', error);
    }
  };

  const addLigneCommande = async (ligne: Omit<LigneCommande, 'idLigne'>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/lignes-commande`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', credentials: "include", },
        body: JSON.stringify(ligne),
      });
      if (res.ok) {
        const newLigne = await res.json();
        setLignesCommande(prev => [...prev, newLigne]);
      }
    } catch (error) {
      console.error('Erreur ajout ligne commande :', error);
    }
  };

  const addLivraison = async (livraison: Omit<Livraison, 'idLivraison'>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/livraisons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', credentials: "include", },
        body: JSON.stringify(livraison),
      });
      if (res.ok) {
        const newLivraison = await res.json();
        setLivraisons(prev => [...prev, newLivraison]);
      }
    } catch (error) {
      console.error('Erreur ajout livraison :', error);
    }
  };

  const updateLivraison = async (id: number, livraisonUpdate: Partial<Livraison>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/livraisons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', credentials: "include", },
        body: JSON.stringify(livraisonUpdate),
      });
      if (res.ok) {
        const updated = await res.json();
        setLivraisons(prev => prev.map(f => f.idLivraison === id ? updated : f));
      }
    } catch (error) {
      console.error('Erreur mise à jour livraison :', error);
    }
  };

  const addFacture = async (facture: Omit<Facture, 'idFacture'>) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/factures`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', credentials: "include", },
        body: JSON.stringify(facture),
      });
      if (res.ok) {
        const newFacture = await res.json();
        setFactures(prev => [...prev, newFacture]);
      }
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
