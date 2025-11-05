import { useNavigate } from "react-router-dom";
import type { ITask } from "../models/Task";
import { Check } from "lucide-react";

const TaskCardGrid = ({ task }: { task: ITask }) => {
  const navigate = useNavigate();
  const handleViewClick = () => {
    navigate(`/${task.id}`); // <-- Navigate to /:taskid
  };
  return (
    <div className="bg-white rounded-2xl m-1 flex flex-col justify-between min-w-[230px] h-[400px] p-6 ">
      <div className="space-y-4 flex flex-col ">
        <div
          className={` w-7 h-7 rounded-full flex items-center justify-center  ${
            task.isCompleted ? " bg-success" : "bg-black"
          }`}
        >
          <span className="text-white ">
            {" "}
            <Check />
          </span>
        </div>
        <div className="flex items-center gap-3 border ">
          {/* <h3 className="text-lg text-center  font-bold text-gray-900 uppercase tracking-wide">
            {task.title}
          </h3> */}
          <h3 className="sm:text-lg break-words max-sm:w-[180px] w-[300px] font-semibold text-gray-900" >{task.title.toUpperCase()}</h3>

        </div>

        <p className="text-sm text-center text-gray-600 line-clamp-6 leading-relaxed">
          {task.description || "No description provided."}
        </p>
      </div>

      <button
        onClick={handleViewClick}
        className="w-max self-center bg-primary hover:bg-blue-700 mb-3 text-white font-medium text-sm py-2.5 px-5 rounded-lg cursor-pointer"
      >
        VIEW
      </button>
    </div>
  );
};

export default TaskCardGrid;
