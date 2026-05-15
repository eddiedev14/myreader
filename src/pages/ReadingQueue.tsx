import { useReadingQueue } from "@/features/dashboard/hooks/readingQueue/useReadingQueue";
import { Header } from "@/shared/components/ui/sections/Header";
import { QueueItem } from "@/features/dashboard/components/readingQueue/QueueItem";
import { Pomodoro } from "@/features/dashboard/components/Pomodoro";

export const ReadingQueue = () => {
  const { queue } = useReadingQueue();

  return (
    <>
      <Header
        title="Cola de Lectura"
        paragraph="Organiza tus lecturas pendientes y continúa con tus libros favoritos"
      />

      {queue.items.length === 0 && (
        <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
          <p className="text-gray-500">Tu cola de lectura está vacía</p>
        </div>
      )}

      {queue.items.length > 0 && (
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <main className="w-full flex flex-col gap-6">
            {queue.items.map((book) => (
              <QueueItem key={book.id} book={book} />
            ))}
          </main>
          <aside>
            <Pomodoro />
          </aside>
        </div>
      )}
    </>
  );
};
