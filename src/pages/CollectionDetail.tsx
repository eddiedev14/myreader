import { AddCollectionBookDialog } from "@/features/collections/components/AddCollectionBookDialog";
import { BookList } from "@/features/books/components/BookList";
import { useCollectionDetail } from "@/features/collections/hooks/useCollectionDetail";
import { Button } from "@/shared/components/shadcn/button";
import { Header } from "@/shared/components/ui/sections/Header";
import { PageLoader } from "@/shared/components/ui/sections/PageLoader";
import { Link } from "react-router-dom";
import LibraryIllustration from "../assets/illustrations/library.svg";

export const CollectionDetail = () => {
  const {
    loading,
    collection,
    isAuthorized,
    getCollectionBooks,
    handleRemoveBook,
  } = useCollectionDetail();

  if (loading) {
    return <PageLoader />;
  }

  if (!isAuthorized) {
    return (
      <section className="mx-auto flex flex-col gap-4">
        <img
          src={LibraryIllustration}
          alt="Library Illustration"
          className="w-md"
        />
        <h2 className="text-center text-2xl font-bold">Acceso denegado</h2>
        <p className="text-center font-light">
          No tienes permisos para ver esta colección.
        </p>
        <Button asChild size="lg" variant="outline">
          <Link to="/my-collections">Regresar a tus colecciones</Link>
        </Button>
      </section>
    );
  }

  if (!collection) {
    return (
      <section className="mx-auto flex flex-col gap-4">
        <img
          src={LibraryIllustration}
          alt="Library Illustration"
          className="w-md"
        />
        <h2 className="text-center text-2xl font-bold">
          ¡Colección no encontrada!
        </h2>
        <p className="text-center font-light">
          Asegurate de escribir un ID de colección correcto
        </p>
        <Button asChild size="lg" variant="outline">
          <Link to="/my-collections">Regresar a tus colecciones</Link>
        </Button>
      </section>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <Header
            title={collection?.title || "desconocida"}
            paragraph={collection?.description || "desconocida"}
          />

          <div className="mt-4">
            <AddCollectionBookDialog />
          </div>
        </div>
        <BookList
          books={getCollectionBooks()}
          cardProps={{ onRemove: handleRemoveBook, showRemoveButton: true }}
        />
      </div>
    </>
  );
};
