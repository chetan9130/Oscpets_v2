import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChatbotPage from "./pages/ChatbotPage";
import GroomingVet from "./pages/GroomingVet";
import PetStore from "./pages/PetStore";
import AdoptionMarketplace from "./pages/AdoptionMarketplace";
import BreedingMatch from './pages/BreedingMatch';
import Vets from "./pages/Vets";
import Login from './pages/Login';
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddAgent from "./pages/AddAgent";
import AddSeller from "./pages/AddSeller";
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import ProductDetails from './pages/ProductDetails';
import UserProfile from './pages/UserProfile';
import CreatePetProfile from './pages/CreatePetProfile';

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-white dark:bg-gray-900 text-black dark:text-white">
          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed bottom-4 left-4 z-50 p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
          >
             {darkMode ? 'Light' : 'Dark'} Mode
          </button> */}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chat" element={<ChatbotPage />} />
              <Route path="*" element={<NotFound />} />
              {/* <Route path="/ai-assistant" element={<AIAssistant />} /> */}
              <Route path="/grooming-vet" element={<GroomingVet />} />
              <Route path="/store" element={<PetStore />} />
              <Route path="/adoption-marketplace" element={<AdoptionMarketplace />} />
              <Route path="/breeding-match" element={<BreedingMatch />} />
              <Route path="/vets" element={<Vets />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="adminlogin" element={<AdminLogin />} />
              <Route path="admindashboard" element={<AdminDashboard />} />
              <Route path="addagent" element={<AddAgent />} />
              <Route path="addseller" element={<AddSeller />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/myorders" element={<MyOrders />} />
              <Route path="/createpetprofile" element={<CreatePetProfile/>} />
              <Route path="/product/:id" element={<ProductDetails />} />

              <Route path="/userprofile" element={<UserProfile />} />

            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
