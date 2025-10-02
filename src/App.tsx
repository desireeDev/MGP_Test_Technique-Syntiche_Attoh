import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

// Client pour gérer les requêtes API
const queryClient = new QueryClient();

/**
 * COMPOSANT PRINCIPAL DE L'APPLICATION
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      {/* STRUCTURE PRINCIPALE DE LA PAGE */}
      <div className="min-h-screen bg-background flex flex-col">
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
        
      </div>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;