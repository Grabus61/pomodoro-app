

export default function Todo() {
    return (
        <div className="max-w-lg mx-auto flex w-full items-center justify-between mt-8 pb-4 border-b border-solid border-gray-200">
            <div><h1>To-Do List</h1></div>
            <div><button className="bg-red-400/60 text-white px-4 py-2 rounded">Add Task</button></div>
        </div>
    );
}