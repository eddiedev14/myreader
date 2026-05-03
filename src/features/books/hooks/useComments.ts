import { useRealTimeCollection } from "@/firebase/hooks/useRTCollection";
import type { CommentData } from "../types/comment.type";

export const useComments = (bookId?: string) => {
  const realtime = useRealTimeCollection<CommentData>(`comments/${bookId}`);
  return realtime;
};
