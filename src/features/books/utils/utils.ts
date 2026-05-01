import Node from "../algorithms/doubleCircularLinkedList/Node";

function getVisibleNodes(
  current: Node,
  totalPages: number,
  maxVisible: number,
): Node[] {
  const half = Math.floor(maxVisible / 2);

  let start = current.page - half;
  let end = current.page + half;

  // Ajustar a que el recorrido empiece en el 1 si el nodo actual está cerca del inicio
  if (start < 1) {
    start = 1;
    end = Math.min(totalPages, start + maxVisible - 1);
  }

  // Ajustar a que el recorrido termine en totalPages si el nodo actual está cerca del final
  if (end > totalPages) {
    end = totalPages - 1;
    start = Math.max(1, end - maxVisible + 1);
  }

  const pages: Node[] = [];
  let node: Node | null = current;

  // Buscar el nodo inicial
  while (node && node.page !== start) {
    node = node.prev!;
  }

  // Recorrer desde start hasta end
  for (let i = start; i <= end; i++) {
    pages.push(node!);
    node = node!.next!;
  }

  return pages;
}

export default getVisibleNodes;
