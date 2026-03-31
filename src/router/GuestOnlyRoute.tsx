//? Para este caso se crea un controlador en la ruta porque se quiere implementar la lógica de que
//? si un usuario ya está logueado pasé directamente a una página en concreta (ej. dashboard y no renderice el login)
//? De este modo se filtran rutas solo para usuarios que no tienen una sesión activa

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const GuestOnlyRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" /> : <Outlet />;
};
