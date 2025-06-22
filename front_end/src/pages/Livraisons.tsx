
import React, { useState, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Truck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Livraisons = () => {
  const { commandes, livraisons, fournisseurs, addLivraison } = useData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    idCommande: 0,
    dateLivraisonReelle: new Date().toISOString().split('T')[0],
    etatLivraison: 'conforme' as const
  });

  const commandesValidees = commandes.filter(c => c.etat === 'validée');
  const commandesNonLivrees = commandesValidees.filter(c => 
    !livraisons.find(l => l.idCommande === c.idCommande)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLivraison(formData);
    toast({
      title: "Livraison enregistrée",
      description: "La livraison a été enregistrée avec succès.",
    });
    setShowForm(false);
    setFormData({
      idCommande: 0,
      dateLivraisonReelle: new Date().toISOString().split('T')[0],
      etatLivraison: 'conforme'
    });
  };

  const statusColors = {
    'conforme': 'bg-green-100 text-green-800 border-green-200',
    'non conforme': 'bg-red-100 text-red-800 border-red-200',
    'partielle': 'bg-orange-100 text-orange-800 border-orange-200'
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Livraisons</h1>
          <p className="text-slate-600 mt-2">Gérez les livraisons des commandes</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Enregistrer une livraison
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Nouvelle livraison</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="commande">Commande</Label>
              <select
                id="commande"
                value={formData.idCommande}
                onChange={(e) => setFormData({ ...formData, idCommande: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md"
                required
              >
                <option value={0}>Sélectionner une commande</option>
                {commandesNonLivrees.map(c => {
                  const fournisseur = fournisseurs.find(f => f.idFournisseur === c.idFournisseur);
                  return (
                    <option key={c.idCommande} value={c.idCommande}>
                      Commande #{c.idCommande} - {fournisseur?.nom}
                    </option>
                  );
                })}
              </select>
            </div>
            
            <div>
              <Label htmlFor="dateLivraison">Date de livraison réelle</Label>
              <Input
                id="dateLivraison"
                type="date"
                value={formData.dateLivraisonReelle}
                onChange={(e) => setFormData({ ...formData, dateLivraisonReelle: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="etatLivraison">État de la livraison</Label>
              <select
                id="etatLivraison"
                value={formData.etatLivraison}
                onChange={(e) => setFormData({ ...formData, etatLivraison: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md"
              >
                <option value="conforme">Conforme</option>
                <option value="non conforme">Non conforme</option>
                <option value="partielle">Partielle</option>
              </select>
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
        {livraisons.map((livraison) => {
          const commande = commandes.find(c => c.idCommande === livraison.idCommande);
          const fournisseur = fournisseurs.find(f => f.idFournisseur === commande?.idFournisseur);
          
          return (
            <Card key={livraison.idLivraison} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">
                      Livraison #{livraison.idLivraison}
                    </h3>
                    <Badge className={statusColors[livraison.etatLivraison]}>
                      {livraison.etatLivraison}
                    </Badge>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Commande:</span>
                      <p className="font-medium">#{commande?.idCommande}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Fournisseur:</span>
                      <p className="font-medium">{fournisseur?.nom}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Date de livraison:</span>
                      <p className="font-medium">
                        {new Date(livraison.dateLivraisonReelle).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {livraisons.length === 0 && (
        <Card className="p-12 text-center">
          <Truck className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p className="text-slate-600">Aucune livraison enregistrée</p>
        </Card>
      )}
    </div>
  );
};

export default Livraisons;
