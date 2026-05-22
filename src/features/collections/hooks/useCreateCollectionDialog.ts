import { useAuth } from "@/features/auth/hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCollection } from "./useCollection";

export const useCreateCollectionDialog = () => {
  const { createCollection } = useCollection();
  const { getUserId } = useAuth();

  // * States
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // * Handlers

  // Submit
  const handleSubmit = async () => {
    // Validaciones básicas
    if (!title.trim()) {
      toast.error("El título es obligatorio");
      return;
    }

    try {
      const userId = getUserId();

      if (!userId) {
        toast.error("Usuario no autenticado");
        return;
      }
      // Crear colección
      const error = await createCollection({
        title,
        description,
        books: [],
      });

      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Colección publicada correctamente");

      setTitle("");
      setDescription("");

      setOpen(false);
    } catch (error) {
      console.error("Error creating collection:", error);
      toast.error("Ocurrió un error al publicar la colección");
    }
  };

  return {
    open,
    title,
    description,
    setOpen,
    setTitle,
    setDescription,
    handleSubmit,
  };
};
