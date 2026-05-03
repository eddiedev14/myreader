import type { Book } from "../../interfaces/book.interface";

class Node {
  children: Record<string, Node>;
  isEndOfWord: boolean;
  books: Book[];

  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.books = [];
  }
}

export default Node;
