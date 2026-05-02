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

  return {
    results: results ?? [],
    hasResults: (results ?? []).length > 0,
  };
};
