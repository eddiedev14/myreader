import { ToastContainer } from "react-toastify";
import { AppRouter } from "./router/AppRouter";
import { AuthContextProvider } from "./features/auth/contexts/AuthContext";
import { BookContextProvider } from "./features/books/contexts/BookContext";
import { DashboardContextProvider } from "./features/dashboard/contexts/DashboardContext";
import { ReadingQueueContextProvider } from "./features/readingQueue/contexts/ReadingQueueContext";
import { CollectionContextProvider } from "./features/collections/contexts/CollectionContext";
import { Analytics } from "@vercel/analytics/react"

export const App = () => {
  return (
    <>
      <Analytics />

      <AuthContextProvider>
        <BookContextProvider>
          <CollectionContextProvider>
            <DashboardContextProvider>
              <ReadingQueueContextProvider>
                <ToastContainer />
                <AppRouter />
              </ReadingQueueContextProvider>
            </DashboardContextProvider>
          </CollectionContextProvider>
        </BookContextProvider>
      </AuthContextProvider>
    </>
  );
};
