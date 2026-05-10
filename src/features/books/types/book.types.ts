import type { Book } from "../interfaces/book.interface";

export type BookFormData = Omit<Book, "id" | "creatorId" | "createdAt">;
export type BookDashboardStates = "AGENDADO" | "EN LECTURA" | "COMPLETADO";
