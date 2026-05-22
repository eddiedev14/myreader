import type { Timestamp } from "firebase/firestore";
type DateInput = Date | string | Timestamp | null | undefined;

//? Formatear una fecha desde diferentes formatos a un objeto Date de JavaScript
export const formatDate = (value: DateInput): Date | null => {
  if (!value) return null;

  // Firestore Timestamp
  if (typeof value === "object" && "toDate" in value) {
    return value.toDate();
  }

  // Date real
  if (value instanceof Date) {
    return value;
  }

  // string ISO u otros
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
};
