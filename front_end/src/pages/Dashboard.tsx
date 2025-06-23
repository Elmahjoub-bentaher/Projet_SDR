
import React from 'react';
import { useData } from '@/context/DataContext';
import StatsCard from '@/components/Dashboard/StatsCard';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Users, Truck, FileText, TrendingUp, Clock } from 'lucide-react';

const Dashboard = () => {
  const { commandes, fournisseurs, livraisons, factures } = useData();

  const commandesEnAttente = commandes.filter(c => c.etat === 'En cours').length;
  const commandesValidees = commandes.filter(c => c.etat === 'validée').length;
  const commandesLivrees = commandes.filter(c => c.etat === 'livrée').length;
  const montantTotal = commandes.reduce((total, c) => total + c.montantTotal, 0);

  const recentCommandes = commandes.slice(-5);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Tableau de bord</h1>
        <p className="text-slate-600 mt-2">Vue d'ensemble de votre système de gestion</p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Commandes"
          value={commandes.length}
          icon={ShoppingCart}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Fournisseurs"
          value={fournisseurs.length}
          icon={Users}
          trend={{ value: 5, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="En attente"
          value={commandesEnAttente}
          icon={Clock}
          color="orange"
        />
        <StatsCard
          title="Chiffre d'affaires"
          value={`${montantTotal.toLocaleString('fr-FR')} €`}
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
      </div>

      {/* Graphiques et tableaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* État des commandes */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">État des commandes</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">En attente</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{ width: `${(commandesEnAttente / commandes.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{commandesEnAttente}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Validées</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(commandesValidees / commandes.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{commandesValidees}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Livrées</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(commandesLivrees / commandes.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{commandesLivrees}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Commandes récentes */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Commandes récentes</h3>
          <div className="space-y-3">
            {recentCommandes.map((commande) => {
              const fournisseur = fournisseurs.find(f => f.idFournisseur === commande.idFournisseur);
              const statusColors = {
                'En cours': 'bg-orange-100 text-orange-800',
                'validée': 'bg-blue-100 text-blue-800',
                'livrée': 'bg-green-100 text-green-800'
              };
              
              return (
                <div key={commande.idCommande} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">#{commande.idCommande}</p>
                    <p className="text-sm text-slate-600">{fournisseur?.nom}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[commande.etat]}`}>
                      {commande.etat}
                    </span>
                    <p className="text-sm text-slate-600 mt-1">
					  {commande.montantTotal != null
						? `${commande.montantTotal.toLocaleString('fr-FR')} €`
						: 'Non défini'}
					</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
