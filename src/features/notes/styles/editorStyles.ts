export const editorStyles = `
  min-h-[70vh]
  focus:outline-none

  [&_.ProseMirror]:outline-none
  [&_.ProseMirror]:min-h-[70vh]

  [&_.ProseMirror_h1]:text-4xl
  [&_.ProseMirror_h1]:font-bold
  [&_.ProseMirror_h1]:mb-4

  [&_.ProseMirror_h2]:text-3xl
  [&_.ProseMirror_h2]:font-bold
  [&_.ProseMirror_h2]:mb-3

  [&_.ProseMirror_h3]:text-2xl
  [&_.ProseMirror_h3]:font-bold
  [&_.ProseMirror_h3]:mb-2

  [&_.ProseMirror_p]:mb-3

  [&_.ProseMirror_strong]:font-bold
  [&_.ProseMirror_em]:italic
  [&_.ProseMirror_u]:underline

  [&_.ProseMirror_ul]:list-disc
  [&_.ProseMirror_ul]:ml-6

  [&_.ProseMirror_ol]:list-decimal
  [&_.ProseMirror_ol]:ml-6

  [&_.ProseMirror_li]:mb-1

  [&_.ProseMirror_pre]:bg-black
  [&_.ProseMirror_pre]:text-white
  [&_.ProseMirror_pre]:p-4
  [&_.ProseMirror_pre]:rounded-lg
  [&_.ProseMirror_pre]:overflow-x-auto

  [&_.ProseMirror_code]:bg-gray-200
  [&_.ProseMirror_code]:px-1
  [&_.ProseMirror_code]:py-[2px]
  [&_.ProseMirror_code]:rounded

  [&_.ProseMirror_a]:text-blue-600
  [&_.ProseMirror_a]:underline

  [&_.ProseMirror_img]:rounded-lg
  [&_.ProseMirror_img]:max-w-full
`;
