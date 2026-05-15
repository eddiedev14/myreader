import { createContext, type ReactNode } from "react";
import { useReadingQueueState } from "../hooks/useReadingQueueState";

export type IReadingQueueContext = ReturnType<typeof useReadingQueueState>;

interface IProvider {
    children: ReactNode;
}

export const ReadingQueueContext = createContext<IReadingQueueContext | null>(null);

export const ReadingQueueContextProvider = ({ children }: IProvider) => {
    const contextData = useReadingQueueState();

    return (
        <ReadingQueueContext.Provider value={contextData}>
            {children}
        </ReadingQueueContext.Provider>
    );
};
