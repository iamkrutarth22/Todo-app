import { useEffect } from "react";
import { getTasks } from "../services/api";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch} from "react-redux";
import { tasksActions } from "../store/tasks/taskSlice";
const Home = () => {

  const dispatch=useDispatch()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        dispatch(tasksActions.setTasks(data.tasks));
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    fetchTasks();
  }, [dispatch]);
  

  return (
    <>
      <Header />
      <div className=" py-12 md:mx-40 mx-10">
      <Outlet />
      </div>
    </>
  );
};

export default Home;

