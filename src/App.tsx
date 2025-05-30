
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PhpBackend from "./pages/PhpBackend";
import NotFound from "./pages/NotFound";
import TradingGuide from "./pages/TradingGuide";
import MarketAnalysis from "./pages/MarketAnalysis";
import ToolDetail from "./pages/ToolDetail";
import Cashback from "./pages/Cashback";
import CashbackRegister from "./pages/CashbackRegister";
import AI from "./pages/AI";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatBot from "./components/chat/ChatBot";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <HelmetProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/tools/:toolId" element={<ToolDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/cashback" element={<Cashback />} />
                  <Route path="/cashback/register" element={<CashbackRegister />} />
                  <Route path="/resources/trading-guide" element={<TradingGuide />} />
                  <Route path="/resources/market-analysis" element={<MarketAnalysis />} />
                  <Route path="/ai" element={<AI />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/backend" element={
                    <ProtectedRoute>
                      <PhpBackend />
                    </ProtectedRoute>
                  } />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <ChatBot />
              </TooltipProvider>
            </HelmetProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
