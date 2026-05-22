import { Button } from "@/shared/components/shadcn/button";

interface ToolBarProps {
  commands: Record<string, () => void>;
  editor: any;
}

const baseButtonClass = `
  h-9
  min-w-9
  px-2
  rounded-lg
  flex
  items-center
  justify-center
  transition-all
  duration-200
  text-gray-700
  hover:bg-blue-100
  hover:text-blue-600
`;

const activeButtonClass = `
  bg-blue-500
  text-white
  hover:bg-blue-500
  hover:text-white
`;

export const ToolBar = ({ commands, editor }: ToolBarProps) => {
  if (!editor) return null;

  const isActive = (name: string, attrs: Record<string, any> = {}) =>
    editor.isActive(name, attrs);

  const getButtonClass = (name: string, attrs: Record<string, any> = {}) =>
    `${baseButtonClass} ${isActive(name, attrs) ? activeButtonClass : ""}`;

  return (
    <div className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        {/* LEFT */}
        <div className="flex items-center gap-1">
          {/* Bold */}
          <Button
            variant="secondary"
            onClick={commands.toggleBold}
            className={getButtonClass("bold")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z" />
            </svg>
          </Button>

          {/* Italic */}
          <Button
            variant="secondary"
            onClick={commands.toggleItalic}
            className={getButtonClass("italic")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z" />
            </svg>
          </Button>

          {/* Underline */}
          <Button
            variant="secondary"
            onClick={commands.toggleUnderline}
            className={getButtonClass("underline")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M8 3V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V3H18V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V3H8ZM4 20H20V22H4V20Z" />
            </svg>
          </Button>

          <div className="mx-1 h-6 w-px bg-gray-200" />

          {/* H1 */}
          <Button
            variant="secondary"
            onClick={commands.toggleH1}
            className={getButtonClass("heading", { level: 1 })}
          >
            <span className="text-xs font-bold">H1</span>
          </Button>

          {/* H2 */}
          <Button
            variant="secondary"
            onClick={commands.toggleH2}
            className={getButtonClass("heading", { level: 2 })}
          >
            <span className="text-xs font-bold">H2</span>
          </Button>

          {/* H3 */}
          <Button
            variant="secondary"
            onClick={commands.toggleH3}
            className={getButtonClass("heading", { level: 3 })}
          >
            <span className="text-xs font-bold">H3</span>
          </Button>

          <div className="mx-1 h-6 w-px bg-gray-200" />

          {/* Ordered List */}
          <Button
            variant="secondary"
            onClick={commands.toggleListaOrdenada}
            className={getButtonClass("orderedList")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M8 4H21V6H8V4ZM5 3V6H6V7H3V6H4V4H3V3H5ZM3 14V11.5H5V11H3V10H6V12.5H4V13H6V14H3ZM5 19.5H3V18.5H5V18H3V17H6V21H3V20H5V19.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z" />
            </svg>
          </Button>

          {/* Bullet List */}
          <Button
            variant="secondary"
            onClick={commands.toggleListaPuntos}
            className={getButtonClass("bulletList")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z" />
            </svg>
          </Button>

          {/* Link */}
          <Button
            variant="secondary"
            onClick={commands.addLink}
            className={getButtonClass("link")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M18.364 5.636a5 5 0 0 0-7.071 0l-1.414 1.414 1.414 1.414 1.414-1.414a3 3 0 1 1 4.243 4.243l-1.414 1.414 1.414 1.414 1.414-1.414a5 5 0 0 0 0-7.071ZM14.121 9.879 9.88 14.12l-1.415-1.414 4.243-4.243 1.414 1.414ZM5.636 18.364a5 5 0 0 0 7.071 0l1.414-1.414-1.414-1.414-1.414 1.414a3 3 0 1 1-4.243-4.243l1.414-1.414-1.414-1.414-1.414 1.414a5 5 0 0 0 0 7.071Z" />
            </svg>
          </Button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center">
          <Button
            variant="secondary"
            onClick={commands.saveContent}
            className="h-9 px-4 rounded-lg bg-blue-500 text-white text-sm font-medium transition-colors hover:bg-blue-600"
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};
