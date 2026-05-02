import Node from "./Node";

export class Trie {
  private root: Node;

  constructor() {
    this.root = new Node();
  }

  // Inserta una palabra en el trie y la asocia al id de un libro
  insert(word: string, bookId: string) {
    let node = this.root;

    for (const char of word.toLowerCase()) {
      if (!node.children.has(char)) {
        node.children.set(char, new Node());
      }
      node = node.children.get(char)!;
    }

    node.isEndOfWord = true;
    node.books.push(bookId);
  }

  // Busca todas las palabras que comienzan con el prefijo dado y devuelve los ids de los libros asociados
  searchPrefix(prefix: string): string[] {
    let node = this.root;

    for (const char of prefix.toLowerCase()) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char)!;
    }

    return this.collectAll(node);
  }

  // Función recursiva para recolectar todos los ids de libros a partir de un nodo dado
  private collectAll(node: Node): string[] {
    let results: string[] = [];

    if (node.isEndOfWord) {
      results.push(...node.books);
    }

    for (const child of node.children.values()) {
      results = results.concat(this.collectAll(child));
    }

    return results;
  }
}
