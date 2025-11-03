import { useEffect, useState } from "react";
import type { Task } from "../models/Task";
import { getTasks } from "../services/api";

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


 useEffect(() => {
   const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTasks(); // Axios with token auto-added
        setTasks(data);
      } catch (err: any) {
        setError(err.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.isCompleted ? "Completed" : "Pending"}</p>
        </div>
      ))}
    </div>
  );
}

export default Home
