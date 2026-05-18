import type { UserDoc } from "@/features/auth/types/user.types";
import { useCollection as useElementCollection } from "@/features/collections/hooks/useCollection";
import type { Collection } from "@/features/collections/interfaces/collection.interface";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { useCollection } from "@/firebase/hooks/useCollection";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useCollectionDetail = () => {
  //* URL Params
  const { collectionID } = useParams();

  //* Feature hooks
  const { getCollectionById, addBookToCollection, removeBookFromCollection } =
    useElementCollection();
  const { books } = useDashboard();

  //* Firebase
  const { getById } = useCollection<UserDoc>("users");

  //* States
  const [collection, setCollection] = useState<Collection | null>(null);
  const [creator, setCreator] = useState<UserDoc | null>(null);
  const [loading, setLoading] = useState(true);

  //* Fetch collection
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        if (!collectionID) return;

        setLoading(true);

        const data = await getCollectionById(collectionID);

        setCollection(data);

        if (data?.creatorId) {
          const creatorData = await getById(data.creatorId);
          setCreator(creatorData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionID]);

  //* Actions
  const handleAddBook = async (bookId: string) => {
    if (!collectionID) return;

    await addBookToCollection(collectionID, bookId);

    const updatedCollection = await getCollectionById(collectionID);

    setCollection(updatedCollection);
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
    dashboardBooks: books,
    handleAddBook,
    handleRemoveBook,
    getCollectionBooks,
  };
};
