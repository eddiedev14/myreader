import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCollection } from "@/firebase/hooks/useCollection";
import { useCollection as useElementCollection } from "@/features/collections/hooks/useCollection";
import type { Book } from "@/features/books/interfaces/book.interface";
import type { BookDashboard } from "../interfaces/book.interface";
import { useEffect, useMemo } from "react";

export const useDashboardState = () => {
  //* Auth
  const { user, getUserId } = useAuth();
  const userId = getUserId();

  //* Contexts
  const { collections } = useElementCollection();

  //* Collection Hook
  const {
    results: books,
    isPending: loading,
    error,
    suscribe,
    getById,
    setById,
    update,
    remove,
  } = useCollection<BookDashboard>(`users/${userId}/books`);

  //* Effects
  useEffect(() => {
    if (!userId) return;
    const unsubscribe = suscribe();
    return () => unsubscribe();
  }, [userId]);

  //* Memo (Stats)
  const stats = useMemo(() => {
    return {
      addedBooks: books.length,

      booksInQueue: books.filter(
        (book) => book.status === "EN COLA" || book.status === "EN LECTURA",
      ).length,

      completedBooks: books.filter((book) => book.status === "COMPLETADO")
        .length,
    };
  }, [books]);

  //* Functions
  // ? Agregar libro al dashboard del usuario
  const addToDashboard = async (book: Book): Promise<string | null> => {
    try {
      if (!user || !userId) {
        return "Usuario no autenticado";
      }

      // Revisar si el libro ya está en el dashboard
      const alreadyInDashboard = await isInDashboard(book.id);
      if (alreadyInDashboard) {
        return "Este libro ya está en tu dashboard";
      }

      const payload: BookDashboard = {
        id: book.id,
        title: book.title,
        authors: book.authors,
        bookCover: book.bookCover,
        mainGenre: book.mainGenre,
        status: "AGENDADO",
        previousStatus: null,
        queuePosition: null,
        startDate: null,
        endDate: null,
        note: null,
      };

      const bookAdded = await setById(book.id, payload);

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

  // ? Eliminar libro del dashboard del usuario
  const removeFromDashboard = async (
    book: BookDashboard,
  ): Promise<string | null> => {
    try {
      if (!user || !userId) {
        return "Usuario no autenticado";
      }

      // Tratar de eliminar libro con estado diferente
      if (book.status === "EN COLA" || book.status === "EN LECTURA") {
        return "No puedes eliminar un libro que está en cola o en lectura, primero elimínalo de la cola de lectura";
      }

      // Tratar de eliminar un libro que se encuentra en alguna colección
      const isBookInAnyCollection = collections.some((collection) =>
        collection.books.some((savedBook) => savedBook.id === book.id),
      );

      if (isBookInAnyCollection) {
        return "No puedes eliminar un libro que pertenece a una colección";
      }

      const bookRemoved = await remove(book.id);

      if (!bookRemoved) {
        return "Error al eliminar el libro de tu dashboard";
      }

      return null;
    } catch (error) {
      console.error("Error removing the book:", error);
      return "Error al eliminar el libro de tu dashboard";
    }
  };

  const getBooksInDashboard = async () => {
    try {
      return books;
    } catch (error) {
      console.error("Error getting dashboard books:", error);
      return [];
    }
  };

  return {
    books,
    ...stats,
    loading,
    error,

    addToDashboard,
    isInDashboard,
    updateBook: update,
    removeFromDashboard,
    getBooksInDashboard,
  };
};
