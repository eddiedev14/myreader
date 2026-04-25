import { BookGenres } from "../data/BookGenre";

export type Book = {
  // Id para firestore
  id: string;

  // Info del libro
  title: string;
  synopsis: string;
  authors: string[];
  bookCover: string | null;
  ISBN: string;
  mainGenre: BookGenres;
  genres: BookGenres[];

  // Info de creación
  creatorId: string;
  createdAt: number;
};

export type BookFormData = Omit<Book, "id" | "creatorId" | "createdAt">;
