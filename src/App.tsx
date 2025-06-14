import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Patients from "./pages/admin/Patients";
import Services from "./pages/admin/Services";
import Users from "./pages/admin/Users";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/pacientes"
            element={
              <AdminLayout>
                <Patients />
              </AdminLayout>
            }
          />
          <Route
            path="/doctores"
            element={
              <AdminLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Gestión de Doctores
                  </h2>
                  <p className="text-gray-600">
                    Esta página estará disponible próximamente.
                  </p>
                </div>
              </AdminLayout>
            }
          />
          <Route
            path="/citas"
            element={
              <AdminLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Gestión de Citas
                  </h2>
                  <p className="text-gray-600">
                    Esta página estará disponible próximamente.
                  </p>
                </div>
              </AdminLayout>
            }
          />
          <Route
            path="/servicios"
            element={
              <AdminLayout>
                <Services />
              </AdminLayout>
            }
          />
          <Route
            path="/usuarios"
            element={
              <AdminLayout>
                <Users />
              </AdminLayout>
            }
          />
          <Route
            path="/configuracion"
            element={
              <AdminLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Configuración del Sistema
                  </h2>
                  <p className="text-gray-600">
                    Esta página estará disponible próximamente.
                  </p>
                </div>
              </AdminLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
