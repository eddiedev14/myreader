import { useState, type MouseEvent } from "react";
import { toast } from "react-toastify";
import type { BookDashboard } from "@/features/dashboard/interfaces/book.interface";

export const useAddCollectionBookCard = (
  book: BookDashboard,
  onAddBook: (bookId: string) => Promise<void>,
) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCollection = async (
    e?: MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    e?.stopPropagation();

    if (isAdding) return;

    setIsAdding(true);

    try {
      await onAddBook(book.id);
      toast.success("Libro agregado a la colección");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Error al agregar el libro a la colección";
      toast.error(message);
    } finally {
      setIsAdding(false);
    }
  };

  return {
    handleAddToCollection,
    isAdding,
  };
};
