import type { CommentWithUser } from "../../interfaces/comment.interface";

export default class CommentNode {
  comment: CommentWithUser;
  replies: CommentNode[];

  constructor(comment: CommentWithUser) {
    this.comment = comment;
    this.replies = [];
  }

  addChild(node: CommentNode): void {
    this.replies.push(node);
  }
}
