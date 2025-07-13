import "./global.css";

import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import AskQuestion from "./pages/AskQuestion";
import NotFound from "./pages/NotFound";
import { UserProvider } from "../context/userProvider";
import AuthModal from "./models/AuthModel";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import Profile from "./pages/auth/profile";
import QuestionsDetail from "./pages/QuestionDetail";

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

// Toast styling
const toastOptions = {
  duration: 3000,
  success: {
    style: {
      background: "linear-gradient(135deg, #4caf50, #81c784)",
    },
  },
  error: {
    style: {
      background: "linear-gradient(135deg, #e53935, #ef5350)",
    },
  },
  warning: {
    style: {
      background: "linear-gradient(135deg, #ffb300, #ffc107)",
      color: "#333",
    },
  },
  info: {
    style: {
      background: "linear-gradient(135deg, #2196f3, #64b5f6)",
    },
  },
};

// ProtectedRoute wrapper
const ProtectedRoute = ({ children, isLoggedIn }) => {
  const location = useLocation();
  toast.dismiss();
  if (!isLoggedIn) {
    toast.error("You must be logged in to access this page.");
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

const queryClient = new QueryClient();

const App = () => {
  const { showModal, setShowModal } = useAuthCheck();
  const isLoggedIn = !!localStorage.getItem("Auth-Token");

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster position="top-center" toastOptions={toastOptions} />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navigation open={setShowModal} />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/questions/:id" element={<QuestionsDetail />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ask"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <AskQuestion />
                    </ProtectedRoute>
                  }
                />
                <Route path="/search" element={<Search />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <AuthModal open={showModal} onClose={() => setShowModal(false)} />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
