'use client'
import { useState } from "react";

export default function Todo() {
    const [tasks, setTasks] = useState<{ text: string; done: boolean }[]>([]);
    const [newTask, setNewTask] = useState<string>("");


    const addTask = () => {
        if (newTask.trim() === "") return;
        setTasks([...tasks, { text: newTask, done: false }]);
        setNewTask("");
    }
    
    const deleteTask = (index : number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    const finishTask = (index: number) => {
        setTasks(tasks.map((task, i) => i === index ? { ...task, done: !task.done } : task));
    }

    return (
        <div className="max-w-2xl mx-auto w-full mt-8">
            <div className="flex items-center justify-center mt-8 pb-4 border-b border-solid border-gray-200">
                <div><h1>To-Do List</h1></div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <div>
                    {tasks.map((task, index) => (
                        <div key={index} className="flex items-stretch gap-2 mb-2">
                            <div className={`flex-1 flex items-center gap-2 border border-gray-200/50 rounded px-4 py-2 wrap-break-word ${task.done ? "line-through opacity-50" : ""}`}>
                                <button onClick={() => finishTask(index)} className={`border border-gray-200/50 rounded-full w-5 h-5 shrink-0 ${task.done ? "bg-green-400" : ""}`}></button>
                                {task.text}
                            </div>
                            <button onClick={() => deleteTask(index)} className="bg-red-400/60 text-white px-2 py-1 rounded">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTask()}
                        className="border border-gray-300 rounded px-4 py-2"
                    />
                    <button
                        onClick={addTask}
                        className="bg-red-400/60 text-white px-4 py-2 rounded"
                    >
                        Add Task
                    </button>
                </div>
                    
                </div>
        </div>
    );
}