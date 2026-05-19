import { useState, useMemo, useEffect } from "react";
import { BookCard } from "./BookCard";
import { getVisibleNodes } from "../utils/utils";
import { PAGE_SIZE, VISIBLE_PAGES } from "../constants/book.constants";
import type { Book } from "../interfaces/book.interface";
import type { BookDashboard } from "@/features/dashboard/interfaces/book.interface";
import DoubleCircularLinkedList from "@/shared/algorithms/doubleCircularLinkedList/DoubleCircularLinkedList";

interface Props {
  books?: Book[] | BookDashboard[];
}

export function BookList({ books = [] }: Props) {
  const booksList = useMemo(
    () => new DoubleCircularLinkedList<Book | BookDashboard>(books),
    [books],
  );
  const [currentPage, setCurrentPage] = useState(1);

  const currentNode = useMemo(() => {
    return booksList.getNode(currentPage);
  }, [booksList, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [books]);

  if (!books.length) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No hay libros disponibles</p>
      </div>
    );
  }

  if (!currentNode) return null;

  const totalPages = Math.ceil(books.length / PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {currentNode.nodes.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage(currentNode.prev!.page)}
          className="px-3 py-1 border border-gray-400 rounded cursor-pointer"
        >
          <i className="ri-arrow-drop-left-line" />
        </button>

        {getVisibleNodes(currentNode, totalPages, VISIBLE_PAGES).map((node) => (
          <button
            key={node.page}
            onClick={() => setCurrentPage(node.page)}
            className={`px-3 py-1 rounded cursor-pointer
              ${
                currentNode.page === node.page
                  ? "bg-orange-500 text-white"
                  : "bg-white text-black border border-gray-400"
              }`}
          >
            {node.page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentNode.next!.page)}
          className="px-3 py-1 border border-gray-400 rounded cursor-pointer"
        >
          <i className="ri-arrow-drop-right-line" />
        </button>
      </div>
    </div>
  );
}
