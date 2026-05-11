import { useEffect, useMemo, useState } from "react";

type Mode = "focus" | "break";

const TIMES = {
  focus: 25 * 60, // 25 minutos
  break: 5 * 60, // 5 minutos
};

export const usePomodoro = () => {
  const [mode, setMode] = useState<Mode>("focus");
  const [timeLeft, setTimeLeft] = useState(TIMES.focus);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        // Si el tiempo se ha agotado, cambia de modo y reinicia el temporizador
        if (prev <= 1) {
          const nextMode = mode === "focus" ? "break" : "focus";
          setMode(nextMode);
          return TIMES[nextMode];
        }

        // De lo contrario, simplemente decrementa el tiempo
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const progress = useMemo(() => {
    const totalTime = TIMES[mode];
    return (timeLeft / totalTime) * 100;
  }, [timeLeft, mode]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");

    const seconds = (timeLeft % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMES[mode]);
  };

  const changeMode = (newMode: Mode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(TIMES[newMode]);
  };

  return {
    mode,
    formattedTime,
    progress,
    isRunning,
    toggleTimer,
    resetTimer,
    changeMode,
  };
};
