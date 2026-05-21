import type { UserDoc } from "@/features/auth/types/user.types";
import { useCollection as useElementCollection } from "@/features/collections/hooks/useCollection";
import type { Collection } from "@/features/collections/interfaces/collection.interface";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { useCollection } from "@/firebase/hooks/useCollection";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useCollectionDetail = () => {
  //* URL Params
  const { collectionID } = useParams();

  //* Feature hooks
  const {
    getCollectionById,
    addBookToCollection,
    removeBookFromCollection,
    suscribeById,
  } = useElementCollection();
  const { books } = useDashboard();

  //* Auth
  const { getUserId } = useAuth();

  //* Firebase
  const { getById } = useCollection<UserDoc>("users");

  //* States
  const [collection, setCollection] = useState<Collection | null>(null);
  const [creator, setCreator] = useState<UserDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);

  //* Fetch collection (subscribe to document for real-time updates)
  useEffect(() => {
    if (!collectionID) return;

    setLoading(true);
    setCollection(null);
    setCreator(null);
    setIsAuthorized(true);

    const unsubscribe = suscribeById(collectionID, async (data) => {
      if (!data) {
        setCollection(null);
        setCreator(null);
        setIsAuthorized(true);
        setLoading(false);
        return;
      }

      const currentUserId = getUserId();
      const isOwner = currentUserId === data.creatorId;

      if (!isOwner) {
        setCollection(null);
        setCreator(null);
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      setIsAuthorized(true);
      setCollection(data);

      if (data.creatorId) {
        const creatorData = await getById(data.creatorId);
        setCreator(creatorData);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [collectionID]);

  //* Actions
  const handleAddBook = async (bookId: string) => {
    if (!collectionID) return;

    try {
      await addBookToCollection(collectionID, bookId);
      const updatedCollection = await getCollectionById(collectionID);
      setCollection(updatedCollection);
      toast.success("Libro agregado a la colección");
    } catch (error: any) {
      toast.error(error?.message || "Error al agregar el libro a la colección");
    }
  };

  const handleRemoveBook = async (bookId: string) => {
    if (!collectionID) return;

    await removeBookFromCollection(collectionID, bookId);

    const updatedCollection = await getCollectionById(collectionID);

    setCollection(updatedCollection);
  };

  const getCollectionBooks = () => {
    if (!collection?.books?.length) {
      return [];
    }

    return books.filter((dashboardBook) =>
      collection.books?.some(
        (collectionBook) => collectionBook.id === dashboardBook.id,
      ),
    );
  };

  return {
    collection,
    creator,
    loading,
    isAuthorized,
    dashboardBooks: books,
    handleAddBook,
    handleRemoveBook,
    getCollectionBooks,
  };
};
