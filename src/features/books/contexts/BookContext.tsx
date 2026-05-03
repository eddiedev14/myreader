import { createContext, type ReactNode } from "react";
import { useBookState } from "../hooks/useBookState";

export type IBookContext = ReturnType<typeof useBookState>;

interface IProvider {
  children: ReactNode;
}

export const BookContext = createContext<IBookContext | null>(null);

export const BookContextProvider = ({ children }: IProvider) => {
  const contextData = useBookState();

  return (
    <BookContext.Provider value={contextData}>{children}</BookContext.Provider>
  );
};
