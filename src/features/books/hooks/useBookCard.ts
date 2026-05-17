import type { BookDashboard } from "@/features/dashboard/interfaces/book.interface";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { useReadingQueue } from "@/features/readingQueue/hooks/useReadingQueue";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import type { MouseEvent } from "react";

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

export const useBookCard = (book: BookDashboard) => {
  //* Contexts
  const { removeFromDashboard } = useDashboard();

  //* Custom hooks
  const { queue, addToQueue } = useReadingQueue();

  //* Navigate
  const navigate = useNavigate();

  //* Handlers
  const handleNavigateBook = () => {
    navigate(`/library/${book.id}`);
  };

  const handleRemoveFromDashboard = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    Swal.fire({
      title: "¿Deseas eliminar este libro de tu dashboard?",
      text: "Este libro será eliminado de tu dashboard (incluido las notas/apuntes que hayas tomado hasta el momento, ¿Deseas continuar?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#E52F1E",
      cancelButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const error = await removeFromDashboard(book);
        if (error) {
          toast.error(error);
          return;
        }

        toast.success("Libro eliminado del dashboard");
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
    handleRemoveFromDashboard,
  };
};
