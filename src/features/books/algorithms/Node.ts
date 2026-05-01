import type { Book } from "../interfaces/book.interface";

class Node {
  page: number;
  books: Book[];
  next: Node | null = null;
  prev: Node | null = null;

  constructor(page: number, books: Book[]) {
    this.page = page;
    this.books = books;
  }
}

export default Node;
