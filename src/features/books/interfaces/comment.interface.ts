export interface Comment {
  // Id para firestore
  id: string;

  // Info del comentario
  title: string;
  content: string;
  parentId: string | null;

  // Info de creación
  creatorId: string;
  createdAt: number;
}
