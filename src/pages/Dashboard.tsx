import { useAuth } from "@/features/auth/hooks/useAuth";
import { Header } from "@/shared/components/ui/sections/Header";
import { DashboardStat } from "@/features/dashboard/components/DashboardStat";

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <Header
        title={`Bienvenido, ${user?.username || "Usuario"}!`}
        paragraph="Explora tus libros seleccionados, colecciones personalizadas y continúa con tus lecturas en progreso"
      />

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4">
        <DashboardStat
          title="Libros Añadidos"
          value={124}
          icon="ri-file-marked-fill"
          color="green"
        />
        <DashboardStat
          title="En Cola de Lectura"
          value={8}
          icon="ri-time-fill"
          color="orange"
        />
        <DashboardStat
          title="Libros Completados"
          value={45}
          icon="ri-checkbox-circle-fill"
          color="blue"
        />
      </section>
    </>
  );
};
