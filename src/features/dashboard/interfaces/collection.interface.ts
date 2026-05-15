export interface Collection {
  // Id para firestore
  id: string;

  // Info de la colección
  title: string;

  // Info de creación
  creatorId: string;
  createdAt: number;
}
