import { useNavigate } from "react-router-dom";
import type { Collection } from "../interfaces/collection.interface";

export const useCollectionCard = (collection: Collection) => {
  const navigate = useNavigate();

  const handleNavigateCollection = () => {
    navigate(`/my-collections/${collection.id}`);
  };

  return {
    handleNavigateCollection,
  };
};
