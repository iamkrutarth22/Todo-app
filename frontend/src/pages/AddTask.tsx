import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";
import { tasksActions } from "../store/tasks/taskSlice";
import { addNewTask } from "../services/api";
import { isAxiosError } from "axios";
import { authActions } from "../store/auth/authSlice";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(1, "Title too short")
    .max(100, "Title too long"),
  description: Yup.string()
    .required("Description is required")
    .max(190, "Description must be 190 characters or less"),
});

const AddTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      isCompleted: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
      try {
        const res = await addNewTask({
          title: values.title,
          description: values.description,
        });

        dispatch(tasksActions.addTask(res.task));
        resetForm();

        navigate("/");
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const err = error.response?.data as { message?: string };

          if (err?.message?.includes("Title")) {
            setFieldError("title", err.message);
          } else if (err?.message?.includes("Description")) {
            setFieldError("description", err.message);
          } else {
            alert(err?.message || "Failed to add task");
          }
        } else {
          alert("An unexpected error occurred");
          dispatch(authActions.logout())
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex-col items-center justify-center">
      <div className=" w-full flex justify-end  ">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-10 border-3 mb-3 h-10 flex items-center justify-center font-semibold  rounded-full cursor-pointer"
        >
          <X />
        </button>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-2xl space-y-6 flex justify-center space-x-4"
      >
        <div className="w-[300px] sm:w-[400px] md:[500px] flex flex-col space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-center">
              TITLE
            </label>
            <input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 font-semibold text-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="TODO TITLE"
            />
            {formik.touched.title && formik.errors.title ? (
              <p className="text-red-400 text-sm mt-1 text-center">
                {formik.errors.title}
              </p>
            ) : null}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2 text-center">
              DESCRIPTION
            </label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description..."
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              {formik.touched.description && formik.errors.description ? (
                <span className="text-red-400">
                  {formik.errors.description}
                </span>
              ) : (
                <span></span>
              )}
              <span>{formik.values.description.length}/190</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 rounded-lg cursor-pointer"
            >
              {formik.isSubmitting ? "ADDING..." : "ADD"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full bg-secondary  text-black font-semibold py-3 rounded-lg cursor-pointer"
            >
              CANCEL
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
