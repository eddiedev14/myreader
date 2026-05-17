import { createContext, type ReactNode } from "react";
import { useDashboardState } from "../hooks/useDashboardState";

export type IDashboardContext = ReturnType<typeof useDashboardState>;

interface IProvider {
  children: ReactNode;
}

export const DashboardContext = createContext<IDashboardContext | null>(null);

export const DashboardContextProvider = ({ children }: IProvider) => {
  const contextData = useDashboardState();

  return (
    <DashboardContext.Provider value={contextData}>
      {children}
    </DashboardContext.Provider>
  );
};
