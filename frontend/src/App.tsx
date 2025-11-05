import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AllTasks from "./components/AllTasks";
import ProtectedRoute from "./components/ProtectedRoute";
import Task from "./pages/Task";
import AddTask from "./pages/AddTask";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute />,
      children : [
        {
          path: "/",
          element: <Home />,
          children: [
            {
              path: "/",
              element: <AllTasks />,
            },
            {
              path: "/:taskid",
              element: <Task />,
            },
            {
              path:"/addtask",
              element:<AddTask/>,
            }
          ],
        },
      ],
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
