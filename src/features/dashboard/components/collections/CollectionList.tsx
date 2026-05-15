import { useState, useMemo, useEffect } from "react";
import { CollectionCard } from "./CollectionCard";
import DoubleCircularLinkedList from "../../algorithms/doubleCircularLinkedList/DoubleCircularLinkedList";
import { getVisibleNodes } from "../../../books/utils/utils";
import { PAGE_SIZE, VISIBLE_PAGES } from "../../constants/collection.constants";
import type { Collection } from "../../interfaces/collection.interface";

interface Props {
  collections?: Collection[];
}

export function CollectionList({ collections = [] }: Props) {
  const collectionsList = useMemo(
    () => new DoubleCircularLinkedList(collections),
    [collections],
  );
  const [currentPage, setCurrentPage] = useState(1);

  const currentNode = useMemo(() => {
    return collectionsList.getNode(currentPage);
  }, [collectionsList, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [collections]);

  if (!collections.length) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No hay colecciones disponibles</p>
      </div>
    );
  }

  if (!currentNode) return null;

  const totalPages = Math.ceil(collections.length / PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {currentNode.collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
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
