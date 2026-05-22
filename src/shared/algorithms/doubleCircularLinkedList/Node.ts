import type { Book } from "@/features/books/interfaces/book.interface";
import type { BookDashboard } from "@/features/dashboard/interfaces/book.interface";
import type { Collection } from "@/features/collections/interfaces/collection.interface";

class Node<T extends Book | BookDashboard | Collection> {
  page: number;
  nodes: T[];
  next: Node<T> | null = null;
  prev: Node<T> | null = null;

  constructor(page: number, nodes: T[]) {
    this.page = page;
    this.nodes = nodes;
  }
}

export default Node;
