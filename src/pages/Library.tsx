import { useBook } from "@/features/books/hooks/useBook";
import { useBookSearch } from "@/features/books/hooks/useBookSearch";

import { BookList } from "@/features/books/components/BookList";
import { BookSearch } from "@/features/books/components/BookSearch";
import { CreateBookDialog } from "@/features/books/components/CreateBookDialog";
import { Header } from "@/shared/components/ui/sections/Header";

export const Library = () => {
  //* Contexts
  const { books } = useBook();

  //* Custom hooks
  const { query, open, results, suggestions, handleChange, handleSelect } =
    useBookSearch();

  //* Variables
  const booksToShow = query ? results : books;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <Header
          title="Explora la Biblioteca"
          paragraph="Descubre libros publicados, revisa sus detalles y encuentra tu próxima gran lectura."
        />

        <div className="mt-2">
          <CreateBookDialog />
        </div>
      </div>
      <BookSearch
        input={query}
        open={open}
        suggestions={suggestions}
        onChange={handleChange}
        onSelect={handleSelect}
      />
      <BookList books={booksToShow} />
    </div>
  );
};
