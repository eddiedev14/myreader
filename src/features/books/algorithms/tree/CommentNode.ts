import type { Comment } from "../../interfaces/comment.interface";

export default class CommentNode {
  comment: Comment;
  replies: CommentNode[];

  constructor(comment: Comment) {
    this.comment = comment;
    this.replies = [];
  }

  addChild(node: CommentNode): void {
    this.replies.push(node);
  }
}
