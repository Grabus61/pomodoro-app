'use client'
import { useEffect, useState , useRef} from "react";

export default function Timer() {
    const states = {
        pomodoro: { time: 1500, isRunning: false },
        shortBreak: { time: 3, isRunning: false },
        longBreak: { time: 900, isRunning: false }
    };

    const [activeState, setActiveState] = useState<"pomodoro" | "shortBreak" | "longBreak">("pomodoro");
    const [time, setTime] = useState(states.pomodoro.time);
    const [isRunning, setIsRunning] = useState(false);
    const clickSound = useRef<HTMLAudioElement | null>(null);
    const timerEndSound = useRef<HTMLAudioElement | null>(null);

    const switchMode = (mode: "pomodoro" | "shortBreak" | "longBreak") => {
        setActiveState(mode);
        setTime(states[mode].time);
        setIsRunning(false);
    }

    const resetTimer = () => {
        setIsRunning(false);
        setTime(states[activeState].time);
    }

    useEffect(() => {
        clickSound.current = new Audio("/sounds/click.mp3");
        timerEndSound.current = new Audio("/sounds/timerend.mp3");
    }, []);

    const playClick = () => {
        if (clickSound.current) {
            clickSound.current.currentTime = 0;
            clickSound.current.play();
        }
    }

    const playTimerEnd = () => {
        if (timerEndSound.current) {
            timerEndSound.current.currentTime = 0;
            timerEndSound.current.play();
        }
    }

    const decreaseTime = () => {
        if (time > 0) {
            setTime((time) => time - 1);
        }
        else{
            playTimerEnd();
            resetTimer();
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (isRunning) {
                decreaseTime();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, time]);

    
    const toggleTimer = () => {
        setIsRunning(!isRunning);
        playClick();
    }

    return (
        <div className="flex flex-col items-center justify-center rounded">
            <div className={`flex flex-col items-center font-bold ${isRunning ? "bg-green-400/60" : "bg-red-400/60"} rounded m-8 py-5 px-12`}>
                <div>
                    <button onClick={() => switchMode("pomodoro")} className={`text-white px-4 py-2 rounded ${activeState === "pomodoro" ? "bg-black/20" : ""}`}>Pomodoro</button>
                    <button onClick={() => switchMode("shortBreak")} className={`text-white px-4 py-2 rounded ${activeState === "shortBreak" ? "bg-black/20" : ""}`}>Short-Break</button>
                    <button onClick={() => switchMode("longBreak")} className={`text-white px-4 py-2 rounded ${activeState === "longBreak" ? "bg-black/20" : ""}`}>Long-Break</button>
                </div>
                <span className="text-[7rem] my-2">{`${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`}</span>
                <button onClick={toggleTimer} className={`bg-white text-red-400 w-48 py-2 rounded text-2xl ${isRunning ? "border-b-0 mt-2" : "border-b-8 border-solid border-gray-200"}`}>{isRunning ? "Pause" : "Start"}</button>
            </div>
            Time to focus!
        </div>
    );
}
