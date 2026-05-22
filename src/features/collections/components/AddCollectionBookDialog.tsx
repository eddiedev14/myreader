import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/shared/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog";
import { useCollectionDetail } from "../hooks/useCollectionDetail";
import { BookList } from "@/features/books/components/BookList";
import { BookSearch } from "@/features/books/components/BookSearch";
import { useDashboardBookSearch } from "@/features/dashboard/hooks/useDashboardBookSearch";
import { COLLECTION_PAGE_SIZE } from "@/features/collections/constants/collection.constants";

export const AddCollectionBookDialog = () => {
  const [open, setOpen] = useState(false);
  const { dashboardBooks, handleAddBook, collection } = useCollectionDetail();
  const {
    query,
    open: searchOpen,
    results,
    suggestions,
    handleChange,
    setOpen: setSearchOpen,
  } = useDashboardBookSearch();

  const disabledAddBookIds = collection?.books?.map((book) => book.id) ?? [];

  const handleAddCollectionBook = async (bookId: string) => {
    await handleAddBook(bookId);
    toast.success("Libro agregado a la colección");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Botón */}
      <DialogTrigger asChild>
        <Button>Añadir libro a la colección</Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="max-h-[95vh] flex flex-col w-[min(95vw,1040px)] min-w-[360px] max-w-[1040px] overflow-auto">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>Añadir libro a la colección</DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          <BookSearch
            suggestions={suggestions as any}
            input={query}
            open={searchOpen}
            onChange={handleChange}
            onSelect={async (book: any) => {
              await handleAddCollectionBook(book.id);
              setOpen(false);
              setSearchOpen(false);
            }}
          />
        </div>

        <div className="grid place-items-center">
          <BookList
            books={query ? results : dashboardBooks}
            pageSize={COLLECTION_PAGE_SIZE}
            listClassName="grid place-items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            cardProps={{
              onAdd: handleAddCollectionBook,
              showRemoveButton: false,
            }}
            disabledAddBookIds={disabledAddBookIds}
          />
        </div>

        <div className="pt-4 border-t mt-4">
          <Button
            onClick={() => setOpen(false)}
            className="w-full hover:scale-100"
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
