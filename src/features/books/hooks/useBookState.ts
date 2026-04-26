import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { db } from "../../../firebase/config";
import type { BookFormData } from "../types/book.types";
import type { Book } from "../interfaces/book.interface";
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
      getBooks();
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

  return {
    books,
    loading,
    getBooks,
    createBook,
  };
};
