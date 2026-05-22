import type { JSONContent } from "@tiptap/react";

/**
 * Convierte JSONContent a string para guardar en DB
 */
export const serializeEditorContent = (content: JSONContent): string => {
  return JSON.stringify(content);
};

/**
 * Convierte string guardado en DB a JSONContent
 */
export const deserializeEditorContent = (content: string): JSONContent => {
  try {
    return JSON.parse(content);
  } catch {
    return {
      type: "doc",
      content: [],
    };
  }
};
