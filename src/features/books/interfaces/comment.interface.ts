import type { UserDoc } from "@/features/auth/types/user.types";

export interface Comment {
  id: string;
  content: string;
  parentId: string | null;
  creatorId: string;
  createdAt: number;
}

export interface CommentWithUser extends Comment {
  creator: UserDoc | null;
}
