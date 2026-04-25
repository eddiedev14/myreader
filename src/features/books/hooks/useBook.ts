import { useContext } from "react";
import { BookContext } from "../contexts/BookContext";

export const useBook = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("useBook must be used within a BookProvider");
  }

  return context;
};
