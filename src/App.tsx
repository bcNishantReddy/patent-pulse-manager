
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EmployeesPage from "./pages/employees";
import PatentsPage from "./pages/patents";
import ClientsPage from "./pages/clients";
import ClientPatentsPage from "./pages/clients/[id]/patents";
import SettingsPage from "./pages/settings";
import SearchPage from "./pages/search";
import NotFound from "./pages/NotFound";
import DrafterDashboardPage from "./pages/drafters/dashboard";
import DrafterCompletedPage from "./pages/drafters/completed";
import FillerDashboardPage from "./pages/fillers/dashboard";
import FillerCompletedPage from "./pages/fillers/completed";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/patents" element={<PatentsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/:id/patents" element={<ClientPatentsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/drafters/dashboard" element={<DrafterDashboardPage />} />
          <Route path="/drafters/completed" element={<DrafterCompletedPage />} />
          <Route path="/fillers/dashboard" element={<FillerDashboardPage />} />
          <Route path="/fillers/completed" element={<FillerCompletedPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
