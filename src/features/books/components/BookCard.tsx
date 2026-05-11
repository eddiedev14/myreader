import type { Book } from "../interfaces/book.interface";
import type { BookDashboard } from "@/features/dashboard/interfaces/book.interface";
import { type BookDashboardStates } from "../../dashboard/types/book.types";
import { Button } from "@/shared/components/shadcn/button";
import { useBookCard } from "../hooks/useBookCard";
import { hasState } from "../utils/utils";

interface BookCardProps {
  book: Book | BookDashboard;
}

export function BookCard({ book }: BookCardProps) {
  const {
    statesMessages,
    handleNavigateBook,
    handleEnqueueBook,
    handleRemoveFromDashboard,
  } = useBookCard(book as BookDashboard);

  return (
    <div
      className="w-48 cursor-pointer rounded-lg  p-4 shadow-sm hover:shadow-md transition relative"
      onClick={handleNavigateBook}
    >
      {hasState(book) && (
        <>
          <div
            className={`absolute top-6 right-6 px-2 py-1 text-xs font-semibold rounded ${
              statesMessages[book.status as BookDashboardStates].className
            }`}
          >
            {statesMessages[book.status as BookDashboardStates].text}
          </div>

          <Button
            asChild
            onClick={handleRemoveFromDashboard}
            className="absolute top-6 left-6 size-7 flex items-center justify-center bg-red-500 text-white text-xs font-semibold rounded-full"
          >
            <i className="ri-delete-bin-7-fill"></i>
          </Button>
        </>
      )}

      <img
        src={book.bookCover}
        alt={book.title}
        className="w-full h-50 object-cover rounded-md mb-2"
      />

      <h3 className="font-semibold text-lg">{book.title}</h3>
      <p className="text-sm text-gray-500 capitalize">
        {book.mainGenre.replaceAll("_", " ")}
      </p>

      {hasState(book) && (
        <div className="mt-2 flex flex-col gap-2">
          {(book.status === "AGENDADO" || book.status === "COMPLETADO") && (
            <Button onClick={handleEnqueueBook}>
              <i className="ri-add-circle-fill"></i> Cola de Lectura
            </Button>
          )}

          {(book.status === "EN LECTURA" || book.status === "COMPLETADO") && (
            <Button>
              <i className="ri-sticky-note-fill"></i>
              {book.status === "EN LECTURA" ? "Tomar Apuntes" : "Ver Apuntes"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
