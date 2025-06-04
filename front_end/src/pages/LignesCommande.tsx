
import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const LignesCommande = () => {
  const { lignesCommande, commandes, fournisseurs } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLignes = lignesCommande.filter(ligne => {
    const commande = commandes.find(c => c.idCommande === ligne.idCommande);
    const fournisseur = commande ? fournisseurs.find(f => f.idFournisseur === commande.idFournisseur) : null;
    
    const matchesSearch = 
      ligne.descriptionArticle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ligne.idCommande.toString().includes(searchTerm) ||
      (fournisseur?.nom.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Lignes de Commande</h1>
          <p className="text-slate-600 mt-1 md:mt-2 text-sm md:text-base">Gérez tous les articles commandés</p>
        </div>
      </div>

      {/* Filtres et recherche */}
      <Card className="p-3 md:p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Rechercher par article, commande ou fournisseur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>
        </div>
      </Card>

      {/* Table des lignes de commande - Mobile responsive */}
      <Card>
        <div className="p-3 md:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs md:text-sm">ID</TableHead>
                  <TableHead className="text-xs md:text-sm">Article</TableHead>
                  <TableHead className="text-xs md:text-sm hidden sm:table-cell">Qté</TableHead>
                  <TableHead className="text-xs md:text-sm hidden md:table-cell">Prix Unit.</TableHead>
                  <TableHead className="text-xs md:text-sm">Total</TableHead>
                  <TableHead className="text-xs md:text-sm hidden lg:table-cell">Commande</TableHead>
                  <TableHead className="text-xs md:text-sm hidden lg:table-cell">Fournisseur</TableHead>
                  <TableHead className="text-xs md:text-sm">État</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLignes.map((ligne) => {
                  const commande = commandes.find(c => c.idCommande === ligne.idCommande);
                  const fournisseur = commande ? fournisseurs.find(f => f.idFournisseur === commande.idFournisseur) : null;
                  const total = ligne.quantite * ligne.prixUnitaire;

                  const statusColors = {
                    'en attente': 'bg-orange-100 text-orange-800 border-orange-200',
                    'validée': 'bg-blue-100 text-blue-800 border-blue-200',
                    'livrée': 'bg-green-100 text-green-800 border-green-200'
                  };

                  return (
                    <TableRow key={ligne.idLigne}>
                      <TableCell className="font-medium text-xs md:text-sm">#{ligne.idLigne}</TableCell>
                      <TableCell className="text-xs md:text-sm max-w-[150px] truncate">
                        <div>
                          <div className="font-medium">{ligne.descriptionArticle}</div>
                          <div className="sm:hidden text-xs text-slate-500">
                            Qté: {ligne.quantite} | {ligne.prixUnitaire.toLocaleString('fr-FR')} €
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs md:text-sm hidden sm:table-cell">{ligne.quantite}</TableCell>
                      <TableCell className="text-xs md:text-sm hidden md:table-cell">{ligne.prixUnitaire.toLocaleString('fr-FR')} €</TableCell>
                      <TableCell className="font-medium text-xs md:text-sm">{total.toLocaleString('fr-FR')} €</TableCell>
                      <TableCell className="text-xs md:text-sm hidden lg:table-cell">#{ligne.idCommande}</TableCell>
                      <TableCell className="text-xs md:text-sm hidden lg:table-cell">{fournisseur?.nom || 'N/A'}</TableCell>
                      <TableCell>
                        {commande && (
                          <Badge className={`${statusColors[commande.etat]} text-xs`}>
                            {commande.etat}
                          </Badge>
                        )}
                        <div className="lg:hidden text-xs text-slate-500 mt-1">
                          #{ligne.idCommande} | {fournisseur?.nom || 'N/A'}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>

      {filteredLignes.length === 0 && (
        <Card className="p-8 md:p-12 text-center">
          <div className="text-slate-400">
            <Package className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-4" />
            <p className="text-sm md:text-base">Aucune ligne de commande trouvée</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LignesCommande;
