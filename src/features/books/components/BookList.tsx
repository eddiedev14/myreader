import { useState } from "react";
import { useBook } from "../hooks/useBook";
import { BookCard } from "./BookCard";
import { BookInfoDialog } from "./BookInfoDialog";
import type { Book } from "../interfaces/book.interface";

export function BookList() {
  const { books, getPaginatedBooks, totalPages } = useBook();

  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const paginatedBooks = getPaginatedBooks(page);

  if (!books.length) {
    return (
      <p className="text-center text-gray-500">No hay libros disponibles</p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Cuadricula para los elementos */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {paginatedBooks.map((book: Book) => (
          <BookCard
            key={book.id}
            book={book}
            onClick={() => setSelectedBook(book)}
          />
        ))}
      </div>

      {/* Paginas */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className="px-3 py-1 border rounded"
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      <BookInfoDialog
        book={selectedBook}
        open={!!selectedBook}
        onOpenChange={() => setSelectedBook(null)}
      />
    </div>
  );
}
