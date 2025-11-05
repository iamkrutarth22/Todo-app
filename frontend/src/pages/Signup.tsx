import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { isAxiosError } from "axios";

interface ISignup {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik<ISignup>({
    initialValues: {
      name: "",
      password: "",
      email: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
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
        const res = await signup(values);
        alert(res.message);
        navigate("/login");
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          const err = error.response?.data as { message?: string };

          if (status === 409) {
            formik.setFieldError("email", "This email is already registered.");
          } else {
            alert(err?.message || "Signup failed. Please try again.");
          }
        } else {
          console.error(error);
          alert("An unexpected error occurred. Please try again.");
        }
      }
    },
  });

  return (
    <div className="flex flex-col space-y-5 items-center justify-center min-h-screen bg-background text-white">
      <Header />
      <form
        onSubmit={formik.handleSubmit}
        className="  p-8 w-full max-w-md space-y-6 text-black"
      >
        <h2 className="text-4xl font-extrabold text-center text-white">
          SIGN UP
        </h2>

        <div>
          <label
            htmlFor="name"
            className="block font-semibold mb-2 uppercase text-gray-300"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`w-full px-4 py-2  rounded-md bg-secondary focus:outline-none ${
              formik.touched.name && formik.errors.name
                ? "border-2 border-red-500"
                : "border border-gray-300"
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

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
          SIGN UP
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline font-semibold"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
