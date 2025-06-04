import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Eye, Edit, Filter, Users } from 'lucide-react';

const Fournisseurs = () => {
  const { fournisseurs, addFournisseur, updateFournisseur } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingFournisseur, setEditingFournisseur] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    adresse: '',
    email: '',
    telephone: '',
    siret: '',
    conditionsPaiement: ''
  });

  const filteredFournisseurs = fournisseurs.filter(fournisseur =>
    fournisseur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fournisseur.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenForm = () => {
    setShowForm(true);
    setEditingFournisseur(null);
    setFormData({
      nom: '',
      adresse: '',
      email: '',
      telephone: '',
      siret: '',
      conditionsPaiement: ''
    });
  };

  const handleEditFournisseur = (fournisseur) => {
    setShowForm(true);
    setEditingFournisseur(fournisseur);
    setFormData({
      nom: fournisseur.nom,
      adresse: fournisseur.adresse,
      email: fournisseur.email,
      telephone: fournisseur.telephone,
      siret: fournisseur.siret,
      conditionsPaiement: fournisseur.conditionsPaiement
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFournisseur) {
      updateFournisseur(editingFournisseur.idFournisseur, formData);
    } else {
      addFournisseur(formData);
    }
    setShowForm(false);
    setEditingFournisseur(null);
    setFormData({
      nom: '',
      adresse: '',
      email: '',
      telephone: '',
      siret: '',
      conditionsPaiement: ''
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Fournisseurs</h1>
          <p className="text-slate-600 mt-2">Gérez vos fournisseurs</p>
        </div>
        <Button onClick={handleOpenForm} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau fournisseur
        </Button>
      </div>

      {/* Filtres et recherche */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Formulaire d'ajout/modification */}
      {showForm && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingFournisseur ? 'Modifier Fournisseur' : 'Ajouter Fournisseur'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-slate-700">Nom</label>
              <Input
                type="text"
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="adresse" className="block text-sm font-medium text-slate-700">Adresse</label>
              <Input
                type="text"
                id="adresse"
                value={formData.adresse}
                onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-slate-700">Téléphone</label>
              <Input
                type="tel"
                id="telephone"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="siret" className="block text-sm font-medium text-slate-700">SIRET</label>
              <Input
                type="text"
                id="siret"
                value={formData.siret}
                onChange={(e) => setFormData({ ...formData, siret: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="conditionsPaiement" className="block text-sm font-medium text-slate-700">Conditions de paiement</label>
              <Input
                type="text"
                id="conditionsPaiement"
                value={formData.conditionsPaiement}
                onChange={(e) => setFormData({ ...formData, conditionsPaiement: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Annuler
              </Button>
              <Button type="submit">
                {editingFournisseur ? 'Modifier' : 'Ajouter'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Liste des fournisseurs */}
      <div className="grid gap-4">
        {filteredFournisseurs.map((fournisseur) => (
          <Card key={fournisseur.idFournisseur} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{fournisseur.nom}</h3>
                <p className="text-slate-500">{fournisseur.email}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEditFournisseur(fournisseur)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Modifier
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredFournisseurs.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p className="text-slate-600">Aucun fournisseur trouvé</p>
        </Card>
      )}
    </div>
  );
};

export default Fournisseurs;
