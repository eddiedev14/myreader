import { useMemo, useState } from "react";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { useBook } from "@/features/books/hooks/useBook";
import type { BookDashboard } from "@/features/dashboard/interfaces/book.interface";
import type { Book } from "@/features/books/interfaces/book.interface";

export const useDashboardBookSearch = () => {
  const { books } = useDashboard();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const { books: allBooks } = useBook();

  const bookMap = useMemo(() => {
    const m = new Map<string, Book>();
    (allBooks ?? []).forEach((b) => m.set(b.id, b));
    return m;
  }, [allBooks]);

  const searchResults = useMemo(() => {
    if (!query) return [];

    const q = query.toLowerCase().trim();

    return (books ?? []).filter((b) => {
      if (b.title.toLowerCase().startsWith(q)) return true;

      const full = bookMap.get(b.id);
      if (full?.ISBN && full.ISBN.toLowerCase().startsWith(q)) return true;

      return false;
    });
  }, [books, query, bookMap]);
  const results = !query ? (books ?? []) : searchResults;
  const suggestions = searchResults.slice(0, 5);

  const handleChange = (v: string) => {
    setQuery(v);
    setOpen(true);
  };

  const handleSelect = (book: BookDashboard) => {
    setQuery(book.title);
    setOpen(false);
  };

  return {
    query,
    open,
    results,
    suggestions,
    handleChange,
    handleSelect,
    setOpen,
  };
};
