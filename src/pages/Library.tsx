import { useAuth } from "@/features/auth/hooks/useAuth";
import { BookList } from "@/features/books/components/BookList";
import { CreateBookDialog } from "@/features/books/components/CreateBookDialog";
import { Header } from "@/shared/components/ui/sections/Header";

export const Library = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <Header
          title={`Bienvenido, ${user?.username || "Usuario"}!`}
          paragraph="Explora nuestra colección de libros, ¡Descubre tu proximo favorito!"
        />

        <div className="mt-2">
          <CreateBookDialog />
        </div>
      </div>
      <BookList />
    </div>
  );
};
