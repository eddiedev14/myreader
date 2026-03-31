import type { LinkItem } from "@/shared/types/link.types";
import { Button } from "../shadcn/button";
import { Link } from "react-router-dom";

interface HeroProps {
  span: string;
  title: string;
  description: string;
  primaryButton: LinkItem;
  secondaryButton: LinkItem;
  heroImage: string;
}

export const Hero = ({
  span,
  title,
  description,
  primaryButton,
  secondaryButton,
  heroImage,
}: HeroProps) => {
  return (
    <section className="flex items-center">
      <div className="w-full flex gap-10 px-16 justify-start items-center">
        {/* Left */}
        <div>
          <div className="rainbow relative z-0 overflow-hidden justify-center rounded-full transition duration-300 active:scale-100 mb-6">
            <button className="flex items-center justify-center gap-3 pl-4 pr-6 py-3 text-white rounded-full font-medium border-2 border-primary backdrop-blur">
              <div className="relative flex size-3.5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping duration-300"></span>
                <span className="relative inline-flex size-2 rounded-full bg-primary"></span>
              </div>
              <span className="text-xs text-foreground">{span}</span>
            </button>
          </div>

          <h1 className="text-4xl font-bold bg-linear-to-r from-red-500/80 to-primary text-transparent bg-clip-text">
            {title}
          </h1>

          <p className="text-sm font-light mt-6 text-foreground">
            {description}
          </p>

          <div className="flex items-center gap-4 mt-6">
            <Button asChild size="lg">
              <Link to={primaryButton.href}>{primaryButton.label}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to={secondaryButton.href}>{secondaryButton.label}</Link>
            </Button>
          </div>
        </div>

        {/* Right */}
        {heroImage && (
          <div className="w-full max-w-lg flex justify-center">
            <img className="w-96 h-auto" src={heroImage} alt="hero" />
          </div>
        )}
      </div>
    </section>
  );
};
