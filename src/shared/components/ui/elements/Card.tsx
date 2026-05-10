import { useNavigate } from "react-router-dom";

interface CardProps {
  icon: string;
  title: string;
  path?: string;
}

export const Card = ({ icon, title, path }: CardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="group max-w-48 relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl cursor-pointer"
      onClick={() => path && navigate(path)}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-100 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 transition-colors duration-300 group-hover:bg-blue-500">
        <i
          className={`${icon} text-2xl text-blue-500 transition-colors duration-300 group-hover:text-white`}
        ></i>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
        {title}
      </h3>

      <div className="mt-2 flex justify-end">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 group-hover:bg-blue-500">
          <i className="ri-arrow-right-line text-gray-600 group-hover:text-white"></i>
        </div>
      </div>
    </div>
  );
};
