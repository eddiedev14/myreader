import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { ToolBar } from "../features/notes/components/ToolBar";
import { editorStyles } from "@/features/notes/styles/editorStyles";

export const BookNote = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: "<p>Hello World!</p>",
  });

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

      // Agrega https:// automáticamente
      if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
      }

      editor.chain().focus().toggleLink({ href: url }).run();
    },
    saveContent: () => {
      console.log(editor.getHTML());
      alert("Contenido disponible en consola");
    },
  };

  return (
    <>
      <ToolBar commands={commands} editor={editor} />
      <div className="w-[80vw] max-w-[1000px] h-[90vh] overflow-auto mx-auto mt-[80px] p-5 bg-white rounded-[5px] min-h-[50vh] z-[8] focus-within:outline-[2px] ">
        <EditorContent editor={editor} className={editorStyles} />
      </div>
    </>
  );
};
