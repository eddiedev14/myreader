import { useComments } from "./useComments";
import type CommentNode from "../algorithms/tree/CommentNode";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const useDeleteComment = (bookId?: string) => {
  //* Custom hooks
  const { removeNode } = useComments(bookId);

  const deleteCommentTree = async (node: CommentNode) => {
    const idsToDelete = node.getAllIds();
    await Promise.all(idsToDelete.map((id) => removeNode(id)));
  };

  const handleDelete = async (node: CommentNode) => {
    Swal.fire({
      title: "¿Deseas eliminar este comentario?",
      text: "Este comentario y todas sus respuestas serán eliminados. ¿Deseas continuar?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#E52F1E",
      cancelButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCommentTree(node);
        toast.success("Comentario eliminado correctamente.");
      }
    });
  };

  return {
    handleDelete,
  };
};
