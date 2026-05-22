import { useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCollection } from "@/firebase/hooks/useCollection";
import type { Collection } from "../interfaces/collection.interface";
import type { CollectionFormData } from "../types/collection.type";
import { PAGE_SIZE } from "@/features/books/constants/book.constants";

export const useCollectionState = () => {
  //*Auth
  const { user, getUserId } = useAuth();

  //* Collection Hook
  const {
    results: collections,
    isPending: loading,
    error,
    suscribe,
    suscribeById,
    getById,
    add,
    update,
  } = useCollection<Collection>("collections");

  //* Effects
  useEffect(() => {
    const userId = getUserId();

    if (!userId) return;

    const unsubscribe = suscribe([["creatorId", "==", userId]]);

    return () => unsubscribe?.();
  }, [user]);

  //* Functions
  //? Crear colección

  const createCollection = async (
    data: CollectionFormData,
  ): Promise<string | null> => {
    try {
      const userId = getUserId();

      if (!user || !userId) {
        return "Usuario no autenticado";
      }

      const payload = {
        ...data,
        creatorId: userId,
      };

      const id = await add(payload as Collection);

      if (!id) {
        return "Error al crear la colección";
      }

      return null;
    } catch (error) {
      console.error("Error creating collection:", error);
      return "Error al crear la colección";
    }
  };

  //? Buscar colección por id
  const getCollectionById = async (id: string) => {
    return await getById(id);
  };

  //? Pagination
  function getPaginatedCollections(page: number, collections: Collection[]) {
    const start = (page - 1) * PAGE_SIZE;
    return collections.slice(start, start + PAGE_SIZE);
  }

  function getTotalPages(collections: Collection[]) {
    return Math.ceil(collections.length / PAGE_SIZE);
  }

  const addBookToCollection = async (collectionId: string, bookId: string) => {
    const collection = await getCollectionById(collectionId);

    if (!collection) return;

    const alreadyExists = collection.books.some((book) => book.id === bookId);

    if (alreadyExists) {
      throw new Error("El libro ya existe en la colección");
    }

    const updatedBooks = [
      ...collection.books,
      {
        id: bookId,
        addedAt: new Date().toISOString(),
      },
    ];

    await update(collectionId, {
      books: updatedBooks,
    });
  };

  const removeBookFromCollection = async (
    collectionId: string,
    bookId: string,
  ) => {
    const collection = await getCollectionById(collectionId);

    if (!collection) return;
    const updatedBooks = collection.books.filter((book) => book.id !== bookId);
    await update(collectionId, {
      books: updatedBooks,
    });
  };

  return {
    collections,
    loading,
    error,
    createCollection,
    getCollectionById,
    getPaginatedCollections,
    getTotalPages,
    addBookToCollection,
    removeBookFromCollection,
    suscribeById,
  };
};
