import type { BookGenres } from "@/features/books/data/BookGenre";
import type { BookDashboardStates } from "../types/book.types";

export interface BookDashboard {
  // Snapshot del libro
  id: string;
  title: string;
  authors: string[];
  bookCover: string;
  mainGenre: BookGenres;

  status: BookDashboardStates;
  startedAt: Date | null;
  finishedAt: Date | null;
}
