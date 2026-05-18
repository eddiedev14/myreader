import { useCollectionCard } from "../hooks/useCollectionCard";
import type { Collection } from "../interfaces/collection.interface";

interface CollectionCardProps {
  collection: Collection;
}

export const CollectionCard = ({ collection }: CollectionCardProps) => {
  const { handleNavigateCollection } = useCollectionCard(collection);

  return (
    <div
      className="w-48 cursor-pointer rounded-lg  p-4 shadow-sm hover:shadow-md transition relative"
      onClick={handleNavigateCollection}
    >
      <p className="text-lg font-semibold mb-2">{collection.title}</p>
    </div>
  );
};
