import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBook } from "./useBook";
import type { Book } from "../interfaces/book.interface";

export const useBookDetail = () => {
  //* URL Segments
  const { bookID } = useParams();

  //* Context
  const { getBookById } = useBook();

  //* States
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  //* Effects
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!bookID) return;
        setLoading(true);

        const data = await getBookById(bookID);
        setBook(data);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookID]);

  return {
    book,
    loading,
  };
};
