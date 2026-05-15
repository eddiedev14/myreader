import { ToastContainer } from "react-toastify";
import { AppRouter } from "./router/AppRouter";
import { AuthContextProvider } from "./features/auth/contexts/AuthContext";
import { BookContextProvider } from "./features/books/contexts/BookContext";
import { DashboardContextProvider } from "./features/dashboard/contexts/DashboardContext";
import { CollectionContextProvider } from "./features/dashboard/contexts/CollectionContext";

export const App = () => {
  return (
    <>
      <AuthContextProvider>
        <BookContextProvider>
          <CollectionContextProvider>
            <DashboardContextProvider>
              <ToastContainer />
              <AppRouter />
            </DashboardContextProvider>
          </CollectionContextProvider>
        </BookContextProvider>
      </AuthContextProvider>
    </>
  );
};
