import type { BookDashboard } from "../interfaces/book.interface";
import { useReadingQueue } from "./useReadingQueue";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const useQueueItem = (book: BookDashboard) => {
  //* Custom hooks
  const { removeFromQueue, startReading } = useReadingQueue();

  //* Handlers
  const handleRemoveFromQueue = () => {
    Swal.fire({
      title: "¿Deseas eliminar este libro de la cola de lectura?",
      text: "Este libro será eliminado de la cola de lectura, ¿Deseas continuar?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#E52F1E",
      cancelButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const error = await removeFromQueue(book);
        if (error) {
          toast.error(error);
          return;
        }

        toast.success("Libro eliminado de la cola de lectura");
      }
    });
  };

  const handleStartReading = async () => {
    const error = await startReading(book);
    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Lectura iniciada");
  };

  return {
    handleRemoveFromQueue,
    handleStartReading,
  };
};
