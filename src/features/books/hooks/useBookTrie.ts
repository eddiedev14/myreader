import { useMemo } from "react";
import { useBook } from "./useBook";
import { Trie } from "../algorithms/tries/Trie";

export const useBookTrie = () => {
  const { books } = useBook();

  return useMemo(() => {
    const trie = new Trie();

    (books ?? []).forEach((book) => {
      trie.insert(book.title, book.id);
      trie.insert(book.ISBN, book.id);
    });

    return trie;
  }, [books]);
};
