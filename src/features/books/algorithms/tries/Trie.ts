import Node from "./Node";
import type { Book } from "../../interfaces/book.interface";

export class Trie {
  private root: Node;

  constructor() {
    this.root = new Node();
  }

  insert(book: Book): void {
    this.insertField(book.title, book);
    this.insertField(book.ISBN, book);
  }

  // Método privado para insertar un campo en el trie global
  private insertField(text: string, book: Book): void {
    let current = this.root;

    const normalized = text.toLowerCase().trim();

    for (const char of normalized) {
      if (!current.children[char]) {
        current.children[char] = new Node();
      }

      current = current.children[char];
    }

    current.isEndOfWord = true;
    current.books.push(book);
  }

  // Busca libros por prefijo (título o ISBN)
  searchByPrefix(prefix: string): Book[] {
    let current = this.root;

    for (const char of prefix.toLowerCase()) {
      if (!current.children[char]) {
        return [];
      }

      current = current.children[char];
    }

    const results: Book[] = [];
    this.collectBooks(current, results);

    // Eliminar duplicados en base a su id
    return Array.from(new Map(results.map((b) => [b.id, b])).values());
  }

  // Método recursivo para recolectar libros desde un nodo dado
  private collectBooks(node: Node, results: Book[]): void {
    if (node.isEndOfWord) {
      results.push(...node.books);
    }

    for (const key in node.children) {
      this.collectBooks(node.children[key], results);
    }
  }
}
