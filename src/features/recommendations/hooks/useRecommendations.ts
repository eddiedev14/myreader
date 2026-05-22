import { useMemo } from "react";
import Graph from "../algorithms/Graph";
import { useBook } from "@/features/books/hooks/useBook";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import type { Book } from "@/features/books/interfaces/book.interface";

export const useRecommendations = () => {
  //* Contexts
  const { books, loading: booksLoading } = useBook();
  const { books: dashboardBooks, loading: dashboardLoading } = useDashboard();

  //* Memo
  const recommendations = useMemo(() => {
    if (!books.length || !dashboardBooks.length) {
      return {
        authorRecommendations: [],
        genreRecommendations: [],
      };
    }

    //* Crear grafo
    const graph = new Graph();

    //* Añadir todos los libros
    books.forEach((book) => {
      graph.addBook(book);
    });

    //* Construir conexiones
    graph.buildConnections();

    //* IDs de libros ya añadidos por el usuario
    const dashboardBookIds = new Set(dashboardBooks.map((book) => book.id));

    //* Sets para evitar duplicados
    const authorRecommendationsMap = new Map<string, Book>();
    const genreRecommendationsMap = new Map<string, Book>();

    //* Generar recomendaciones
    dashboardBooks.forEach((dashboardBook) => {
      //* Buscar libro completo en catálogo global
      const fullBook = books.find((book) => book.id === dashboardBook.id);
      if (!fullBook) return;

      //* Recomendaciones por autor
      const authorRecommendations = graph.getAuthorRecommendations(fullBook);

      authorRecommendations.forEach((recommendedBook) => {
        //* Evitar recomendar libros ya agregados
        if (dashboardBookIds.has(recommendedBook.id)) return;
        authorRecommendationsMap.set(recommendedBook.id, recommendedBook);
      });

      //* Recomendaciones por género
      const genreRecommendations = graph.getGenreRecommendations(fullBook);

      genreRecommendations.forEach((recommendedBook) => {
        //* Evitar recomendar libros ya agregados
        if (dashboardBookIds.has(recommendedBook.id)) return;
        genreRecommendationsMap.set(recommendedBook.id, recommendedBook);
      });
    });

    return {
      authorRecommendations: Array.from(authorRecommendationsMap.values()),
      genreRecommendations: Array.from(genreRecommendationsMap.values()),
    };
  }, [books, dashboardBooks]);

  return {
    authorRecommendations: recommendations.authorRecommendations,
    genreRecommendations: recommendations.genreRecommendations,
    loading: booksLoading || dashboardLoading,
  };
};
