import { useState } from "react";
import { Input } from "@/shared/components/shadcn/input";
import type { Book } from "../interfaces/book.interface";

interface Props {
  suggestions: Book[];
  onSelect: (value: string) => void;
  onChange: (value: string) => void;
}

export const BookSearch = ({ suggestions, onSelect, onChange }: Props) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (value: string) => {
    setInput(value);
    onChange(value);
    setOpen(true);
  };

  const handleSelect = (book: Book) => {
    setInput(book.title);
    onSelect(book.title);
    setOpen(false);
  };

  return (
    <div className="flex gap-2 w-full">
      <div className="relative w-full">
        <Input
          placeholder="Buscar por título o ISBN..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />

        {open && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-10 bg-white border rounded shadow mt-1">
            {suggestions.map((book) => (
              <div
                key={book.id}
                onClick={() => handleSelect(book)}
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
