import { useEffect, useState } from "react";
import type { ITask } from "../models/Task";
import TaskCard from "./TaksCard";
import { useSelector } from "react-redux";
import TaskCardGrid from "./TaskCardGrid";
import { LayoutGrid, Pencil, Rows3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const AllTasks = () => {
  const tasks = useSelector((state: { tasks: ITask[] }) => state.tasks);
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>(tasks);
  const [showAll, setShowAll] = useState(false);
  const [showList, setShowList] = useState(true);
  const navigate = useNavigate();

  // keep filteredTasks in sync with store when tasks change (so clearing search works)
  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const goToAddTask = () => navigate(`/addtask`);
  const displayedTasks = showAll ? filteredTasks : filteredTasks.slice(0, 4);
  const handleToggle = () => setShowAll((prev) => !prev);

  return (
    <div className="text-white flex flex-col items-center ">
      <div className="text-center w-full pb-10 items-center flex max-md:flex-col   ">
        <div className=" flex-1 max-md:w-full max-md:pb-5  justify-center items-center ">
          <SearchBar onSearch={(results) => setFilteredTasks(results)} />
        </div>

        <div className=" flex self-end ">
          <button
            onClick={() => setShowList(!showList)}
            className="text-white underline cursor-pointer text mx-4"
          >
            {showList ? <Rows3 /> : <LayoutGrid />}
          </button>

          <button
            onClick={goToAddTask}
            className="bg-primary hover:bg-blue-700 px-6 py-3 rounded-md text-white font-medium flex items-center gap-2 cursor-pointer"
          >
            Add Todo <Pencil className="max-lg:hidden" />
          </button>
        </div>
      </div>

      {showList ? (
        <div className="w-full flex flex-col items-center">
          {displayedTasks.length > 0 ? (
            displayedTasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <p className="text-gray-400">No tasks found</p>
          )}
        </div>
      ) : (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full gap-10">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCardGrid key={task.id} task={task} />
            ))
          ) : (
            <p className="text-gray-400">No tasks found</p>
          )}
        </div>
      )}

      {filteredTasks.length > 4 && showList && (
        <button
          onClick={handleToggle}
          className="text-white underline mb-6 cursor-pointer"
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      )}
    </div>
  );
};

export default AllTasks;
