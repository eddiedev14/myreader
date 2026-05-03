import Node from "./Node";
import type { Book } from "../../interfaces/book.interface";
import { PAGE_SIZE } from "../../constants/book.constants";

class DoubleCircularLinkedList {
  head: Node | null = null;

  constructor(books: Book[]) {
    if (!books.length) return;

    const totalPages = Math.ceil(books.length / PAGE_SIZE);

    let first = new Node(1, books.slice(0, PAGE_SIZE));
    this.head = first;
    let prev = first;

    for (let i = 2; i <= totalPages; i++) {
      const start = (i - 1) * PAGE_SIZE;
      const node = new Node(i, books.slice(start, start + PAGE_SIZE));
      prev.next = node;
      node.prev = prev;
      prev = node;
    }

    // cerrar la lista circular
    prev.next = first;
    first.prev = prev;
  }

  next(current: Node): Node {
    return current.next!;
  }

  prev(current: Node): Node {
    return current.prev!;
  }
}

export default DoubleCircularLinkedList;
