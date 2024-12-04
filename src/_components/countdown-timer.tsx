"use client";

import {
  useState,
  useEffect,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import clsx from "clsx";
import Header from "./header";
import { PauseIcon, PlayIcon, RotateCcw } from "lucide-react";
import PieChart from "./circle";

export default function CountdownTimer({
  lang = "en",
}: {
  lang?: "en" | "es";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [maxSeconds, setMaxSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [input, setInput] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isRunning) {
      const id = setTimeout(() => {
        setTimeLeft((prevTime) => {
          if (!isRunning) return prevTime;

          const totalSeconds =
            prevTime.hours * 3600 + prevTime.minutes * 60 + prevTime.seconds;

          if (totalSeconds > 0) {
            const newTotalSeconds = totalSeconds - 1;
            setRemainingSeconds(newTotalSeconds);
            return {
              hours: Math.floor((newTotalSeconds % 86400) / 3600),
              minutes: Math.floor((newTotalSeconds % 3600) / 60),
              seconds: newTotalSeconds % 60,
            };
          }

          clearInterval(id);
          setRemainingSeconds(0);
          setIsRunning(false);
          return { hours: 0, minutes: 0, seconds: 0 };
        });
      }, 1000);

      setTimeoutId(id);
      return () => clearTimeout(id);
    }
  }, [isRunning, timeLeft]);

  function toggleTimer() {
    if (isRunning) {
      clearInterval(timeoutId);
      setIsRunning(false);
    } else {
      if (timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0) {
        setIsRunning(true);
        const totalSeconds =
          timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
        setRemainingSeconds(totalSeconds);
        setMaxSeconds(totalSeconds);
      }
    }
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      toggleTimer();
    }
    if (e.key === "r" || e.key === "R") {
      resetTimer();
    }
  }

  function resetTimer() {
    if (isRunning) return;

    setRemainingSeconds(maxSeconds);
    setIsRunning(false);
    setTimeLeft(getTimeLeftFromInput(input));
  }

  function getTimeLeftFromInput(inputParameter: string) {
    const revisedValue = "000000" + inputParameter;

    const seconds = +revisedValue.slice(-2);
    const minutes = +revisedValue.slice(-4, -2);
    const hours = +revisedValue.slice(-6, -4);

    if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
      return { hours, minutes, seconds };
    } else {
      alert("Invalid input format. Use: days:hours:minutes:seconds");
      return { hours: 0, minutes: 0, seconds: 0 };
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isRunning) return;

    setInput(e.target.value);
    setTimeLeft(getTimeLeftFromInput(e.target.value));
  };

  return (
    <div className="container mx-auto flex h-full flex-col">
      <Header lang={lang} />
      <div className="flex h-full w-full flex-col items-center justify-center">
        <PieChart
          percentage={
            maxSeconds === 0 ? 100 : (remainingSeconds / maxSeconds) * 100
          }
          size={550}
          className="absolute z-[-1] opacity-50"
        />
        <div className="flex gap-1 font-mono text-[100px]">
          <span
            className={clsx({
              "text-zinc-200": timeLeft.hours === 0,
            })}
          >
            {timeLeft.hours < 10 ? "0" : ""}
            {timeLeft.hours}
          </span>
          <span
            className={clsx({
              "text-zinc-200": timeLeft.hours === 0,
            })}
          >
            :
          </span>
          <span
            className={clsx({
              "text-zinc-200": timeLeft.minutes === 0 && timeLeft.hours === 0,
            })}
          >
            {timeLeft.minutes < 10 ? "0" : ""}
            {timeLeft.minutes}
          </span>
          <span
            className={clsx({
              "text-zinc-200": timeLeft.minutes === 0 && timeLeft.hours === 0,
            })}
          >
            :
          </span>
          <span
            className={clsx({
              "text-zinc-200":
                timeLeft.seconds === 0 &&
                timeLeft.minutes === 0 &&
                timeLeft.hours === 0,
            })}
          >
            {timeLeft.seconds < 10 ? "0" : ""}
            {timeLeft.seconds}
          </span>
        </div>
        <input
          ref={inputRef}
          type="number"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKey}
          className="opacity-0"
        />
        <div className="flex w-full justify-center gap-4">
          <button
            className="rounded-full bg-zinc-100 p-4 text-zinc-800"
            onClick={toggleTimer}
          >
            {isRunning ? (
              <PauseIcon className="fill-zinc-800" />
            ) : (
              <PlayIcon className="fill-zinc-800" />
            )}
          </button>
          <button
            className="rounded-full bg-zinc-100 p-4 text-zinc-800 disabled:text-zinc-300"
            onClick={resetTimer}
            disabled={isRunning}
          >
            <RotateCcw />
          </button>
        </div>
      </div>
    </div>
  );
}
