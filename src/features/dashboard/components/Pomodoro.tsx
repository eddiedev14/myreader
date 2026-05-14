import { Button } from "@/shared/components/shadcn/button";
import { usePomodoro } from "../hooks/usePomodoro";

const radius = 110;
const stroke = 10;
const normalizedRadius = radius - stroke / 2;
const circumference = normalizedRadius * 2 * Math.PI;

export const Pomodoro = () => {
  //* Custom hook
  const {
    mode,
    formattedTime,
    progress,
    isRunning,
    toggleTimer,
    resetTimer,
    changeMode,
  } = usePomodoro();

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="w-full bg-gray-50/50 rounded-2xl border border-gray-200 p-8 shadow-sm">
      <h2 className="text-2xl text-center font-semibold text-green-800">
        Enfoque de Lectura
      </h2>

      {/* Circle */}
      <div className="flex justify-center items-center">
        <div className="relative w-60 h-60 flex items-center justify-center">
          <svg height={radius * 2} width={radius * 2} className="-rotate-90">
            <circle
              stroke="#e5e5e5"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />

            <circle
              stroke="#2f6b4f"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="transition-all duration-1000"
            />
          </svg>

          {/* Timer content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-3">
            <span className="text-5xl font-bold text-gray-900">
              {formattedTime}
            </span>

            <span className="uppercase tracking-[3px] text-gray-500 font-semibold mt-2">
              {mode === "focus" ? "Lectura" : "Descanso"}
            </span>
          </div>
        </div>
      </div>

      {/* Modes */}
      <div className="flex gap-3 mb-10">
        <Button
          onClick={() => changeMode("focus")}
          className={`flex-1 rounded-2xl py-4 font-semibold transition-all ${
            mode === "focus"
              ? "bg-green-900 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Lectura (25m)
        </Button>

        <Button
          onClick={() => changeMode("break")}
          className={`flex-1 rounded-2xl py-4 font-semibold transition-all ${
            mode === "break"
              ? "bg-green-900 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Descanso (5m)
        </Button>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-5">
        <Button
          onClick={resetTimer}
          className="w-16 h-16 rounded-2xl border bg-white flex items-center justify-center shadow-sm hover:bg-gray-100 transition"
        >
          <i className="ri-reset-left-fill text-black text-2xl"></i>
        </Button>

        <Button
          onClick={toggleTimer}
          className="w-20 h-20 rounded-2xl bg-[#2f6b4f] text-white flex items-center justify-center shadow-md hover:scale-105 transition"
        >
          {isRunning ? (
            <i className="ri-pause-fill text-3xl"></i>
          ) : (
            <i className="ri-play-fill text-3xl"></i>
          )}
        </Button>

        <Button
          onClick={() => changeMode(mode === "focus" ? "break" : "focus")}
          className="w-16 h-16 rounded-2xl border bg-white flex items-center justify-center shadow-sm hover:bg-gray-100 transition"
        >
          <i className="ri-skip-forward-fill text-black text-2xl"></i>
        </Button>
      </div>
    </div>
  );
};
