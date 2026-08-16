import { Link } from "react-router-dom";
import { showSuccess } from "../toast/toast";

const App = () => {
  return (
    <>
      <div className="bg-emerald-400 text-black font-bold h-10 flex justify-center items-center gap-2">
        Basic Setup Done with Folder Structure
        <button onClick={() => showSuccess("hi")} className="cursor-pointer">
          Click me
        </button>
      </div>
      <div className="p-6">
        <ol className="list-decimal">
          <li>
            <Link to={"virtualization"}>Virtualization</Link>
          </li>
          <li>
            <Link to={"jsPrac"}>JS Prac</Link>
          </li>
        </ol>
      </div>
    </>
  );
};

export default App;
