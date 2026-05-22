import { useCollectionCard } from "../hooks/useCollectionCard";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import type { BookDashboard } from "@/features/dashboard/interfaces/book.interface";
import type { Collection } from "../interfaces/collection.interface";

interface CollectionCardProps {
  collection: Collection;
}

export const CollectionCard = ({ collection }: CollectionCardProps) => {
  const { handleNavigateCollection } = useCollectionCard(collection);
  const { books: dashboardBooks } = useDashboard();

  const coverBooks = collection.books
    .map((collectionBook) =>
      dashboardBooks.find(
        (dashboardBook) => dashboardBook.id === collectionBook.id,
      ),
    )
    .filter((book): book is BookDashboard => Boolean(book));

  const displayedBooks = coverBooks.slice(0, 4);
  const placeholderCount = Math.max(0, 4 - displayedBooks.length);

  return (
    <div
      className="w-48 cursor-pointer rounded-lg p-4 shadow-sm hover:shadow-md transition relative"
      onClick={handleNavigateCollection}
    >
      {collection.books.length > 0 && (
        <div className="mb-3">
          {collection.books.length === 1 ? (
            displayedBooks[0] ? (
              <img
                src={displayedBooks[0].bookCover}
                alt={displayedBooks[0].title}
                className="w-full h-49 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-49 rounded-md border border-dashed border-gray-300 bg-gray-100 flex items-center justify-center text-5xl text-gray-400">
                +
              </div>
            )
          ) : (
            <div className="grid grid-cols-2 gap-1">
              {displayedBooks.map((book) => (
                <img
                  key={book.id}
                  src={book.bookCover}
                  alt={book.title}
                  className="w-full h-24 object-cover rounded-md"
                />
              ))}
              {Array.from({ length: placeholderCount }, (_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="w-full h-24 rounded-md border border-dashed border-gray-300 bg-gray-100 flex items-center justify-center text-3xl text-gray-400"
                >
                  +
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <p className="text-lg font-semibold mb-2">{collection.title}</p>
    </div>
  );
};
