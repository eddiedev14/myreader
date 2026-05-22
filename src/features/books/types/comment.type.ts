import type { Comment } from "../interfaces/comment.interface";

export type CommentData = Omit<Comment, "id" | "createdAt">;
