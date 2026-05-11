import { useReadingQueue } from "@/features/dashboard/hooks/useReadingQueue";
import { Header } from "@/shared/components/ui/sections/Header";
import { QueueItem } from "@/features/dashboard/components/QueueItem";

export const ReadingQueue = () => {
  const { queue } = useReadingQueue();

  return (
    <>
      <Header
        title="Cola de Lectura"
        paragraph="Organiza tus lecturas pendientes y continúa con tus libros favoritos"
      />

      <div className="grid grid-cols-[1fr_400px] gap-4">
        <main className="w-full flex flex-col gap-6">
          {queue.items.map((book) => (
            <QueueItem key={book.id} book={book} />
          ))}
        </main>
      </div>
    </>
  );
};
