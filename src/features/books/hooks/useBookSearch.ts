import { useState } from "react";
import { useBook } from "./useBook";
import { Trie } from "../algorithms/tries/Trie";

export const useBookSearch = (query: string) => {
  const { books } = useBook();

  // Creación del unico trie
  const [trie] = useState(() => {
    const newTrie = new Trie();

    (books ?? []).forEach((book) => {
      newTrie.insert(book);
    });

    return newTrie;
  });

  // Busqueda de resultados
  const searchResults = !query ? [] : trie.searchByPrefix(query);

  const results = !query ? (books ?? []) : searchResults;

  // Sugerencias limitadas a 5
  const suggestions = searchResults.slice(0, 5);

  return {
    results,
    suggestions,
    hasResults: results.length > 0,
  };
};
