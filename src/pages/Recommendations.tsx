import { useRecommendations } from "@/features/recommendations/hooks/useRecommendations";
import { Header } from "@/shared/components/ui/sections/Header";
import { PageLoader } from "@/shared/components/ui/sections/PageLoader";
import { RecommendationsSection } from "@/features/recommendations/components/RecommendationSection";

export const Recommendations = () => {
  //* Custom hooks
  const { authorRecommendations, genreRecommendations, loading } =
    useRecommendations();

  if (loading) {
    <PageLoader />;
  }

  return (
    <>
      <Header
        title="Recomendaciones"
        paragraph="En MyReader te ayudamos a descubrir nuevos libros que puedan interesarte"
      />
      <RecommendationsSection
        title="Recomendados por Autor"
        description="Libros relacionados con autores que ya lees"
        icon="ri-quill-pen-fill"
        iconClassName="text-violet-500"
        books={authorRecommendations}
        recommendationReason={{
          text: "Autor relacionado",
          type: "author",
        }}
      />

      <RecommendationsSection
        title="Recomendados por Género"
        description="Descubre lecturas similares a tus géneros favoritos"
        icon="ri-bookmark-fill"
        iconClassName="text-orange-500"
        books={genreRecommendations}
        recommendationReason={{
          text: "Género relacionado",
          type: "genre",
        }}
      />
    </>
  );
};
