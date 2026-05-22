import type CommentNode from "../algorithms/tree/CommentNode";
import { CommentCard } from "./CommentCard";

interface CommentListProps {
  comments: CommentNode[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="mt-6 flex flex-col gap-6">
      {comments.map((commentNode) => (
        <CommentCard key={commentNode.comment.id} node={commentNode} />
      ))}
    </div>
  );
};
