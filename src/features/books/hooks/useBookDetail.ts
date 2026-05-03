import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBook } from "./useBook";
import type { Book } from "../interfaces/book.interface";

import { useCollection } from "@/firebase/hooks/useCollection";
import type { UserDoc } from "@/features/auth/types/user.types";

export const useBookDetail = () => {
  //* URL Segments
  const { bookID } = useParams();

  //* Context
  const { getBookById } = useBook();

  //* Collection Hook
  const { getById } = useCollection<UserDoc>("users");

  //* States
  const [book, setBook] = useState<Book | null>(null);
  const [creator, setCreator] = useState<UserDoc | null>(null);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  //* Effects
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!bookID) return;
        setLoading(true);

        const data = await getBookById(bookID);
        setBook(data);

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

  return {
    book,
    creator,
    loading,
    imageError,
    setImageError,
  };
};
