import type { LinkItem } from "@/shared/types/link.types";
import { Link } from "react-router-dom";
import { Button } from "../shadcn/button";
import Logo from "@/assets/logo.svg";

interface Props {
  navItems?: LinkItem[];
  primaryAction: LinkItem;
}

export const Navbar = ({ navItems = [], primaryAction }: Props) => {
  return (
    <nav className="flex items-center justify-between px-16 py-6 border-b border-white/25 w-full">
      <div>
        <img src={Logo} alt="MyReader Logo" className="h-10" />
      </div>

      <ul className="flex items-center gap-8 font-medium">
        {navItems.map((item, index) => (
          <li key={index} className="hover:text-slate-500">
            <Link to={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        {/* asChild sirve para en lugar de renderizar un <button>, renderizar el componente hijo */}
        <Button size="lg" asChild>
          <Link to={primaryAction.href}>{primaryAction.label}</Link>
        </Button>
      </div>
    </nav>
  );
};
