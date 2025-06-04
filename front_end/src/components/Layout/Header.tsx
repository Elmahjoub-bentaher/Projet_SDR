
import React from 'react';
import { Bell, User, Search, LogOut, Menu, Dot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <header className="glass-effect border-b border-blue-100/50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile spacing for hamburger menu */}
        <div className="flex items-center space-x-4 flex-1 ml-12 md:ml-0">
          {!isMobile && (
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input 
                placeholder="Rechercher..." 
                className="pl-10 bg-white/50 border-slate-200 focus:border-blue-500 rounded-xl"
              />
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 hover:bg-blue-50 rounded-xl"
            >
              <Search className="w-4 h-4 text-slate-600" />
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative p-2 hover:bg-blue-50 rounded-xl"
            onClick={() => navigate('/alertes')}
          >
            <Bell className="w-5 h-5 text-slate-600" />
            <Dot className="absolute -top-1 -right-1 w-3 h-3 text-red-500" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            {!isMobile && (
              <span className="text-sm font-medium text-slate-700">
                {currentUser?.nom} ({currentUser?.role})
              </span>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout} 
            className="p-2 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
