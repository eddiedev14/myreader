import { Button } from "@/shared/components/shadcn/button";
import type { BookDashboard } from "../interfaces/book.interface";
import { useQueueItem } from "../hooks/useQueueItem";

interface QueueItemProps {
  book: BookDashboard;
}

export const QueueItem = ({ book }: QueueItemProps) => {
  const {
    handleRemoveFromQueue,
    handleStartReading,
    handleCompleteReading,
    handleStopReading,
  } = useQueueItem(book);

  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 bg-white border border-gray-200 shadow-md py-4 px-6 rounded relative">
      <div className="w-20 h-32 overflow-hidden rounded">
        <span className="absolute top-2 left-3 bg-blue-600 text-white w-6 h-6 flex justify-center items-center rounded-full text-xs font-bold">
          {book.queuePosition}.
        </span>
        <img src={book.bookCover} alt={book.title} className="w-full h-full" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{book.title}</h2>
          <span className="bg-blue-200 text-gray-800 py-1 px-2 rounded text-sm capitalize">
            {book.mainGenre}
          </span>
        </div>
        <h3 className="text-gray-600 text-sm">{book.authors.join(", ")}</h3>
        <div className="flex gap-2">
          {book.status === "EN COLA" && book.queuePosition === 1 && (
            <Button variant="blue" size="sm" onClick={handleStartReading}>
              Iniciar Lectura
            </Button>
          )}
          {book.status === "EN COLA" && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRemoveFromQueue}
            >
              Eliminar de la cola
            </Button>
          )}
          {book.status === "EN LECTURA" && (
            <>
              <Button variant="blue" size="sm" onClick={handleCompleteReading}>
                Completar Lectura
              </Button>
              <Button variant="secondary" size="sm">
                Tomar Apuntes
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleStopReading}
              >
                Pausar Lectura
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
