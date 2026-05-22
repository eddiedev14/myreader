/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode } from "react";
import useAuthState from "../hooks/useAuthState";

interface IProvider {
  children: ReactNode;
}

//* Crear context
export const AuthContext = createContext<null | ReturnType<
  typeof useAuthState
>>(null);

//* Provider
export const AuthContextProvider = ({ children }: IProvider) => {
  //? Llamar al custom hook
  const contextData = useAuthState();

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
