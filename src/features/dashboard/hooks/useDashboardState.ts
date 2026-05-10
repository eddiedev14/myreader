import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCollection } from "@/firebase/hooks/useCollection";
import type { BookDashboard } from "@/features/books/interfaces/book.interface";
import { useEffect } from "react";

export const useDashboardState = () => {
  //* Auth
  const { user, getUserId } = useAuth();
  const userId = getUserId();

  //* Collection Hook
  const {
    results: books,
    isPending: loading,
    error,
    getById,
    getAll,
    setById,
  } = useCollection<BookDashboard>(`users/${userId}/books`);

  //* Effects
  useEffect(() => {
    getAll();
  }, []);

  //* Functions
  // ? Agregar libro al dashboard del usuario
  const addToDashboard = async (bookId: string): Promise<string | null> => {
    try {
      if (!user || !userId) {
        return "Usuario no autenticado";
      }

      // Revisar si el libro ya está en el dashboard
      const alreadyInDashboard = await isInDashboard(bookId);
      if (alreadyInDashboard) {
        return "Este libro ya está en tu dashboard";
      }

      const payload: BookDashboard = {
        status: "AGENDADO",
        startedAt: null,
        finishedAt: null,
      };

      const bookAdded = await setById(bookId, payload);

      if (!bookAdded) {
        return "Error al añadir el libro a tu dashboard";
      }

      return null;
    } catch (error) {
      console.error("Error adding the book:", error);
      return "Error al añadir el libro a tu dashboard";
    }
  };

  //? Revisar si un libro ya está en el dashboard del usuario
  const isInDashboard = async (bookId: string): Promise<boolean> => {
    const existingBook = await getById(bookId);
    return !!existingBook;
  };

  return {
    books,
    addedBooks: books.filter((book) => book.status === "AGENDADO"),
    booksInQueue: 0, //TODO: Falta implementar en la siguiente HU
    completedBooks: books.filter((book) => book.status === "COMPLETADO"),
    loading,
    error,

    addToDashboard,
    isInDashboard,
  };
};
