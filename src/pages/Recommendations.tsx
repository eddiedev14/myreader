import { useRecommendations } from "@/features/recommendations/hooks/useRecommendations"
import { Header } from "@/shared/components/ui/sections/Header"
import { PageLoader } from "@/shared/components/ui/sections/PageLoader";

export const Recommendations = () => {
    //* Custom hooks
    const { loading } = useRecommendations();

    if (loading) {
        <PageLoader />
    }

    return (
        <Header title="Recomendaciones" paragraph="En MyReader te ayudamos a descubrir nuevos libros que puedan interesarte" />
    )
}
