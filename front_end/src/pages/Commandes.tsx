
import React, { useState, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Eye, Edit, Filter, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Commandes = () => {
  const { commandes, fournisseurs, updateCommande } = useData();
  const { currentUser, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('tous');

  console.log("auth", isAdmin);
  
  

  // Filtrer les commandes selon le rôle
  
  const userCommandes = isAdmin 
    ? commandes 
    : commandes.filter(c => c.utilisateur?.idUtilisateur === currentUser?.idUtilisateur);
  console.log('cm', userCommandes);

  

  const filteredCommandes = userCommandes.filter(commande => {
    const matchesSearch = commande.idCommande.toString().includes(searchTerm) ||
                          commande.fournisseur.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'tous' || commande.etat === filterStatus;
  
    return matchesSearch && matchesFilter;
  });


  const canEditCommande = (commande: any) => {
    return isAdmin || (commande.etat === 'En cours' && commande.idUtilisateur === currentUser?.idUtilisateur);
  };

  const handleConfirmerCommande = (commande: any) => {
    if (isAdmin) {
      updateCommande(commande.idCommande, { etat: 'validée' });
    }
  };

  const statusColors = {
    'En cours': 'bg-orange-100 text-orange-800 border-orange-200',
    'validée': 'bg-blue-100 text-blue-800 border-blue-200',
    'livrée': 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Commandes</h1>
          <p className="text-slate-600 mt-2">Gérez toutes vos commandes</p>
        </div>
        <Link to="/commandes/nouvelle">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle commande
          </Button>
        </Link>
      </div>

      {/* Filtres et recherche */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Rechercher par numéro ou fournisseur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="tous">Tous les états</option>
              <option value="En cours">En cours</option>
              <option value="validée">Validée</option>
              <option value="livrée">Livrée</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Liste des commandes */}
      <div className="grid gap-4">
        {filteredCommandes.map((commande) => {
          const fournisseur = commande.fournisseur;
          
          return (
            <Card key={commande.idCommande} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Commande #{commande.idCommande}
                    </h3>
                    <Badge className={statusColors[commande.etat]}>
                      {commande.etat}
                    </Badge>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Fournisseur:</span>
                      <p className="font-medium text-slate-900">{commande.fournisseur?.nom}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Date commande:</span>
                      <p className="font-medium text-slate-900">
                        {new Date(commande.dateCommande).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Livraison prévue:</span>
                      <p className="font-medium text-slate-900">
                        {new Date(commande.dateLivraisonPrevue).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Montant total:</span>
                      <p className="font-medium text-slate-900">
                        {commande.montantTotal != null
						? `${commande.montantTotal.toLocaleString('fr-FR')} €`
						: 'Non défini'}
                      </p>
					  
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {canEditCommande(commande) && (
                    <Link to={`/commandes/modifier/${commande.idCommande}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Modifier
                      </Button>
                    </Link>
                  )}
                  {isAdmin && commande.etat === 'En cours' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleConfirmerCommande(commande)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Confirmer
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredCommandes.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-slate-400">
            <ShoppingCart className="w-12 h-12 mx-auto mb-4" />
            <p>Aucune commande trouvée</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Commandes;
