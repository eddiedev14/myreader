import type { BookDashboard } from "@/features/dashboard/interfaces/book.interface";
import { useReadingQueue } from "@/features/readingQueue/hooks/useReadingQueue";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import type { MouseEvent } from "react";
import { useCollection } from "./useCollection";
import { useParams } from "react-router-dom";

const statesMessages = {
  AGENDADO: {
    text: "AGENDADO",
    className: "bg-gray-500 text-white",
  },
  "EN COLA": {
    text: "EN COLA",
    className: "bg-yellow-500 text-white",
  },
  "EN LECTURA": {
    text: "LEYENDO",
    className: "bg-blue-500 text-white",
  },
  COMPLETADO: {
    text: "COMPLETADO",
    className: "bg-green-500 text-white",
  },
};

export const useCollectionBookCard = (book: BookDashboard) => {
  //* Contexts
  const { removeBookFromCollection } = useCollection();
  const { collectionID } = useParams();

  //* Custom hooks
  const { queue, addToQueue } = useReadingQueue();

  //* Navigate
  const navigate = useNavigate();

  //* Handlers
  const handleNavigateBook = () => {
    navigate(`/library/${book.id}`);
  };

  const handleRemoveFromCollection = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    Swal.fire({
      title: "¿Deseas eliminar este libro de tu colección?",
      text: "Este libro será eliminado de tu colección. ¿Deseas continuar?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#E52F1E",
      cancelButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (!collectionID) throw new Error("Collection ID no encontrada");

          await removeBookFromCollection(collectionID, book.id);
          toast.success("Libro eliminado de la colección");
        } catch (err: any) {
          toast.error(
            err?.message || "Error al eliminar el libro de la colección",
          );
        }
      }
    });
  };

  const handleEnqueueBook = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (book) {
      const error = await addToQueue(book);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success("¡Libro agregado a la cola de lectura!");
    }
  };

  return {
    queue,
    statesMessages,
    handleNavigateBook,
    handleEnqueueBook,
    handleRemoveFromCollection,
  };
};
