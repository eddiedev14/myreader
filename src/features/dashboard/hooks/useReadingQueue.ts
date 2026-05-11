import { useMemo } from "react";
import { useDashboard } from "./useDashboard";
import Queue from "../algorithms/Queue";
import type { BookDashboard } from "../interfaces/book.interface";

export const useReadingQueue = () => {
  //* Contexts
  const { books, updateBook } = useDashboard();

  //* Memo
  //? Se filtran los libros que están en la cola o en lectura, y se ordenan por posición en la cola
  const queueBooks = useMemo(() => {
    return books
      .filter(
        (book) => book.status === "EN COLA" || book.status === "EN LECTURA",
      )
      .sort((a, b) => (a.queuePosition ?? 0) - (b.queuePosition ?? 0));
  }, [books]);

  //? Se crea una instancia de la clase Queue con los libros filtrados y ordenados
  const queue = useMemo(() => {
    const queueDS = new Queue();

    queueBooks.forEach((book) => {
      queueDS.enqueue(book);
    });

    return queueDS;
  }, [queueBooks]);

  //* Functions
  const addToQueue = async (book: BookDashboard): Promise<string | null> => {
    try {
      if (book.status === "EN COLA" || book.status === "EN LECTURA") {
        return "El libro ya está en cola";
      }

      const updated = await updateBook(book.id, {
        ...book,
        status: "EN COLA",
        queuePosition: queue.size() + 1,
      });

      if (!updated) {
        return "Error al agregar a la cola";
      }

      return null;
    } catch (error) {
      console.error(error);
      return "Error al agregar a la cola";
    }
  };

  return {
    queue,

    addToQueue,
  };
};
