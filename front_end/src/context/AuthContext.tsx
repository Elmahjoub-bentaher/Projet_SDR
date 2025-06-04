
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Utilisateur } from '@/types';

interface AuthContextType {
  currentUser: Utilisateur | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Utilisateur | null>(null);
  const [fetchedUsers, setFetchedUsers] = useState<Utilisateur[]>([]);


  // Données d'exemple pour les utilisateurs
  const users: Utilisateur[] = [
    {
      idUtilisateur: 1,
      nom: "Admin User",
      email: "admin@system.fr",
      motDePasse: "admin123",
      role: "admin"
    },
    {
      idUtilisateur: 2,
      nom: "User Normal",
      email: "user@system.fr",
      motDePasse: "user123",
      role: "utilisateur"
    }
  ];

  useEffect(() => {
    // Vérifier s'il y a un utilisateur connecté dans le localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  

    // Chargement des utilisateurs depuis l'API
    fetch('/api/utilisateur')
      .then(res => {
        if (!res.ok) {
          throw new Error('Erreur lors du chargement des utilisateurs');
        }
        return res.json();
      })
      .then((data: Utilisateur[]) => {
        setFetchedUsers(data);
      })
      .catch(err => {
        console.error('Échec du chargement des utilisateurs:', err);
        setFetchedUsers(users); // fallback si l'API échoue
      });
  }, []);

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.motDePasse === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      logout,
      isAuthenticated: !!currentUser,
      isAdmin: currentUser?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};
