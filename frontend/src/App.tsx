import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Task from "./pages/Task";

function App() {
  const router = createBrowserRouter([
    {
      path:"/home",
      element:<Home/>
    },
    {
      path:"/task/:taskid",
      element:<Task/>
    }
  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
