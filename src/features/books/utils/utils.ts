import type { Book } from "../interfaces/book.interface";
import type { BookDashboard } from "@/features/dashboard/interfaces/book.interface";

type PaginationNode = {
  page: number;
  next: PaginationNode | null;
  prev: PaginationNode | null;
};

export function getVisibleNodes<T extends PaginationNode>(
  current: T,
  totalPages: number,
  maxVisible: number,
): T[] {
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
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  const pages: T[] = [];
  let node: T | null = current;

  // Buscar el nodo inicial
  while (node && node.page !== start) {
    node = node.prev as T;
  }

  // Recorrer desde start hasta end
  for (let i = start; i <= end; i++) {
    pages.push(node!);
    node = node!.next as T;
  }

  return pages;
}

export const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return "hace unos segundos";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `hace ${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `hace ${hours} h`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `hace ${days} día${days > 1 ? "s" : ""}`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `hace ${weeks} semana${weeks > 1 ? "s" : ""}`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `hace ${months} mes${months > 1 ? "es" : ""}`;
  }

  const years = Math.floor(days / 365);
  return `hace ${years} año${years > 1 ? "s" : ""}`;
};

export function hasState(book: Book | BookDashboard): book is BookDashboard {
  return "status" in book;
}
