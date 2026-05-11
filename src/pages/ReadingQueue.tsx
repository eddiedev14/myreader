import { Header } from "@/shared/components/ui/sections/Header";

export const ReadingQueue = () => {
  return (
    <>
      <Header
        title="Cola de Lectura"
        paragraph="Organiza tus lecturas pendientes y continúa con tus libros favoritos"
      />

      <div className="grid grid-cols-[1fr_300px] gap-4">
        <main className="w-full flex flex-col gap-4"></main>
      </div>
    </>
  );
};
