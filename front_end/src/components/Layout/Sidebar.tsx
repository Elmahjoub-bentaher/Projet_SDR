import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Home, 
  ShoppingCart, 
  Users, 
  Truck, 
  FileText, 
  Package,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const menuItems = [
  { icon: Home, label: 'Tableau de bord', path: '/' },
  { icon: ShoppingCart, label: 'Commandes', path: '/commandes' },
  { icon: Package, label: 'Lignes Commande', path: '/lignes-commande' },
  { icon: Users, label: 'Fournisseurs', path: '/fournisseurs' },
  { icon: Truck, label: 'Livraisons', path: '/livraisons' },
  { icon: FileText, label: 'Factures', path: '/factures' },
  { icon: Settings, label: 'Paramètres', path: '/parametres' },
];

const SidebarContent = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">PSMS</h1>
            <p className="text-slate-400 text-xs">Purchasing and Supplier Management System</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 mb-2 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-200 rounded-xl",
                isActive && "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
              )}
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white hover:bg-slate-800">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-slate-900 text-white">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen hidden md:block">
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
