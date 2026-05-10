import type { Book, BookDashboard } from "../../interfaces/book.interface";

class Node {
  page: number;
  books: Book[] | BookDashboard[];
  next: Node | null = null;
  prev: Node | null = null;

  constructor(page: number, books: Book[] | BookDashboard[]) {
    this.page = page;
    this.books = books;
  }
}

export default Node;
