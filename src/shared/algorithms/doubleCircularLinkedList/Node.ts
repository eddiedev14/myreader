import type { Book } from "@/features/books/interfaces/book.interface";
import type { BookDashboard } from "@/features/dashboard/interfaces/book.interface";
import type { Collection } from "@/features/collections/interfaces/collection.interface";

class Node {
  page: number;
  nodes: Book[] | BookDashboard[] | Collection[];
  next: Node | null = null;
  prev: Node | null = null;

  constructor(page: number, nodes: Book[] | BookDashboard[] | Collection[]) {
    this.page = page;
    this.nodes = nodes;
  }
}

export default Node;
