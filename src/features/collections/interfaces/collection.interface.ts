export interface CollectionBook {
  id: string;
  addedAt: string;
}

export interface Collection {
  // Id para firestore
  id: string;

  // Info de la colección
  title: string;
  description: string;
  books: CollectionBook[];

  // Info de creación
  creatorId: string;
  createdAt: number;
}
