import { useEffect } from "react";
import { useCollection } from "@/firebase/hooks/useCollection";
import type { BookFormData } from "../types/book.types";
import type { Book } from "../interfaces/book.interface";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PAGE_SIZE } from "../constants/book.constants";

export const useBookState = () => {
  //* Auth
  const { user, getUserId } = useAuth();

  //* Collection Hook
  const {
    results: books,
    isPending: loading,
    error,
    getAll,
    add,
  } = useCollection<Book>("books");

  //* Effects
  useEffect(() => {
    getAll();
  }, []);

  //* Functions
  // ? Crear libro
  const createBook = async (data: BookFormData): Promise<string | null> => {
    try {
      const userId = getUserId();

      if (!user || !userId) {
        return "Usuario no autenticado";
      }

      const payload = {
        ...data,
        creatorId: userId,
      };

      const id = await add(payload as Book);

      if (!id) {
        return "Error al crear el libro";
      }

      // Refetch para actualizar la lista
      await getAll();

      return null;
    } catch (error) {
      console.error("Error creating book:", error);
      return "Error al crear el libro";
    }
  };

  //? Pagination
  function getPaginatedBooks(page: number, books: Book[]) {
    const start = (page - 1) * PAGE_SIZE;
    return books.slice(start, start + PAGE_SIZE);
  }

  function getTotalPages(books: Book[]) {
    return Math.ceil(books.length / PAGE_SIZE);
  }

  return {
    books,
    loading,
    error,
    totalPages: getTotalPages(books),
    createBook,
    getPaginatedBooks: (page: number) => getPaginatedBooks(page, books),
  };
};
