interface DashboardStatProps {
  title: string;
  value: number;
  icon: string;
  color: "green" | "orange" | "blue";
}

const colorVariants = {
  green: {
    text: "text-green-700",
    bg: "bg-green-200",
    border: "border-green-700",
  },

  orange: {
    text: "text-orange-700",
    bg: "bg-orange-200",
    border: "border-orange-700",
  },

  blue: {
    text: "text-blue-700",
    bg: "bg-blue-200",
    border: "border-blue-700",
  },
};

export const DashboardStat = ({
  title,
  value,
  icon,
  color,
}: DashboardStatProps) => {
  return (
    <div
      className={`shadow grid grid-cols-[1fr_auto] gap-4 p-4 border ${colorVariants[color].border} border-l-4 rounded-xl`}
    >
      <div className="flex flex-col gap-1">
        <h2 className="uppercase text-gray-700 text-sm">{title}</h2>
        <span className={`text-3xl font-bold ${colorVariants[color].text}`}>
          {value}
        </span>
      </div>
      <div
        className={`size-12 flex items-center justify-center rounded-full text-2xl ${colorVariants[color].bg} ${colorVariants[color].text}`}
      >
        <i className={icon}></i>
      </div>
    </div>
  );
};
