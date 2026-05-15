import type { Collection } from "../interfaces/collection.interface";

export type CollectionFormData = Omit<
  Collection,
  "id" | "creatorId" | "createdAt"
>;
