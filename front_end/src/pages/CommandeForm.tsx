
import React, { useState, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Commande } from '@/types';

const CommandeForm = () => {
  const { commandes, fournisseurs, addCommande, updateCommande } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //  useEffect(() => {
  //   async function loadData() {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`http://${window.location.hostname}:8080/api/fournisseurs`, {
  //         credentials: 'include'
  //       });
        
  //       if (!response.ok) throw new Error('Network response was not ok');
        
  //       const data = await response.json();
  //       fournisseurs = data;
  //     } catch (err) {
  //       setError(err.message);
  //       console.error('Fetch error:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   // Only fetch if empty
  //   if (fournisseurs.length === 0) {
  //     loadData();
  //   }
  // }, []);

  // if (loading) return <div>Loading fournisseurs...</div>;
  // if (error) return <div>Error: {error}</div>;
  
  const [formData, setFormData] = useState<{
    dateCommande: string;
    dateLivraisonPrevue: string;
    montantTotal: number;
    fournisseur: {};
    etat: 'En cours' | 'validée' | 'livrée';
  }>({
    dateCommande: new Date().toISOString().split('T')[0],
    dateLivraisonPrevue: '',
    montantTotal: 0,
    idFournisseur: 0,
    etat: 'En cours'
  });

  const isEditing = !!id;
  const commande = isEditing ? commandes.find(c => c.idCommande === parseInt(id)) : null;

  useEffect(() => {
    if (commande) {
      setFormData({
        dateCommande: commande.dateCommande,
        dateLivraisonPrevue: commande.dateLivraisonPrevue,
        montantTotal: commande.montantTotal,
        fournisseur: commande.fournisseur,
        etat: commande.etat
      });
    }
  }, [commande]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;
    console.log("user", currentUser);
    
    const commandeData = {
      ...formData,
    utilisateur: currentUser
    };

    if (isEditing && commande) {
      updateCommande(commande.idCommande, commandeData);
      toast({
        title: "Commande modifiée",
        description: "La commande a été mise à jour avec succès.",
      });
    } else {
      addCommande(commandeData);
      toast({
        title: "Commande créée",
        description: "La nouvelle commande a été créée avec succès.",
      });
    }
    
    navigate('/commandes');
  };

  return (
    <div className="p-6">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? 'Modifier la commande' : 'Nouvelle commande'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateCommande">Date de commande</Label>
              <Input
                id="dateCommande"
                type="date"
                value={formData.dateCommande}
                onChange={(e) => setFormData({ ...formData, dateCommande: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="dateLivraisonPrevue">Date de livraison prévue</Label>
              <Input
                id="dateLivraisonPrevue"
                type="date"
                value={formData.dateLivraisonPrevue}
                onChange={(e) => setFormData({ ...formData, dateLivraisonPrevue: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="fournisseur">Fournisseur</Label>
            <select
              id="fournisseur"
              value={formData.idFournisseur}
              onChange={(e) => setFormData({ ...formData, idFournisseur: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-slate-200 rounded-md"
              required
            >
              <option value={0}>Sélectionner un fournisseur</option>
              {fournisseurs.map(f => (
                <option key={f.idFournisseur} value={f.idFournisseur}>
                  {f.nom}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <Label htmlFor="montantTotal">Montant total (€)</Label>
            <Input
              id="montantTotal"
              type="number"
              step="0.01"
              value={formData.montantTotal}
              onChange={(e) => setFormData({ ...formData, montantTotal: parseFloat(e.target.value) })}
              required
            />
          </div>
          
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              {isEditing ? 'Modifier' : 'Créer'} la commande
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/commandes')}>
              Annuler
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CommandeForm;

