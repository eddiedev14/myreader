import { useMemo } from "react";
import { useBook } from "./useBook";
import { useBookTrie } from "./useBookTrie";

export const useBookSearch = (query: string) => {
  const { books } = useBook();
  const trie = useBookTrie();

  const results = useMemo(() => {
    if (!query) return books ?? [];

    const ids = trie.searchPrefix(query);

    return (books ?? []).filter((book) => ids.includes(book.id));
  }, [query, trie, books]);

  // Las sugerencias se limitan
  const suggestions = useMemo(() => {
    if (!query) return [];

    const ids = trie.searchPrefix(query);

    return (books ?? []).filter((book) => ids.includes(book.id)).slice(0, 5); // 🔥 limitar
  }, [query, trie, books]);

  return {
    results: results ?? [],
    suggestions,
    hasResults: (results ?? []).length > 0,
  };
};
