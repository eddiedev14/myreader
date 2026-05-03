export interface Comment {
  id: string;
  content: string;
  parentId: string | null;
  creatorId: string;
  createdAt: number;
}
