import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCollection } from "@/firebase/hooks/useCollection";
import type { Collection } from "../../interfaces/collection.interface";
import { useEffect } from "react";
import type { CollectionFormData } from "../../types/collection.type";
import { PAGE_SIZE } from "../../constants/collection.constants";

export const useCollectionState = () => {
  //*Auth
  const { user, getUserId } = useAuth();

  //* Collection Hook
  const {
    results: collections,
    isPending: loading,
    error,
    suscribe,
    getById,
    add,
  } = useCollection<Collection>("collections");

  //* Effects
  useEffect(() => {
    const unsubscribe = suscribe();
    return () => unsubscribe?.();
  }, []);

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

  //? Buscar libro por id
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

  return {
    collections,
    loading,
    error,
    createCollection,
    getCollectionById,
    getPaginatedCollections,
    getTotalPages,
  };
};
