
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Package, Users, Truck, FileText, BarChart3, Shield } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Package,
      title: "Gestion des Commandes",
      description: "Créez et suivez vos commandes en temps réel"
    },
    {
      icon: Users,
      title: "Fournisseurs",
      description: "Gérez votre réseau de fournisseurs efficacement"
    },
    {
      icon: Truck,
      title: "Livraisons",
      description: "Suivez les livraisons et optimisez la logistique"
    },
    {
      icon: FileText,
      title: "Facturation",
      description: "Automatisez votre processus de facturation"
    },
    {
      icon: BarChart3,
      title: "Analyses",
      description: "Obtenez des insights sur vos performances"
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "Vos données protégées par des standards élevés"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="glass-effect border-b border-blue-100/50 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                PSMS
              </h1>
              <p className="text-slate-600 text-sm">Purchasing and Supplier Management System</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Se connecter
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Modernisez votre gestion
            <span className="block bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              d'approvisionnement
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Une plateforme complète pour optimiser vos achats, gérer vos fournisseurs 
            et améliorer votre chaîne d'approvisionnement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/login')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              Commencer maintenant
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl transition-all duration-300 text-lg"
            >
              Découvrir les fonctionnalités
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Fonctionnalités principales
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Découvrez comment PSMS peut transformer votre gestion d'approvisionnement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-slate-600 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white overflow-hidden">
            <CardContent className="py-16 px-8">
              <h4 className="text-3xl font-bold mb-4">
                Prêt à optimiser votre gestion ?
              </h4>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Rejoignez les entreprises qui font confiance à PSMS pour leur approvisionnement
              </p>
              <Button 
                onClick={() => navigate('/login')}
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold"
              >
                Accéder à la plateforme
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">PSMS</h3>
                  <p className="text-slate-400 text-sm">Purchasing and Supplier Management System</p>
                </div>
              </div>
              <p className="text-slate-300 mb-4 max-w-md">
                La solution complète pour moderniser votre gestion d'approvisionnement et optimiser vos relations fournisseurs.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Fonctionnalités</h4>
              <ul className="space-y-2 text-slate-300">
                <li>Gestion des commandes</li>
                <li>Suivi des livraisons</li>
                <li>Facturation automatisée</li>
                <li>Analyses et rapports</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li>Documentation</li>
                <li>Formation</li>
                <li>Support technique</li>
                <li>Communauté</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 PSMS. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
