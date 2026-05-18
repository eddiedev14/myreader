import type { Book } from "../../books/interfaces/book.interface";
import type { BookDashboard } from "@/features/dashboard/interfaces/book.interface";
import { Button } from "@/shared/components/shadcn/button";
import { useAddCollectionBookCard } from "../hooks/useAddCollectionBookCard";
import { hasState } from "../../books/utils/utils";
import { formatDate } from "@/shared/utils/utils";

interface BookCardProps {
  book: Book | BookDashboard;
  onAddBook: (bookId: string) => Promise<void>;
}

export function AddCollectionBookCard({ book, onAddBook }: BookCardProps) {
  const { handleAddToCollection, isAdding } = useAddCollectionBookCard(
    book as BookDashboard,
    onAddBook,
  );

  const date = hasState(book) ? formatDate(book.endDate) : null;

  return (
    <div
      className="w-48 cursor-pointer rounded-lg p-4 shadow-sm hover:shadow-md transition relative"
      onClick={handleAddToCollection}
    >
      {hasState(book) && (
        <div
          className="absolute top-6 right-6 px-2 py-1 text-xs font-semibold rounded bg-blue-500 text-white"
          aria-label="Estado del libro"
        >
          {book.status}
        </div>
      )}

      <img
        src={book.bookCover}
        alt={book.title}
        className="w-full h-50 object-cover rounded-md mb-2"
      />

      {hasState(book) && book.status === "COMPLETADO" && (
        <div
          className="w-fit px-2 py-1 text-xs font-medium rounded bg-gray-100 flex gap-1"
          title="Fecha de finalización del libro"
          aria-label="Fecha de finalización del libro"
        >
          <i className="ri-calendar-check-fill"></i>
          {date
            ? date.toLocaleDateString("es-CO", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "Fecha inválida"}
        </div>
      )}

      <h3 className="font-semibold text-lg">{book.title}</h3>
      <p className="text-sm text-gray-500 capitalize">
        {book.mainGenre.replaceAll("_", " ")}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <Button size="sm" disabled={isAdding}>
          {isAdding ? "Agregando..." : "Agregar"}
        </Button>
      </div>
    </div>
  );
}
