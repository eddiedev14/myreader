import { createContext, type ReactNode } from "react";
import { useCollectionState } from "../hooks/useCollectionState";

export type ICollectionContext = ReturnType<typeof useCollectionState>;

interface IProvider {
  children: ReactNode;
}

export const CollectionContext = createContext<ICollectionContext | null>(null);

export const CollectionContextProvider = ({ children }: IProvider) => {
  const contextData = useCollectionState();

  return (
    <CollectionContext.Provider value={contextData}>
      {children}
    </CollectionContext.Provider>
  );
};
