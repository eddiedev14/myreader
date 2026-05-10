import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCollection } from "@/firebase/hooks/useCollection";
import type { BookDashboard } from "@/features/books/interfaces/book.interface";

export const useDashboardState = () => {
  //* Auth
  const { user, getUserId } = useAuth();
  const userId = getUserId();

  //* Collection Hook
  const {
    results: books,
    isPending: loading,
    error,
    setById,
  } = useCollection<BookDashboard>(`users/${userId}/books`);

  //* Functions
  // ? Agregar libro al dashboard del usuario
  const addToDashboard = async (bookId: string): Promise<string | null> => {
    try {
      if (!user || !userId) {
        return "Usuario no autenticado";
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

  return {
    books,
    loading,
    error,

    addToDashboard,
  };
};
