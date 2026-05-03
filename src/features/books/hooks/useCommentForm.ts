import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useComments } from "./useComments";
import { toast } from "react-toastify";

export const useCommentForm = (parentId: string | null = null) => {
  //* URL params
  const { bookID } = useParams();

  //* Auth
  const { user, getUserId } = useAuth();

  //* Realtime comments
  const { add, isPending } = useComments(bookID);

  //* States
  const [content, setContent] = useState("");

  //* Handlers
  const handleContentChange = (
    e: ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) => {
    setContent(e.target.value);
  };

  //? Agregar un nuevo comentario raíz
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    // Validaciones
    if (!user || !bookID) return;
    if (!content.trim()) {
      toast.error("El contenido del comentario no puede estar vacío.");
    }

    await add({
      content: content.trim(),
      creatorId: getUserId()!,
      parentId,
    });

    toast.success(
      `¡${parentId ? "Respuesta" : "Comentario"} agregado correctamente!`,
    );
    setContent("");
  };

  return {
    content,
    handleContentChange,
    handleSubmit,
    isPending,
  };
};
