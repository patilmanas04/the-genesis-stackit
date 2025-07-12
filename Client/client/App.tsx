import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import AskQuestion from "./pages/AskQuestion";
import NotFound from "./pages/NotFound";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { UserProvider } from "../context/userProvider";

const queryClient = new QueryClient();

// Placeholder pages for future implementation
const QuestionsDetail = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Question Detail Page</h1>
      <p className="text-muted-foreground">
        This page will be implemented next.
      </p>
    </div>
  </div>
);

const Profile = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <p className="text-muted-foreground">
        This page will be implemented next.
      </p>
    </div>
  </div>
);

const Settings = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-muted-foreground">
        This page will be implemented next.
      </p>
    </div>
  </div>
);

const Search = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Search Results</h1>
      <p className="text-muted-foreground">
        This page will be implemented next.
      </p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navigation
          />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ask" element={<AskQuestion />} />
            <Route path="/questions/:id" element={<QuestionsDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<Search />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
