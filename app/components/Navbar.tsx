

export default function Navbar() {
    return (
        <nav>
            <div className="max-w-2xl mx-auto flex h-16 items-center justify-between border-b border-solid border-gray-200">
                <div className="text-lg font-bold">Pomodoro App</div>
                <div>
                    <button className="bg-red-400/60 text-white px-2 py-1 rounded">Start</button>
                </div>
            </div>
        </nav>
    );
}
