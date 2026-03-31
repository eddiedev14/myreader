import { ToastContainer } from "react-toastify";
import { AppRouter } from "./router/AppRouter";

export const App = () => {
  return (
    <>
      <ToastContainer />
      <AppRouter />
    </>
  );
};
