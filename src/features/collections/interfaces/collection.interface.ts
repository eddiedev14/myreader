import type { Book } from "@/features/books/interfaces/book.interface";

export interface Collection {
  // Id para firestore
  id: string;

  // Info de la colección
  title: string;
  description: string;
  books: Book[];

  // Info de creación
  creatorId: string;
  createdAt: number;
}
