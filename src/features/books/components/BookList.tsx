import { useState } from "react";
import { useBook } from "../hooks/useBook";
import { BookCard } from "./BookCard";
import DoubleCircularLinkedList from "../algorithms/DoubleCircularLinkedList";
import getVisibleNodes from "../utils/utils";
import { PAGE_SIZE, VISIBLE_PAGES } from "../constants/book.constants";
import Node from "../algorithms/Node";

export function BookList() {
  const { books } = useBook();
  const booksList = new DoubleCircularLinkedList(books);
  const [currentNode, setCurrentNode] = useState<Node | null>(booksList.head);

  if (!books.length) {
    return (
      <p className="text-center text-gray-500">No hay libros disponibles</p>
    );
  }

  const totalPages = Math.ceil(books.length / PAGE_SIZE);

  return (
    <div className="space-y-4">
      {/* Cuadrícula para los elementos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {currentNode!.books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Botones de paginación */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setCurrentNode(booksList.prev(currentNode!))}
          className="px-3 py-1 border rounded"
        >
          <i className="ri-arrow-drop-left-line" />
        </button>

        {getVisibleNodes(currentNode!, totalPages, VISIBLE_PAGES).map(
          (node) => (
            <button
              key={node.page}
              onClick={() => setCurrentNode(node)}
              className={`px-3 py-1 rounded 
              ${
                currentNode!.page === node.page
                  ? "bg-orange-500 text-white"
                  : "bg-white text-black border"
              }`}
            >
              {node.page}
            </button>
          ),
        )}

        <button
          onClick={() => setCurrentNode(booksList.next(currentNode!))}
          className="px-3 py-1 border rounded"
        >
          <i className="ri-arrow-drop-right-line" />
        </button>
      </div>
    </div>
  );
}
