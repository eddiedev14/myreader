import { useState } from "react";
import type CommentNode from "../algorithms/tree/CommentNode";

import { ProfilePhoto } from "@/shared/components/ui/user/ProfilePhoto";
import { Button } from "@/shared/components/shadcn/button";

import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { formatRelativeTime } from "../utils/utils";

interface CommentCardProps {
  node: CommentNode;
}

export const CommentCard = ({ node }: CommentCardProps) => {
  //* States
  const [showReplyForm, setShowReplyForm] = useState(false);

  //* Destructuring
  const { comment, replies } = node;

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      {/* Comentario */}
      <div className="flex gap-3">
        <ProfilePhoto anotherUser={comment.creator} />

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold">
              {comment.creator?.username}
            </h4>

            <span className="text-xs text-gray-500">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>

          {/* Contenido */}
          <p className="mt-1 text-sm text-gray-800 whitespace-pre-wrap">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="mt-2 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(true)}
            >
              Responder
            </Button>
            {showReplyForm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplyForm(false)}
              >
                Cancelar
              </Button>
            )}
          </div>

          {/* Formulario respuesta */}
          <div className={showReplyForm ? "block" : "hidden"}>
            <CommentForm isReply parentId={comment.id} />
          </div>
        </div>
      </div>

      {/* Respuestas */}
      {replies.length > 0 && (
        <div className="ml-10 border-l border-gray-200 pl-4">
          <CommentList comments={replies} />
        </div>
      )}
    </div>
  );
};
