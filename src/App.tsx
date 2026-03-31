import { ToastContainer } from "react-toastify";
import { AppRouter } from "./router/AppRouter";
import { AuthContextProvider } from "./features/auth/contexts/AuthContext";

export const App = () => {
  return (
    <>
      <AuthContextProvider>
        <ToastContainer />
        <AppRouter />
      </AuthContextProvider>
    </>
  );
};
