import { Input } from "@/shared/components/shadcn/input";
import type { Book } from "../interfaces/book.interface";

interface Props {
  suggestions: Book[];
  input: string;
  open: boolean;
  onChange: (value: string) => void;
  onSelect: (book: Book) => void;
}

export const BookSearch = ({
  suggestions,
  input,
  open,
  onChange,
  onSelect,
}: Props) => {
  return (
    <div className="flex gap-2 w-full">
      <div className="relative w-full">
        <Input
          placeholder="Buscar por título o ISBN..."
          value={input}
          onChange={(e) => onChange(e.target.value)}
        />

        {open && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-10 bg-white border rounded shadow mt-1">
            {suggestions.map((book) => (
              <div
                key={book.id}
                onClick={() => onSelect(book)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {book.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
