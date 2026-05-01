class Node {
  page: number;
  next: Node | null = null;
  prev: Node | null = null;

  constructor(page: number) {
    this.page = page;
  }
}

export default Node;
