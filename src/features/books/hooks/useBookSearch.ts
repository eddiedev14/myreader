import { useMemo, useState } from "react";
import { useBook } from "./useBook";
import { Trie } from "../algorithms/tries/Trie";
import type { Book } from "../interfaces/book.interface";

export const useBookSearch = () => {
  const { books } = useBook();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  // Creación del unico trie
  const trie = useMemo(() => {
    const newTrie = new Trie();

    (books ?? []).forEach((book) => {
      newTrie.insert(book);
    });

    return newTrie;
  }, [books]);

  // Busqueda de resultados
  const searchResults = !query ? [] : trie.searchByPrefix(query);

  const results = !query ? (books ?? []) : searchResults;

  // Sugerencias limitadas a 5
  const suggestions = searchResults.slice(0, 5);

  const handleChange = (value: string) => {
    setQuery(value);
    setOpen(true);
  };

  const handleSelect = (book: Book) => {
    setQuery(book.title);
    setOpen(false);
  };

  return {
    query,
    open,
    results,
    suggestions,
    hasResults: results.length > 0,
    handleChange,
    handleSelect,
  };
};
