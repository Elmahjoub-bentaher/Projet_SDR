import React, { createContext, useContext, useState, useEffect } from 'react';
import { Utilisateur } from '@/types';
import { toast } from '@/hooks/use-toast';

// Define Role enum to match backend
enum Role {
  ADMIN = 'ADMIN',
  USER_STANDARD = 'USER_STANDARD'
}

interface AuthContextType {
  currentUser: Utilisateur | null;
  login: (email: string, password: string) => Promise<boolean>;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`http://${window.location.hostname}:8080/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, motDePasse: password }),
      });

      if (response.ok) {
        // const data = await response.json();
        

        // // Temporary user object - should be replaced with actual user data from backend
        // const user: Utilisateur = {
        //   idUtilisateur: 0, // Should come from backend
        //   nom: email.split('@')[0], // Temporary
        //   email,
        //   motDePasse: '', // Don't store password
        //   role: email.includes('admin') ? Role.ADMIN : Role.USER_STANDARD, // Temporary
        //   commandes: []
        // };

        // Temporary user object - should be replaced with actual user data from backend
        //const user: Utilisateur = {
          //idUtilisateur: 1, // Should come from backend
          //nom: email.split('@')[0], // Temporary
          //email,
          //motDePasse: '', // Don't store password
          //role: email.includes('admin') ? Role.ADMIN : Role.USER_STANDARD, // Temporary
          //commandes: []
        //};

        
        // setCurrentUser(user);
        // localStorage.setItem('currentUser', JSON.stringify(user));
         const data = await response.json();

        const userResponse = await fetch(`http://${window.location.hostname}:8080/api/utilisateurs/by-email/${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        
         if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
        }

        // 4. Get the real user data from backend
        const user: Utilisateur = await userResponse.json();

        // 5. Store user and token
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
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
      isAdmin: currentUser?.role === Role.ADMIN
    }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
