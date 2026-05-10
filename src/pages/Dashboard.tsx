import { useAuth } from "@/features/auth/hooks/useAuth";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { Header } from "@/shared/components/ui/sections/Header";
import { DashboardStat } from "@/features/dashboard/components/DashboardStat";
import { BookList } from "@/features/books/components/BookList";

export const Dashboard = () => {
  //* Contexts
  const { user } = useAuth();
  const { books, addedBooks, booksInQueue, completedBooks } = useDashboard();

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
          value={addedBooks.length}
          icon="ri-file-marked-fill"
          color="green"
        />
        <DashboardStat
          title="En Cola de Lectura"
          value={booksInQueue}
          icon="ri-time-fill"
          color="orange"
        />
        <DashboardStat
          title="Libros Completados"
          value={completedBooks.length}
          icon="ri-checkbox-circle-fill"
          color="blue"
        />
      </section>

      <section className="grid grid-cols-[1fr_auto] gap-4">
        {/* Lista de libros */}
        <BookList books={books} />

        {/* Cola de lectura */}
      </section>
    </>
  );
};
