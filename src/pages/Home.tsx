import { Hero } from "@/shared/components/layout/Hero";
import { Navbar } from "@/shared/components/layout/Navbar";
import type { LinkItem } from "@/shared/types/link.types";
import backgroundImage from "@/assets/backgrounds/grid-background.jpeg";
import heroIllustration from "@/assets/illustrations/hero-illustration.svg";

//* Navbar data
const primaryAction: LinkItem = {
  label: "Iniciar sesión",
  href: "/login",
};

//* Hero data
const heroData = {
  span: "Tu hábito de lectura, reinventado",
  title: "Lee más, mejor y sin perder el ritmo",
  description:
    "Organiza tus libros, planifica tus lecturas y mantén la motivación en un solo lugar. MyReader convierte tu intención de leer en un hábito real, claro y constante.",
  primaryButton: {
    label: "Comenzar",
    href: "/signup",
  },
  secondaryButton: {
    label: "Inicia Sesión",
    href: "/login",
  },
  heroImage: heroIllustration,
};

export const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background pattern */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      <Navbar primaryAction={primaryAction} />
      <Hero {...heroData} />
    </div>
  );
};
