import { useAuth } from "@/features/auth/hooks/useAuth";
import { AppLayout } from "@/shared/components/layout/AppLayout";

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <AppLayout
      title={`Bienvenido, ${user?.username || "Usuario"}!`}
      description="Explora tus libros seleccionados, colecciones personalizadas y continúa con tus lecturas en progreso"
    >
      <h3>Prueba</h3>
    </AppLayout>
  );
};
