import { useEffect, useMemo, useState } from "react";
import { useRealTimeCollection } from "@/firebase/hooks/useRTCollection";
import { useCollection } from "@/firebase/hooks/useCollection";
import { buildCommentTree } from "../utils/buildCommentTree";
import type { CommentData } from "../types/comment.type";
import type { CommentWithUser } from "../interfaces/comment.interface";
import type { UserDoc } from "@/features/auth/types/user.types";

export const useComments = (bookId?: string) => {
  //* DB Hooks
  const realtime = useRealTimeCollection<CommentData>(`comments/${bookId}`);
  const { getById } = useCollection<UserDoc>("users");

  //* States
  const [commentsWithUsers, setCommentsWithUsers] = useState<CommentWithUser[]>(
    [],
  );

  //* Effects
  useEffect(() => {
    const enrichComments = async () => {
      if (!realtime.results.length) {
        setCommentsWithUsers([]);
        return;
      }

      //? IDs únicos (sin repetidos con SET)
      const uniqueCreatorIds = [
        ...new Set(realtime.results.map((comment) => comment.creatorId)),
      ];

      //? Obtener usuarios
      const users = await Promise.all(
        uniqueCreatorIds.map((id) => getById(id)),
      );

      //? Crear mapa
      const userMap = new Map<string, UserDoc>();

      users.forEach((user) => {
        if (!user) return;
        userMap.set(user.id, user);
      });

      //* Enriquecer comentarios
      const enrichedComments = realtime.results.map((comment) => ({
        ...comment,
        creator: userMap.get(comment.creatorId) ?? null,
      }));

      setCommentsWithUsers(enrichedComments as CommentWithUser[]);
    };

    enrichComments();
  }, [realtime.results]);

  //* UseMemo porque se renderizará varias veces y ello puede costar
  const commentTree = useMemo(() => {
    return buildCommentTree(commentsWithUsers);
  }, [commentsWithUsers]);

  return {
    ...realtime,
    commentTree,
  };
};
