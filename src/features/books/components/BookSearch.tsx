import { useState } from "react";
import { Input } from "@/shared/components/shadcn/input";
import { Button } from "@/shared/components/shadcn/button";

interface Props {
  onSearch: (query: string) => void;
}

export const BookSearch = ({ onSearch }: Props) => {
  const [input, setInput] = useState("");

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Buscar por título o ISBN..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button onClick={() => onSearch(input.trim())}>
        <i className="ri-search-line"></i>
      </Button>
    </div>
  );
};
