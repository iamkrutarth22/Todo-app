import { useDispatch, useSelector } from "react-redux";
import type { IAuth } from "../models/Auth";
import { useLocation } from "react-router-dom";
import { authActions } from "../store/auth/authSlice";

const Header = () => {
  const { accessToken, user } = useSelector(
    (state: { auth: IAuth }) => state.auth
  );
  const location = useLocation()
   const dispatch = useDispatch()

  return (
    <div className="w-full ">
      {accessToken && location.pathname!='/login' && location.pathname!='/signup' && (
        <div className=" w-full flex justify-end p-4 ">
          <div className="flex  items-center p-2  rounded-md font-medium  w-max space-x-2  ">
            <div>welcome , {user.username} </div>
            <button className="bg-primary text-white px-2 py-1 rounded cursor-pointer" onClick={()=>{dispatch(authActions.logout())}}>logout</button>
          </div>
        </div>
      )}
      <h1 className=" text-5xl font-extrabold  w-full  text-center p-4 ">
        TODO <span className="text-blue-600">LIST</span>
      </h1>
    </div>
  );
};

export default Header;
