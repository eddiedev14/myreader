import { Button } from "@/shared/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog";

import { BookGenres } from "../data/BookGenre";
import { useCreateBookDialog } from "../hooks/useCreateBookDialog";

export const CreateBookDialog = () => {
  const {
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
  } = useCreateBookDialog();

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
                    <option
                      key={genreValue}
                      value={genreValue}
                      className="capitalize"
                    >
                      {genreValue.replaceAll("_", " ")}
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
