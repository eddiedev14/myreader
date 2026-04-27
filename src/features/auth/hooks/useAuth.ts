//? Este hook debe ser creado porque el contexto puede ser null según el tipado.
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  // Se retorna el contexto con el tipado correcto (ya no habría null)
  return context;
};
