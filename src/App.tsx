import { ToastContainer } from "react-toastify";
import { AppRouter } from "./router/AppRouter";
import { AuthContextProvider } from "./features/auth/contexts/AuthContext";
import { BookContextProvider } from "./features/books/contexts/BookContext";

export const App = () => {
  return (
    <>
      <AuthContextProvider>
        <BookContextProvider>
          <ToastContainer />
          <AppRouter />
        </BookContextProvider>
      </AuthContextProvider>
    </>
  );
};
