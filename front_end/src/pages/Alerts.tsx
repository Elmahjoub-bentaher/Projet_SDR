
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info,
  Trash2,
  Check
} from 'lucide-react';

interface AlertItem {
  id: number;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const Alerts = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: 1,
      type: 'warning',
      title: 'Stock faible',
      message: 'Le produit "Ordinateur portable Dell" a un stock inférieur à 5 unités.',
      timestamp: '2024-06-04 14:30',
      isRead: false
    },
    {
      id: 2,
      type: 'error',
      title: 'Commande en retard',
      message: 'La commande #CMD-001 devait être livrée hier.',
      timestamp: '2024-06-04 10:15',
      isRead: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Livraison confirmée',
      message: 'La commande #CMD-002 a été livrée avec succès.',
      timestamp: '2024-06-04 09:45',
      isRead: true
    },
    {
      id: 4,
      type: 'info',
      title: 'Nouveau fournisseur',
      message: 'Un nouveau fournisseur "TechSupply" a été ajouté au système.',
      timestamp: '2024-06-03 16:20',
      isRead: true
    }
  ]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'error': return <XCircle className="w-4 h-4" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'error': return 'bg-red-100 border-red-300 text-red-800';
      case 'success': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-blue-100 border-blue-300 text-blue-800';
    }
  };

  const markAsRead = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, isRead: true })));
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-6 h-6 text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-900">Alertes</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} non lues</Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <Check className="w-4 h-4 mr-2" />
            Marquer tout comme lu
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {alerts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">
                Aucune alerte
              </h3>
              <p className="text-slate-500">
                Vous n'avez actuellement aucune alerte.
              </p>
            </CardContent>
          </Card>
        ) : (
          alerts.map((alert) => (
            <Card key={alert.id} className={`${!alert.isRead ? 'border-l-4 border-l-blue-500' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded ${getAlertColor(alert.type)}`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <CardDescription>{alert.timestamp}</CardDescription>
                    </div>
                    {!alert.isRead && (
                      <Badge variant="secondary" className="ml-2">Nouveau</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {!alert.isRead && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => markAsRead(alert.id)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteAlert(alert.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{alert.message}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Alerts;
