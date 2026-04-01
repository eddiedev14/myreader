import { Routes, Route } from "react-router-dom";
import { Home, SignUp, SignIn, Dashboard } from "@/pages";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PageLoader } from "@/shared/components/ui/sections/PageLoader";
import { GuestOnlyRoute } from "./GuestOnlyRoute";
import { PrivateRoute } from "./PrivateRoute";
import { AppLayout } from "@/shared/components/layout/AppLayout";

export const AppRouter = () => {
  // * Esperar a que se compruebe si hay una sesión activa en toda la app.
  const { loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Login solo para usuarios que no tienen una sesión activa */}
      <Route element={<GuestOnlyRoute />}>
        <Route path="/login" element={<SignIn />} />
      </Route>

      {/* Rutas Privadas */}
      <Route element={<PrivateRoute />}>
        { /* Layout común para todas las rutas privadas */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};
