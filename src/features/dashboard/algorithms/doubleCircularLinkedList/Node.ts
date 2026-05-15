import type { Collection } from "../../interfaces/collection.interface";

class Node {
  page: number;
  collections: Collection[];
  next: Node | null = null;
  prev: Node | null = null;

  constructor(page: number, collections: Collection[]) {
    this.page = page;
    this.collections = collections;
  }
}

export default Node;
