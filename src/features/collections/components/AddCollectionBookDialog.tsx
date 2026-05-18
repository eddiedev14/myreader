import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog";
import { useCollectionDetail } from "../hooks/useCollectionDetail";
import { AddCollectionBookList } from "./AddCollectionBookList";

export const AddCollectionBookDialog = () => {
  const [open, setOpen] = useState(false);
  const { dashboardBooks, handleAddBook } = useCollectionDetail();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Botón */}
      <DialogTrigger asChild>
        <Button>Añadir libro a la colección</Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="max-h-[90vh] flex flex-col w-full max-w-[50vw] ">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>Añadir libro a la colección</DialogTitle>
        </DialogHeader>
        <div className="grid place-items-center">
          <AddCollectionBookList
            books={dashboardBooks}
            onAddBook={handleAddBook}
          />
        </div>

        <div className="pt-4 border-t mt-4">
          <Button onClick={() => setOpen(false)} className="w-full">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
