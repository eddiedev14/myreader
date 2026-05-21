import { useState, type MouseEvent } from "react";
import type { Book } from "../interfaces/book.interface";
import type { BookDashboard } from "@/features/dashboard/interfaces/book.interface";
import { type BookDashboardStates } from "../../dashboard/types/book.types";
import { Button } from "@/shared/components/shadcn/button";
import { useBookCard } from "../hooks/useBookCard";
import { hasState } from "../utils/utils";
import { formatDate } from "@/shared/utils/utils";

export interface BookCardProps {
  book: Book | BookDashboard;
  onAdd?: (bookId: string) => Promise<void> | void;
  onRemove?: (bookId: string) => void;
  showAddButton?: boolean;
  showRemoveButton?: boolean;
  addButtonDisabled?: boolean;
  addButtonLabel?: string;
}

export function BookCard({
  book,
  onAdd,
  onRemove,
  showAddButton,
  showRemoveButton,
  addButtonDisabled = false,
  addButtonLabel,
}: BookCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    statesMessages,
    handleNavigateBook,
    handleEnqueueBook,
    handleRemoveFromDashboard,
  } = useBookCard(book as BookDashboard);

  const date = hasState(book) ? formatDate(book.endDate) : null;

  const isAddOnlyCard = Boolean(onAdd);

  const handleCardClick = async () => {
    if (!onAdd) {
      handleNavigateBook();
    }
  };

  const handleAddButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!onAdd || isAdding) return;

    setIsAdding(true);
    try {
      await onAdd(book.id);
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(book.id);
      return;
    }

    handleRemoveFromDashboard(e);
  };

  const shouldShowRemoveButton =
    showRemoveButton ??
    (!onAdd &&
      hasState(book) &&
      book.status !== "EN COLA" &&
      book.status !== "EN LECTURA");
  const shouldShowAddButton = showAddButton ?? Boolean(onAdd);

  return (
    <div
      className="w-48 cursor-pointer rounded-lg  p-4 shadow-sm hover:shadow-md transition relative"
      onClick={handleCardClick}
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

          {shouldShowRemoveButton && (
            <Button
              asChild
              onClick={handleRemoveButton}
              className="absolute top-6 left-6 size-7 flex items-center justify-center bg-red-500 text-white text-xs font-semibold rounded-full"
            >
              <i className="ri-delete-bin-7-fill"></i>
            </Button>
          )}
        </>
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

      {hasState(book) && !isAddOnlyCard && (
        <div className="mt-2 flex flex-col gap-2">
          {(book.status === "AGENDADO" || book.status === "COMPLETADO") && (
            <Button onClick={handleEnqueueBook} size="sm">
              <i className="ri-add-circle-fill"></i> Cola de Lectura
            </Button>
          )}

          {(book.status === "EN LECTURA" || book.status === "COMPLETADO") && (
            <Button variant="blue" size="sm">
              <i className="ri-sticky-note-fill"></i>
              {book.status === "EN LECTURA" ? "Tomar Apuntes" : "Ver Apuntes"}
            </Button>
          )}
        </div>
      )}

      {shouldShowAddButton && onAdd && (
        <div className="mt-4 flex items-center justify-between gap-2">
          <Button
            size="sm"
            disabled={isAdding || addButtonDisabled}
            onClick={handleAddButton}
          >
            <i className="ri-add-circle-fill"></i>
            {addButtonLabel ?? (isAdding ? "Agregando..." : "Agregar")}
          </Button>
        </div>
      )}
    </div>
  );
}
