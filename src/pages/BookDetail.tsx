import { useBookDetail } from "@/features/books/hooks/useBookDetail";
import { PageLoader } from "@/shared/components/ui/sections/PageLoader";

export const BookDetail = () => {
  const { book, loading } = useBookDetail();

  if (loading) {
    return <PageLoader />;
  }

  if (!book) {
    return (
      <section>
        <h2>Libro no encontrado</h2>
      </section>
    );
  }

  return (
    <section>
      <h1>{book.title}</h1>
    </section>
  );
};
