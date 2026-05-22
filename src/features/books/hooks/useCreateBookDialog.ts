import { useAuth } from "@/features/auth/hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import { BookGenres } from "../data/BookGenre";
import { uploadBookCover } from "../utils/uploadBookCover";
import { useBook } from "./useBook";

export const useCreateBookDialog = () => {
  const { createBook } = useBook();
  const { getUserId } = useAuth();

  // * States
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [isbn, setIsbn] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [authors, setAuthors] = useState<string[]>([""]);
  const [genres, setGenres] = useState<(BookGenres | null)[]>([null]);

  // * Handlers
  const handleAuthorChange = (index: number, value: string) => {
    const updated = [...authors];
    updated[index] = value;

    if (index === authors.length - 1 && value.trim() !== "") {
      updated.push("");
    }

    setAuthors(updated);
  };

  const handleGenreChange = (index: number, value: BookGenres | null) => {
    const updated = [...genres];
    updated[index] = value;

    if (index === genres.length - 1 && value !== null) {
      updated.push(null);
    }

    setGenres(updated);
  };

  // Submit
  const handleSubmit = async () => {
    const validAuthors = authors.filter((a) => a.trim() !== "");

    const rawGenres = genres.filter((g): g is BookGenres => g !== null);

    // eliminar duplicados
    const validGenres = Array.from(new Set(rawGenres));

    // Validaciones básicas (no sé si podría separar un poco la logica)
    if (!title.trim()) {
      toast.error("El título es obligatorio");
      return;
    }

    if (!synopsis.trim()) {
      toast.error("La sinopsis es obligatoria");
      return;
    }

    if (!isbn.trim()) {
      toast.error("El ISBN es obligatorio");
      return;
    }

    if (validAuthors.length === 0) {
      toast.error("Debes agregar al menos un autor");
      return;
    }

    if (validGenres.length === 0) {
      toast.error("Debes seleccionar al menos un género");
      return;
    }

    if (!coverFile) {
      toast.error("La portada es obligatoria");
      return;
    }

    try {
      const userId = getUserId();

      if (!userId) {
        toast.error("Usuario no autenticado");
        return;
      }
      const coverUrl = await uploadBookCover(coverFile, userId);

      // Crear libro
      const error = await createBook({
        title,
        synopsis,
        authors: validAuthors,
        bookCover: coverUrl,
        ISBN: isbn,
        mainGenre: validGenres[0],
        genres: validGenres,
      });

      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Libro publicado correctamente");

      setTitle("");
      setSynopsis("");
      setIsbn("");
      setCoverFile(null);
      setAuthors([""]);
      setGenres([null]);

      setOpen(false);
    } catch (error) {
      console.error("Error creating book:", error);
      toast.error("Ocurrió un error al publicar el libro");
    }
  };

  return {
    open,
    title,
    synopsis,
    isbn,
    authors,
    genres,

    setOpen,
    setTitle,
    setSynopsis,
    setIsbn,
    setCoverFile,
    handleAuthorChange,
    handleGenreChange,
    handleSubmit,
  };
};
