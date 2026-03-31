import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
