import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/shadcn/dialog";
import type { Book } from "../interfaces/book.interface";

interface BookInfoDialogProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookInfoDialog({
  book,
  open,
  onOpenChange,
}: BookInfoDialogProps) {
  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto pr-2 space-y-4">
          <img
            src={book.bookCover}
            alt={book.title}
            className="w-full h-80 object-cover rounded-md"
          />

          <p>
            <strong>Género:</strong> {book.mainGenre}
          </p>
          <p>
            <strong>Autor:</strong> {book.authors.join(", ")}
          </p>
          <p>
            <strong>Descripción:</strong> {book.synopsis}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
