import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ReactNode } from "react";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import Search from "./pages/Search";
import CreatePost from "./pages/CreatePost";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Reels from "./pages/Reels";
import Story from "./pages/Story";
import NotFound from "./pages/NotFound";
import SplashScreen from "./pages/SplashScreen";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import Layout from "./components/Layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// AppLayout component
const AppLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider delayDuration={300}>
      <Toaster />
      <Sonner position="top-center" richColors />
      <BrowserRouter>
        <Routes>
          {/* Initial Screens (Unauthenticated) */}
          <Route index element={<SplashScreen />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* App Routes (Authenticated) */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/stories/:id" element={<Story />} />
          </Route>

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;