import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import Todo from "./components/Todo";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <Timer />
        <Todo />
      </div>
    </div>
  );
}
