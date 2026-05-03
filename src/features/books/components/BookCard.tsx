import type { Book } from "../interfaces/book.interface";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer rounded-lg  p-4 shadow-sm hover:shadow-md transition"
      onClick={() => navigate(`/library/${book.id}`)}
    >
      <img
        src={book.bookCover}
        alt={book.title}
        className="w-full h-50 object-cover rounded-md mb-2"
      />

      <h3 className="font-semibold text-lg">{book.title}</h3>
      <p className="text-sm text-gray-500">{book.mainGenre}</p>
    </div>
  );
}
