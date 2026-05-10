import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import type { MouseEvent } from "react";

const statesMessages = {
  AGENDADO: {
    text: "AGENDADO",
    className: "bg-gray-500 text-white",
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

export const useBookCard = () => {
  //* Contexts
  const { removeFromDashboard } = useDashboard();

  //* Navigate
  const navigate = useNavigate();

  //* Handlers
  const handleNavigateBook = (bookId: string) => {
    navigate(`/library/${bookId}`);
  };

  const handleRemoveFromDashboard = (
    e: MouseEvent<HTMLButtonElement>,
    bookId: string,
  ) => {
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
        const error = await removeFromDashboard(bookId);
        if (error) {
          toast.error(error);
          return;
        }

        toast.success("Libro eliminado del dashboard");
      }
    });
  };

  return {
    statesMessages,
    handleNavigateBook,
    handleRemoveFromDashboard,
  };
};
