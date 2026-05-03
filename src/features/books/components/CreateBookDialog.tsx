import { useState } from "react";
import { useBook } from "@/features/books/hooks/useBook";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { uploadBookCover } from "../utils/uploadBookCover";

import { Button } from "@/shared/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog";

import { BookGenres } from "../data/BookGenre";
import { toast } from "react-toastify";

export const CreateBookDialog = () => {
  const { createBook } = useBook();
  const { getUserId } = useAuth();

  const [open, setOpen] = useState(false);

  // Estados
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [isbn, setIsbn] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [authors, setAuthors] = useState<string[]>([""]);
  const [genres, setGenres] = useState<(BookGenres | null)[]>([null]);

  // Handlers
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
      let coverUrl = await uploadBookCover(coverFile, userId);

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Botón */}
      <DialogTrigger asChild>
        <Button>Publicar libro</Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="max-h-[90vh] flex flex-col max-w-lg w-full">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>Publicar nuevo libro</DialogTitle>
        </DialogHeader>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto px-1">
          <div className="flex flex-col gap-4 mt-4">
            {/* Título */}
            <div>
              <label className="font-semibold">Título</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded w-full mt-1 box-border"
              />
            </div>

            {/* Sinopsis */}
            <div>
              <label className="font-semibold">Sinopsis</label>
              <textarea
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                className="border p-2 rounded w-full mt-1 box-border"
              />
            </div>

            {/* ISBN */}
            <div>
              <label className="font-semibold">ISBN</label>
              <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                className="border p-2 rounded w-full mt-1 box-border"
              />
            </div>

            {/* Autores */}
            <div>
              <label className="font-semibold">Autores</label>

              {authors.map((author, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Autor ${index + 1}`}
                  value={author}
                  onChange={(e) => handleAuthorChange(index, e.target.value)}
                  className="border p-2 rounded mt-2 w-full box-border"
                />
              ))}
            </div>

            {/* Géneros */}
            <div>
              <label className="font-semibold">
                Géneros (el primero será el principal)
              </label>

              {genres.map((genre, index) => (
                <select
                  key={index}
                  value={genre ?? ""}
                  onChange={(e) =>
                    handleGenreChange(
                      index,
                      e.target.value === ""
                        ? null
                        : (e.target.value as BookGenres),
                    )
                  }
                  className="border p-2 rounded mt-2 w-full box-border"
                >
                  <option value="">Selecciona un género</option>

                  {Object.values(BookGenres).map((genreValue) => (
                    <option key={genreValue} value={genreValue}>
                      {genreValue}
                    </option>
                  ))}
                </select>
              ))}
            </div>

            {/* Portada */}
            <div>
              <label className="font-semibold">Portada</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setCoverFile(file);
                }}
                className="border p-2 rounded w-full mt-1 box-border"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t mt-4">
          <Button onClick={handleSubmit} className="w-full">
            Guardar libro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
