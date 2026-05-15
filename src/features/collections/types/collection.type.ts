import type { Collection } from "../../collections/interfaces/collection.interface";

export type CollectionFormData = Omit<
  Collection,
  "id" | "creatorId" | "createdAt"
>;
