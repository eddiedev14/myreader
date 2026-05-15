import type { Collection } from "../../interfaces/collection.interface";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <div className="w-48 cursor-pointer rounded-lg  p-4 shadow-sm hover:shadow-md transition relative">
      <p className="text-lg font-semibold mb-2">{collection.title}</p>
    </div>
  );
}
