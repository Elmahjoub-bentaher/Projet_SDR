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

  const [formData, setFormData] = useState<{
    dateCommande: string;
    dateLivraisonPrevue: string;
    montantTotal: number;
    idFournisseur: number;
    etat: 'En cours' | 'validée' | 'livrée';
    lignes: {
      descriptionArticle: string;
      prixUnitaire: number;
      quantite: number;
    }[];
  }>({
    dateCommande: new Date().toISOString().split('T')[0],
    dateLivraisonPrevue: '',
    montantTotal: 0,
    idFournisseur: 0,
    etat: 'En cours',
    lignes: []
  });

  const isEditing = !!id;
  const commande = isEditing ? commandes.find(c => c.idCommande === parseInt(id)) : null;

  useEffect(() => {
    if (commande) {
      setFormData({
        dateCommande: commande.dateCommande,
        dateLivraisonPrevue: commande.dateLivraisonPrevue,
        montantTotal: commande.montantTotal,
        idFournisseur: commande.idFournisseur,
        etat: commande.etat,
        lignes: commande.lignes || []
      });
    }
  }, [commande]);

  const calculateTotal = () => {
    return formData.lignes.reduce((sum, ligne) => sum + ligne.prixUnitaire * ligne.quantite, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) return;

    const commandeData = {
      ...formData,
      montantTotal: calculateTotal(),
      idUtilisateur: currentUser.idUtilisateur
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
              onChange={(e) =>
                setFormData({ ...formData, idFournisseur: parseInt(e.target.value) })
              }
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
            <Label>Articles</Label>
            {formData.lignes.map((ligne, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                <Input
                  placeholder="Article"
                  value={ligne.descriptionArticle}
                  onChange={(e) => {
                    const updated = [...formData.lignes];
                    updated[index].descriptionArticle = e.target.value;
                    setFormData({ ...formData, lignes: updated });
                  }}
                />
                <Input
                  placeholder="Prix"
                  type="number"
                  value={ligne.prixUnitaire}
                  onChange={(e) => {
                    const updated = [...formData.lignes];
                    updated[index].prixUnitaire = parseFloat(e.target.value);
                    setFormData({ ...formData, lignes: updated });
                  }}
                />
                <Input
                  placeholder="Qté"
                  type="number"
                  value={ligne.quantite}
                  onChange={(e) => {
                    const updated = [...formData.lignes];
                    updated[index].quantite = parseInt(e.target.value);
                    setFormData({ ...formData, lignes: updated });
                  }}
                />
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setFormData({
                  ...formData,
                  lignes: [
                    ...formData.lignes,
                    { descriptionArticle: '', prixUnitaire: 0, quantite: 1 }
                  ]
                })
              }
            >
              Ajouter un article
            </Button>
          </div>

          <div>
            <Label>Montant total calculé (€)</Label>
            <Input
              type="number"
              readOnly
              value={calculateTotal().toFixed(2)}
              className="bg-gray-100"
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
