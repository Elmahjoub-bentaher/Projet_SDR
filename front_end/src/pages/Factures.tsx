
import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Factures = () => {
  const { commandes, factures, fournisseurs, addFacture } = useData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    idCommande: 0,
    numeroFacture: '',
    montant: 0,
    dateEcheance: '',
    etatPaiement: 'en attente' as const
  });

  const commandesValidees = commandes.filter(c => c.etat === 'validée');
  const commandesSansFacture = commandesValidees.filter(c => 
    !factures.find(f => f.idCommande === c.idCommande)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFacture(formData);
    toast({
      title: "Facture enregistrée",
      description: "La facture a été enregistrée avec succès.",
    });
    setShowForm(false);
    setFormData({
      idCommande: 0,
      numeroFacture: '',
      montant: 0,
      dateEcheance: '',
      etatPaiement: 'en attente'
    });
  };

  const statusColors = {
    'en attente': 'bg-orange-100 text-orange-800 border-orange-200',
    'payée': 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Factures</h1>
          <p className="text-slate-600 mt-2">Gérez les factures des commandes</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Enregistrer une facture
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Nouvelle facture</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="commande">Commande</Label>
              <select
                id="commande"
                value={formData.idCommande}
                onChange={(e) => {
                  const commandeId = parseInt(e.target.value);
                  const commande = commandes.find(c => c.idCommande === commandeId);
                  setFormData({ 
                    ...formData, 
                    idCommande: commandeId,
                    montant: commande?.montantTotal || 0
                  });
                }}
                className="w-full px-3 py-2 border border-slate-200 rounded-md"
                required
              >
                <option value={0}>Sélectionner une commande</option>
                {commandesSansFacture.map(c => {
                  const fournisseur = fournisseurs.find(f => f.idFournisseur === c.idFournisseur);
                  return (
                    <option key={c.idCommande} value={c.idCommande}>
                      Commande #{c.idCommande} - {fournisseur?.nom} - {c.montantTotal}€
                    </option>
                  );
                })}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numeroFacture">Numéro de facture</Label>
                <Input
                  id="numeroFacture"
                  value={formData.numeroFacture}
                  onChange={(e) => setFormData({ ...formData, numeroFacture: e.target.value })}
                  placeholder="F-2024-001"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="montant">Montant (€)</Label>
                <Input
                  id="montant"
                  type="number"
                  step="0.01"
                  value={formData.montant}
                  onChange={(e) => setFormData({ ...formData, montant: parseFloat(e.target.value) })}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="dateEcheance">Date d'échéance</Label>
              <Input
                id="dateEcheance"
                type="date"
                value={formData.dateEcheance}
                onChange={(e) => setFormData({ ...formData, dateEcheance: e.target.value })}
                required
              />
            </div>
            
            <div className="flex gap-4">
              <Button type="submit">Enregistrer</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {factures.map((facture) => {
          const commande = commandes.find(c => c.idCommande === facture.idCommande);
          const fournisseur = fournisseurs.find(f => f.idFournisseur === commande?.idFournisseur);
          
          return (
            <Card key={facture.idFacture} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">
                      {facture.numeroFacture}
                    </h3>
                    <Badge className={statusColors[facture.etatPaiement]}>
                      {facture.etatPaiement}
                    </Badge>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Commande:</span>
                      <p className="font-medium">#{commande?.idCommande}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Fournisseur:</span>
                      <p className="font-medium">{fournisseur?.nom}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Montant:</span>
                      <p className="font-medium">{facture.montant.toLocaleString('fr-FR')} €</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Échéance:</span>
                      <p className="font-medium">
                        {new Date(facture.dateEcheance).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {factures.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p className="text-slate-600">Aucune facture enregistrée</p>
        </Card>
      )}
    </div>
  );
};

export default Factures;
