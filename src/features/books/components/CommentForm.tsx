import { Button } from "@/shared/components/shadcn/button";
import { ProfilePhoto } from "@/shared/components/ui/user/ProfilePhoto";
import { useCommentForm } from "../hooks/useCommentForm";

interface CommentFormProps {
  isReply?: boolean;
  parentId?: string | null;
}

export const CommentForm = ({
  isReply = false,
  parentId = null,
}: CommentFormProps) => {
  const { content, handleContentChange, handleSubmit, isPending } =
    useCommentForm(parentId);

  return (
    <div
      onSubmit={handleSubmit}
      className="grid grid-cols-[auto_1fr] mt-4 gap-4"
    >
      <ProfilePhoto />
      <form className="max-w-lg *:w-full">
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder={
            isReply
              ? "Escribe una respuesta..."
              : "Comparte tu opinión del libro..."
          }
          className="text-sm font-light border-b border-b-gry-700 outline-0 resize-none field-sizing-content"
        ></textarea>
        <div className="mt-2 flex justify-end gap-2">
          <Button type="submit" size="sm" disabled={isPending}>
            {isReply ? "Responder" : "Comentar"}
          </Button>
        </div>
      </form>
    </div>
  );
};
