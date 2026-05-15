import Node from "./Node";
import type { Book } from "@/features/books/interfaces/book.interface";
import type { BookDashboard } from "@/features/dashboard/interfaces/book.interface";
import type { Collection } from "@/features/collections/interfaces/collection.interface";
import { PAGE_SIZE } from "@/features/books/constants/book.constants";

class DoubleCircularLinkedList {
  head: Node | null = null;

  constructor(nodes: Book[] | BookDashboard[] | Collection[]) {
    if (!nodes.length) return;

    const totalPages = Math.ceil(nodes.length / PAGE_SIZE);

    const first = new Node(1, nodes.slice(0, PAGE_SIZE));
    this.head = first;
    let prev = first;

    for (let i = 2; i <= totalPages; i++) {
      const start = (i - 1) * PAGE_SIZE;
      const node = new Node(i, nodes.slice(start, start + PAGE_SIZE));
      prev.next = node;
      node.prev = prev;
      prev = node;
    }

    // cerrar la lista circular
    prev.next = first;
    first.prev = prev;
  }

  getNode(page: number): Node | null {
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

  next(current: Node): Node {
    return current.next!;
  }

  prev(current: Node): Node {
    return current.prev!;
  }
}

export default DoubleCircularLinkedList;
