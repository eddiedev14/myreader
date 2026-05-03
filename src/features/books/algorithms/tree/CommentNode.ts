import type { IComment } from "../../interfaces/comment.interface";

export default class CommentNode {
  comment: IComment;
  replies: CommentNode[];

  constructor(comment: IComment) {
    this.comment = comment;
    this.replies = [];
  }

  addChild(node: CommentNode): void {
    this.replies.push(node);
  }
}
