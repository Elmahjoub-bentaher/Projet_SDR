import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Dashboard from "./pages/Dashboard";
import Commandes from "./pages/Commandes";
import CommandeForm from "./pages/CommandeForm";
import LignesCommande from "./pages/LignesCommande";
import Fournisseurs from "./pages/Fournisseurs";
import Livraisons from "./pages/Livraisons";
import Factures from "./pages/Factures";
import Alerts from "./pages/Alerts";
import Parametres from "./pages/Parametres";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DataProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={
                <ProtectedRoute>
                  <div className="flex min-h-screen bg-slate-50 w-full">
                    <Sidebar />
                    <div className="flex-1 flex flex-col min-w-0">
                      <Header />
                      <main className="flex-1 overflow-auto p-0">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/commandes" element={<Commandes />} />
                          <Route path="/commandes/nouvelle" element={<CommandeForm />} />
                          <Route path="/commandes/modifier/:id" element={<CommandeForm />} />
                          <Route path="/lignes-commande" element={<LignesCommande />} />
                          <Route path="/fournisseurs" element={
                            <ProtectedRoute requireAdmin={true}>
                              <Fournisseurs />
                            </ProtectedRoute>
                          } />
                          <Route path="/livraisons" element={<Livraisons />} />
                          <Route path="/factures" element={<Factures />} />
                          <Route path="/alertes" element={<Alerts />} />
                          <Route path="/parametres" element={
                            <ProtectedRoute requireAdmin={true}>
                              <Parametres />
                            </ProtectedRoute>
                          } />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                    </div>
                  </div>
                </ProtectedRoute>
              } />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
