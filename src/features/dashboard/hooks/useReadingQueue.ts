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
  //? Función para agregar un libro a la cola, se actualiza el estado del libro a "EN COLA" y se le asigna una posición en la cola
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

  //? Función para eliminar un libro de la cola, se actualiza el estado del libro a "AGENDADO" y se le asigna una posición nula, además se reorganizan las posiciones de los libros que estaban detrás en la cola
  const removeFromQueue = async (
    book: BookDashboard,
  ): Promise<string | null> => {
    try {
      if (book.status !== "EN COLA" && book.status !== "EN LECTURA") {
        return "El libro no está en cola";
      }

      if (book.status === "EN LECTURA") {
        return "No puedes eliminar un libro que estás leyendo, primero debes completarlo o pausarlo";
      }

      const removedPosition = book.queuePosition;

      //? 1. Sacar libro de cola
      const updated = await updateBook(book.id, {
        ...book,
        status: "AGENDADO",
        queuePosition: null,
      });

      if (!updated) {
        return "Error al eliminar el libro de la cola";
      }

      //? 2. Reorganizar posiciones
      const booksToReorder = queueBooks.filter(
        (queueBook) => (queueBook.queuePosition ?? 0) > (removedPosition ?? 0),
      );

      await Promise.all(
        booksToReorder.map((queueBook) =>
          updateBook(queueBook.id, {
            ...queueBook,
            queuePosition: (queueBook.queuePosition ?? 0) - 1,
          }),
        ),
      );

      return null;
    } catch (error) {
      console.error("Error removing the book:", error);
      return "Error al eliminar el libro de la cola";
    }
  };

  //? Función para iniciar la lectura de un libro, se actualiza el estado del libro a "EN LECTURA" y se actualiza startDate
  const startReading = async (book: BookDashboard): Promise<string | null> => {
    try {
      if (book.status !== "EN COLA") {
        return "El libro no está en cola o ya está en lectura";
      }

      if (book.queuePosition !== 1) {
        return "Solo puedes iniciar la lectura del primer libro en la cola";
      }

      const updated = await updateBook(book.id, {
        ...book,
        status: "EN LECTURA",
        startDate: new Date().toISOString(),
      });

      if (!updated) {
        return "Error al iniciar la lectura";
      }

      return null;
    } catch (error) {
      console.error(error);
      return "Error al iniciar la lectura";
    }
  };

  return {
    queue,

    addToQueue,
    removeFromQueue,
    startReading,
  };
};
