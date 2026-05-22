import CommentNode from "../algorithms/tree/CommentNode";
import type { CommentWithUser } from "../interfaces/comment.interface";

export const buildCommentTree = (
  comments: CommentWithUser[],
): CommentNode[] => {
  const nodeMap = new Map<string, CommentNode>();
  const roots: CommentNode[] = [];

  //* 1. Crear nodos
  comments.forEach((comment) => {
    nodeMap.set(comment.id, new CommentNode(comment));
  });

  //* 2. Construir jerarquía
  comments.forEach((comment) => {
    const node = nodeMap.get(comment.id);

    if (!node) return;

    //? Comentario raíz
    if (!comment.parentId) {
      roots.push(node);
      return;
    }

    //? Buscar padre
    const parentNode = nodeMap.get(comment.parentId);

    //? Si existe padre, agregar respuesta
    if (parentNode) {
      parentNode.addChild(node);
    }
  });

  return roots;
};
