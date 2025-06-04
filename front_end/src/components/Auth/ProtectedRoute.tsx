
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Login from '@/pages/Login';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">Accès refusé</h2>
        <p className="text-slate-600 mt-2">Vous n'avez pas les permissions nécessaires.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
