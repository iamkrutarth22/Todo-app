import { useNavigate } from "react-router-dom";
import type { ITask } from "../models/Task";

import { Check } from "lucide-react";

interface TaskCardProps {
  task: ITask;
}

const TaskCard = ({ task}: TaskCardProps) => {
  const navigate = useNavigate()
  const handleViewClick = () => {
    navigate(`/${task.id}`); // <-- Navigate to /:taskid
  };
  return (
    <div className="bg-white rounded-xl shadow-md flex items-center justify-between p-4 mb-8 w-full ">
      <div className="flex items-center gap-3">
        <div
          className={`smmx-2  w-7 h-7  rounded-full flex items-center justify-center  ${
            task.isCompleted ? " bg-success" : "bg-black"
          }`}
        >
         
            <span className="text-white "> <Check/></span>
          
        </div>
        <div>
          <h3 className="sm:text-lg break-words max-sm:w-[180px] w-[300px] font-semibold text-gray-900" >{task.title.toUpperCase()}</h3>
          <p className="text-md text-gray-500  truncate sm:w-64 w-[120px]">
            {task.description || "No description"}
          </p>
        </div>
      </div>

      <button
        onClick={handleViewClick}
        className="bg-primary cursor-pointer hover:bg-blue-700 text-white text-sm sm:px-4 px-2 py-2 rounded-md transition"
      >
        VIEW
      </button>
    </div>
  );
};

export default TaskCard;
