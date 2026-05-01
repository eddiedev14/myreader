import Node from "./Node";

class DoubleCircularLinkedList {
  head: Node | null = null;

  constructor(totalPages: number) {
    if (totalPages <= 0) return;

    let first = new Node(1);
    this.head = first;
    let prev = first;

    for (let i = 2; i <= totalPages; i++) {
      const node = new Node(i);
      prev.next = node;
      node.prev = prev;
      prev = node;
    }

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
