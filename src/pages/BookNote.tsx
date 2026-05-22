import { EditorContent } from "@tiptap/react";
import { ToolBar } from "../features/notes/components/ToolBar";
import { editorStyles } from "@/features/notes/styles/editorStyles";
import { useBookNote } from "@/features/notes/hooks/useBookNote";
import { Header } from "@/shared/components/ui/sections/Header";
import LibraryIllustration from "@/assets/illustrations/library.svg";
import { Button } from "@/shared/components/shadcn/button";
import { Link } from "react-router-dom";
import { PageLoader } from "@/shared/components/ui/sections/PageLoader";

export const BookNote = () => {
  const { loading, currentBook, editor, saveNote } = useBookNote();

  if (loading) {
    return <PageLoader />;
  }

  // Libro no encontrado en el dashboard
  if (currentBook === null || currentBook === undefined) {
    return (
      <section className="mx-auto flex flex-col items-center gap-4 py-10">
        <img
          src={LibraryIllustration}
          alt="Libro no encontrado"
          className="w-md"
        />

        <h2 className="text-center text-2xl font-bold">Libro no encontrado</h2>

        <p className="max-w-md text-center font-light text-gray-600">
          El libro que intentas consultar no existe en tu dashboard.
        </p>

        <Button asChild size="lg" variant="outline">
          <Link to="/dashboard">Volver al dashboard</Link>
        </Button>
      </section>
    );
  }

  // Lectura no comenzada
  if (
    currentBook?.status !== "EN LECTURA" &&
    currentBook?.status !== "COMPLETADO" &&
    currentBook !== null &&
    currentBook !== undefined
  ) {
    return (
      <section className="mx-auto flex flex-col items-center gap-4 py-10">
        <img
          src={LibraryIllustration}
          alt="Lectura no empezada"
          className="w-md"
        />

        <h2 className="text-center text-2xl font-bold">Lectura no empezada</h2>

        <p className="max-w-md text-center font-light text-gray-600">
          No has comenzado a leer este libro.
        </p>

        <Button asChild size="lg" variant="outline">
          <Link to="/dashboard">Volver al dashboard</Link>
        </Button>
      </section>
    );
  }

  if (!editor) return null;

  const commands = {
    toggleBold: () => editor.chain().focus().toggleBold().run(),
    toggleItalic: () => editor.chain().focus().toggleItalic().run(),
    toggleUnderline: () => editor.chain().focus().toggleUnderline().run(),
    toggleCodeBlock: () => editor.chain().focus().toggleCodeBlock().run(),
    toggleH1: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    toggleH2: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    toggleH3: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    toggleParrafo: () => editor.chain().focus().setParagraph().run(),
    toggleListaOrdenada: () => editor.chain().focus().toggleOrderedList().run(),
    toggleListaPuntos: () => editor.chain().focus().toggleBulletList().run(),
    addLink: () => {
      let url = prompt("Ingresa la URL:");

      if (!url) return;

      if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
      }

      editor.chain().focus().toggleLink({ href: url }).run();
    },

    saveContent: saveNote,
  };

  return (
    <>
      <Header
        title={currentBook?.title || "Nota del libro"}
        paragraph={
          "Lee y edita tus notas acerca de " +
          (currentBook?.title || "este libro")
        }
      />
      <ToolBar commands={commands} editor={editor} />

      <div className="mx-auto mt-2 min-h-[50vh] h-[90vh] w-[80vw] overflow-auto rounded-[5px] bg-white p-5 focus-within:outline-[2px] shadow-[0_5px_5px_rgba(0,0,0,0.08)] border border-gray-100">
        <EditorContent editor={editor} className={editorStyles} />
      </div>
    </>
  );
};
