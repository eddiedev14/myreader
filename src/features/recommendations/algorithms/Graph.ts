import type { Book } from "@/features/books/interfaces/book.interface";

export default class Graph {
  public books: Book[];

  // Relaciones por autor
  public authorAdjList: Map<Book, Book[]>;

  // Relaciones por género
  public genreAdjList: Map<Book, Book[]>;

  constructor() {
    this.books = [];
    this.authorAdjList = new Map();
    this.genreAdjList = new Map();
  }

  //* Añadir libro al grafo
  addBook(node: Book) {
    this.books.push(node);

    this.authorAdjList.set(node, []);
    this.genreAdjList.set(node, []);
  }

  //* Construir relaciones automáticamente
  buildConnections() {
    for (let i = 0; i < this.books.length; i++) {
      for (let j = i + 1; j < this.books.length; j++) {
        const book1 = this.books[i];
        const book2 = this.books[j];

        // Relación por autor
        const sameAuthor = book1.authors.some((author) =>
          book2.authors.includes(author),
        );

        if (sameAuthor) {
          this.addAuthorEdge(book1, book2);
        }

        // Relación por género
        const sameGenre = book1.mainGenre === book2.mainGenre;

        if (sameGenre) {
          this.addGenreEdge(book1, book2);
        }
      }
    }
  }

  //* Relaciones por autor
  private addAuthorEdge(node1: Book, node2: Book) {
    this.authorAdjList.get(node1)?.push(node2);
    this.authorAdjList.get(node2)?.push(node1);
  }

  //* Relaciones por género
  private addGenreEdge(node1: Book, node2: Book) {
    this.genreAdjList.get(node1)?.push(node2);
    this.genreAdjList.get(node2)?.push(node1);
  }

  //* Obtener recomendaciones por autor
  getAuthorRecommendations(book: Book) {
    return this.authorAdjList.get(book) || [];
  }

  //* Obtener recomendaciones por género
  getGenreRecommendations(book: Book) {
    return this.genreAdjList.get(book) || [];
  }
}
