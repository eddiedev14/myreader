import type { Book } from "../interfaces/book.interface";

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg  p-4 shadow-sm hover:shadow-md transition"
    >
      <img
        src={book.bookCover}
        alt={book.title}
        className="w-full h-60 object-cover rounded-md mb-2"
      />

      <h3 className="font-semibold text-lg">{book.title}</h3>

      <p className="text-sm text-gray-500">{book.mainGenre}</p>
    </div>
  );
}
