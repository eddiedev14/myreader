import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBook } from "./useBook";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import type { Book } from "../interfaces/book.interface";

import { useCollection } from "@/firebase/hooks/useCollection";
import { useComments } from "./useComments";

import type { UserDoc } from "@/features/auth/types/user.types";
import { toast } from "react-toastify";

export const useBookDetail = () => {
  //* URL Segments
  const { bookID } = useParams();

  //* Context
  const { getBookById } = useBook();
  const { addToDashboard, isInDashboard } = useDashboard();

  //* Collection Hook
  const { getById } = useCollection<UserDoc>("users");

  //* States
  const [book, setBook] = useState<Book | null>(null);
  const [isAlreadyInDashboard, setIsAlreadyInDashboard] = useState(false);
  const [creator, setCreator] = useState<UserDoc | null>(null);
  const [loading, setLoading] = useState(true);

  //* Custom hooks
  const { commentTree } = useComments(bookID);

  //* Effects
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!bookID) return;
        setLoading(true);

        const data = await getBookById(bookID);
        setBook(data);

        const alreadyInDashboard = await isInDashboard(bookID);
        setIsAlreadyInDashboard(alreadyInDashboard);

        if (data?.creatorId) {
          const creatorData = await getById(data.creatorId);
          setCreator(creatorData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookID]);

  //* Handlers
  const handleAddToDashboard = async () => {
    if (book) {
      const error = await addToDashboard(book);

      if (error) {
        toast.error(error);
        return;
      }

      setIsAlreadyInDashboard(true);
      toast.success("¡Libro agregado al dashboard!");
    }
  };

  return {
    book,
    creator,
    commentTree,
    loading,
    isAlreadyInDashboard,

    handleAddToDashboard,
  };
};
