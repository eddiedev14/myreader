import { Header } from "@/shared/components/ui/sections/Header";
import { useCollection } from "@/features/collections/hooks/useCollection";
import { CreateCollectionDialog } from "@/features/collections/components/CreateCollectionDialog";
import { CollectionList } from "@/features/collections/components/CollectionList";

export const MyCollections = () => {
  //* Contexts
  const { collections } = useCollection();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <Header
          title="Explora tus colecciones"
          paragraph="Crea colecciones personalizadas de libros y toma apuntes fácilmente"
        />
        <div className="mt-2">
          <CreateCollectionDialog />
        </div>
      </div>
      <CollectionList collections={collections} />
    </div>
  );
};
