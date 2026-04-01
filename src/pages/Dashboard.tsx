import { useAuth } from "@/features/auth/hooks/useAuth";
import { Header } from "@/shared/components/layout/Header";

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <Header title={`Bienvenido, ${user?.username || "Usuario"}!`} paragraph="Explora tus libros seleccionados, colecciones personalizadas y continúa con tus lecturas en progreso" />
    </>
  );
};
