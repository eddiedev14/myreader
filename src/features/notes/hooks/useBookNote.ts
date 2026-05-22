import { useEffect, useState } from "react";
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
  //* URL Params
  const { bookID } = useParams();

  //* Context
  const { books, updateBook } = useDashboard();

  const [loading, setLoading] = useState(true);

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
    const loadNote = async () => {
      try {
        if (!bookID || !editor) return;
        setLoading(true);
        const currentBook = books.find((book) => book.id === bookID);
        if (currentBook?.note) {
          editor.commands.setContent(
            deserializeEditorContent(currentBook.note.content),
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadNote();
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
    loading,
    saveNote,
  };
};
