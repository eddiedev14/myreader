import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useBook } from "@/features/books/hooks/useBook";
import { useBookSearch } from "@/features/books/hooks/useBookSearch";

import { BookList } from "@/features/books/components/BookList";
import { BookSearch } from "@/features/books/components/BookSearch";
import { CreateBookDialog } from "@/features/books/components/CreateBookDialog";
import { Header } from "@/shared/components/ui/sections/Header";

export const Library = () => {
  const { user } = useAuth();
  const { books } = useBook();
  const [query, setQuery] = useState("");
  const { results } = useBookSearch(query);
  const booksToShow = query ? results : books;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <Header
          title={`Bienvenido, ${user?.username || "Usuario"}!`}
          paragraph="Explora nuestra colección de libros, ¡Descubre tu proximo favorito!"
        />

        <div className="mt-2">
          <CreateBookDialog />
        </div>
      </div>
      <BookSearch onSearch={setQuery} />
      <BookList books={booksToShow} />
    </div>
  );
};
