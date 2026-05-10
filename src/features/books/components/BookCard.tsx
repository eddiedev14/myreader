import type { Book } from "../interfaces/book.interface";
import type { BookDashboard } from "@/features/dashboard/interfaces/book.interface";
import { type BookDashboardStates } from "../../dashboard/types/book.types";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
  book: Book | BookDashboard;
}

const statesMessages = {
  AGENDADO: {
    text: "AGENDADO",
    className: "bg-gray-500 text-white",
  },
  "EN LECTURA": {
    text: "LEYENDO",
    className: "bg-blue-500 text-white",
  },
  COMPLETADO: {
    text: "COMPLETADO",
    className: "bg-green-500 text-white",
  },
};

function hasState(book: Book | BookDashboard): book is BookDashboard {
  return "status" in book;
}

export function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer rounded-lg  p-4 shadow-sm hover:shadow-md transition relative"
      onClick={() => navigate(`/library/${book.id}`)}
    >
      {hasState(book) && (
        <div
          className={`absolute top-6 right-6 px-2 py-1 text-xs font-semibold rounded ${
            statesMessages[book.status as BookDashboardStates].className
          }`}
        >
          {statesMessages[book.status as BookDashboardStates].text}
        </div>
      )}

      <img
        src={book.bookCover}
        alt={book.title}
        className="w-full h-50 object-cover rounded-md mb-2"
      />

      <h3 className="font-semibold text-lg">{book.title}</h3>
      <p className="text-sm text-gray-500 capitalize">
        {book.mainGenre.replaceAll("_", " ")}
      </p>
    </div>
  );
}
