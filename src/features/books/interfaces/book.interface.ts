import type { BookGenres } from "../data/BookGenre";
import type { BookDashboardStates } from "../types/book.types";

export interface Book {
  // Id para firestore
  id: string;

  // Info del libro
  title: string;
  synopsis: string;
  authors: string[];
  bookCover: string;
  ISBN: string;
  mainGenre: BookGenres;
  genres: BookGenres[];

  // Info de creación
  creatorId: string;
  createdAt: number;
}

export interface BookDashboard {
  status: BookDashboardStates;
  startedAt: Date | null;
  finishedAt: Date | null;
}
