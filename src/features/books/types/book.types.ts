import type { Book } from "../interfaces/book.interface";

export type BookFormData = Omit<Book, "id" | "creatorId" | "createdAt">;
