import { useEffect } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import {
  serializeEditorContent,
  deserializeEditorContent,
} from "../utils/editor.utils";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export const useBookNote = () => {
  const { bookID } = useParams();

  const { books, updateBook } = useDashboard();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: "",
  });

  // Cargar nota
  useEffect(() => {
    if (!bookID || !editor) return;

    const currentBook = books.find((book) => book.id === bookID);

    if (currentBook?.note) {
      editor.commands.setContent(
        deserializeEditorContent(currentBook.note.content),
      );
    }
  }, [bookID, books, editor]);

  // Guardar nota
  const saveNote = async () => {
    if (!bookID || !editor) return;

    await updateBook(bookID, {
      note: {
        content: serializeEditorContent(editor.getJSON()),
        updatedAt: new Date(),
      },
    });

    toast.success("Nota guardada correctamente");
  };

  return {
    currentBook: books.find((book) => book.id === bookID),
    editor,
    saveNote,
  };
};
