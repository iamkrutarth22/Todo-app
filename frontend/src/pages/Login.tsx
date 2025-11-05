import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { IAuth } from "../models/Auth";
import { authActions } from "../store/auth/authSlice";
import Header from "../components/Header";
import { isAxiosError } from "axios";

interface ILogin {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik<ILogin>({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Password should be at least 8 characters long")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await login(values);

        const auth: IAuth = {
          accessToken: res.accessToken,
          user: {
            userId: res.user.userid,
            username: res.user.username,
            email: res.user.email,
          },
        };

        dispatch(authActions.login(auth));
        alert(res.message);
        navigate("/");
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          const err = error.response?.data as { message?: string };

          if (status === 404) {
            formik.setFieldError("email", "Email is not registered");
          } else if (status === 401) {
            formik.setFieldError("password", "Incorrect password");
          } else {
            alert(err?.message || "Login failed. Please try again.");
          }
        } else {
          console.error(error);
          alert("An unexpected error occurred. Please try again.");
        }
      }
    },
  });

  return (
    <>
      <div className="flex flex-col space-y-10 items-center justify-center min-h-screen bg-background text-white">
        <Header />
        <form
          onSubmit={formik.handleSubmit}
          className="  p-8 w-full max-w-md space-y-6 text-black"
        >
          {/* Header */}
          <h2 className="text-4xl font-extrabold text-white text-center">
            LOG IN
          </h2>

          {/* Name Field */}

          <div>
            <label
              htmlFor="email"
              className="block font-semibold mb-2 uppercase text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full px-4 py-2 rounded-md bg-secondary  focus:outline-none ${
                formik.touched.email && formik.errors.email
                  ? "border-2 border-red-500"
                  : "border border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-semibold mb-2 uppercase text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full px-4 py-2 rounded-md bg-secondary focus:outline-none ${
                formik.touched.password && formik.errors.password
                  ? "border-2 border-red-500"
                  : "border border-gray-300"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 rounded-md transition duration-200 cursor-pointer"
          >
            LOGIN
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-300">
            Do not have an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:underline font-semibold"
            >
              signup
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
