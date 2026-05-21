import Node from "./Node";
import type { Book } from "@/features/books/interfaces/book.interface";
import type { BookDashboard } from "@/features/dashboard/interfaces/book.interface";
import type { Collection } from "@/features/collections/interfaces/collection.interface";
import { PAGE_SIZE } from "@/features/books/constants/book.constants";

class DoubleCircularLinkedList<T extends Book | BookDashboard | Collection> {
  head: Node<T> | null = null;

  constructor(nodes: T[], pageSize: number = PAGE_SIZE) {
    if (!nodes.length) return;

    const totalPages = Math.ceil(nodes.length / pageSize);

    const first = new Node<T>(1, nodes.slice(0, pageSize));
    this.head = first;
    let prev = first;

    for (let i = 2; i <= totalPages; i++) {
      const start = (i - 1) * pageSize;
      const node = new Node<T>(i, nodes.slice(start, start + pageSize));
      prev.next = node;
      node.prev = prev;
      prev = node;
    }

    // cerrar la lista circular
    prev.next = first;
    first.prev = prev;
  }

  getNode(page: number): Node<T> | null {
    if (!this.head) return null;
    let current = this.head;

    do {
      if (current.page === page) {
        return current;
      }

      current = current.next!;
    } while (current !== this.head);

    return null;
  }

  next(current: Node<T>): Node<T> {
    return current.next!;
  }

  prev(current: Node<T>): Node<T> {
    return current.prev!;
  }
}

export default DoubleCircularLinkedList;
