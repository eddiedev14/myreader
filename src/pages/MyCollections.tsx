import { CollectionList } from "@/features/dashboard/components/collections/CollectionList";
import { CreateCollectionDialog } from "@/features/dashboard/components/collections/CreateCollectionDialog";
import { useCollection } from "@/features/dashboard/hooks/collections/useCollection";
import { Header } from "@/shared/components/ui/sections/Header";

export const MyCollections = () => {
  //* Contexts
  const { collections } = useCollection();

  return (
    <>
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
    </>
  );
};
