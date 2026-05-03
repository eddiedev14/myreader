import { Button } from "@/shared/components/shadcn/button";
import { ProfilePhoto } from "@/shared/components/ui/user/ProfilePhoto";

interface CommentFormProps {
  isReply: boolean;
}

export const CommentForm = ({ isReply = false }: CommentFormProps) => {
  return (
    <div className="grid grid-cols-[auto_1fr] mt-4 gap-4">
      <ProfilePhoto />
      <form className="max-w-lg *:w-full">
        <textarea className="text-sm font-light border-b border-b-gry-700 outline-0 resize-none field-sizing-content"></textarea>
        <div className="mt-2 flex justify-end gap-2">
          <Button type="submit" size="sm">
            {isReply ? "Responder" : "Comentar"}
          </Button>
        </div>
      </form>
    </div>
  );
};
