import type { BookGenres } from "@/features/books/data/BookGenre";
import type { BookDashboardStates } from "../types/book.types";
import type { Note } from "@/features/notes/interfaces/note.interface";

export interface BookDashboard {
  // Snapshot del libro
  id: string;
  title: string;
  authors: string[];
  bookCover: string;
  mainGenre: BookGenres;

  status: BookDashboardStates;
  previousStatus?: BookDashboardStates | null;
  queuePosition: number | null;
  startDate: Date | null;
  endDate: Date | null;
  note: Note | null;
}
