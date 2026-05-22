import { useContext } from "react";
import { ReadingQueueContext } from "../contexts/ReadingQueueContext";

export const useReadingQueue = () => {
  const context = useContext(ReadingQueueContext);

  if (!context) {
    throw new Error(
      "useReadingQueue must be used within a ReadingQueueProvider",
    );
  }

  return context;
};
