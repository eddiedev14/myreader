import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../../firebase/config";
import type { Book, BookFormData } from "../types/book.types";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useBookState = () => {
  //* States
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  //* Auth
  const { user, getUserId } = useAuth();

  //* Collection ref
  const booksRef = collection(db, "books");

  //* Effects
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        const snapshot = await getDocs(booksRef);

        const data: Book[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as Book[];

        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  //* Functions

  // Llamar a los libros
  const getBooks = async (): Promise<string | null> => {
    setLoading(true);

    try {
      const snapshot = await getDocs(booksRef);

      const data: Book[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as Book[];

      setBooks(data);

      return null;
    } catch (error) {
      console.error("Error fetching books:", error);
      return "Error al obtener los libros";
    } finally {
      setLoading(false);
    }
  };

  // Crear libro
  const createBook = async (data: BookFormData): Promise<string | null> => {
    try {
      const userId = getUserId();

      if (!user || !userId) {
        return "Usuario no autenticado";
      }

      const payload = {
        ...data,
        creatorId: userId,
        createdAt: Date.now(),
      };

      const docRef = await addDoc(booksRef, payload);

      const newBook: Book = {
        id: docRef.id,
        ...payload,
      };

      setBooks((prev) => [newBook, ...prev]);

      return null;
    } catch (error) {
      console.error("Error creating book:", error);
      return "Error al crear el libro";
    }
  };

  // Actualizar libroo
  const updateBook = async (
    id: string,
    data: Partial<BookFormData>,
  ): Promise<string | null> => {
    try {
      const docRef = doc(db, "books", id);

      await updateDoc(docRef, data);

      setBooks((prev) =>
        prev.map((book) => (book.id === id ? { ...book, ...data } : book)),
      );

      return null;
    } catch (error) {
      console.error("Error updating book:", error);
      return "Error al actualizar el libro";
    }
  };

  // Remover libro
  const deleteBook = async (id: string): Promise<string | null> => {
    try {
      const docRef = doc(db, "books", id);

      await deleteDoc(docRef);

      setBooks((prev) => prev.filter((book) => book.id !== id));

      return null;
    } catch (error) {
      console.error("Error deleting book:", error);
      return "Error al eliminar el libro";
    }
  };

  return {
    books,
    loading,
    getBooks,
    createBook,
    updateBook,
    deleteBook,
  };
};
