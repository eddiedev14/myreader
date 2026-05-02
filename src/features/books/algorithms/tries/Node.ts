class Node {
  children: Map<string, Node>;
  isEndOfWord: boolean;
  books: string[];

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.books = [];
  }
}

export default Node;
