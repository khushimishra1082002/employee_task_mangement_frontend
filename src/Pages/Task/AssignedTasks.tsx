import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ErrorMessagess from "../ErrorMessagess";
import { FaUserCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux Toolkit/app/Store";
import { fetchTasks } from "../../Redux Toolkit/Fetatures/TaskSlice";
import { useNavigate } from "react-router-dom";
import { assignNewTask } from "../../Services/TaskService";
import { toast } from "react-toastify";
import { getEmployees } from "../../Services/UserServices";

interface AssignTaskValues {
  title: string;
  description: string;
  status: string;
  assigned_to: string; 
}

interface Employee {
  _id: string;
  name: string;
}

const AssignedTasks: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [employees, setEmployees] = useState<Employee[]>([]);

  console.log("employees", employees);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const initialValues: AssignTaskValues = {
    title: "",
    description: "",
    assigned_to: "",
    status: "pending",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    assigned_to: Yup.string().required("Please select an employee"),
    status: Yup.string().required("Status is required"),
  });

  const onSubmit = async (
    values: AssignTaskValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("values", values);
    try {
      const response = await assignNewTask(values);

      console.log("response", response);

     
      const createdTask = response.task ?? response;

      dispatch(fetchTasks());

      resetForm();
      toast.success("Task Assigned Successfully");
      navigate("/dashboard/allTask");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getEmployees();
        setEmployees(res.users); 
      } catch (error) {
        console.error("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <div className="py-6 w-full ">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form
              className="w-11/12 md:w-7/12 m-auto 
              p-8 rounded-xl shadow-lg grid grid-cols-1 gap-6 items-center bg-white"
            >
              <div className="flex items-center gap-3  justify-center">
                <FaUserCheck className="text-3xl text-cyan-500 bg-gray-200 p-1 rounded-full shadow-md" />
                <h2
                  className="text-2xl font-RobotoFlex 
              font-bold bg-gradient-to-r from-cyan-500
               to-teal-500 bg-clip-text text-transparent tracking-wider"
                >
                  Assign Tasks
                </h2>
              </div>

              {/* Title Field */}
              <div className="flex flex-col gap-1">
                <label className="font-RobotoFlex text-[15px]" htmlFor="title">
                  Task Title
                </label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Enter task title"
                  className="p-[10px] border border-black/20 rounded-md font-Inter text-sm"
                />
                <ErrorMessage name="title" component={ErrorMessagess} />
              </div>

              {/* Description Field */}
              <div className="flex flex-col gap-1">
                <label
                  className="font-RobotoFlex text-[15px]"
                  htmlFor="description"
                >
                  Task Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Enter task description"
                  className="p-[10px] border border-black/20 rounded-md font-Inter text-sm"
                />
                <ErrorMessage name="description" component={ErrorMessagess} />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="font-RobotoFlex text-[15px]"
                  htmlFor="assigned_to"
                >
                  Assign To
                </label>

                <Field
                  as="select"
                  name="assigned_to"
                  className="p-[10px] border border-black/20 rounded-md font-Inter text-sm"
                >
                  <option value="">Select Employee</option>

                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </Field>

                <ErrorMessage name="assigned_to" component={ErrorMessagess} />
              </div>

              {/* Status Field */}
              <div className="flex flex-col gap-1">
                <label className="font-RobotoFlex text-[15px]" htmlFor="status">
                  Status
                </label>
                <Field
                  as="select"
                  name="status"
                  className="p-[10px] border border-black/20 rounded-md font-Inter text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </Field>
                <ErrorMessage name="status" component={ErrorMessagess} />
              </div>

              {/* Submit Button */}
              <button
                className="p-[10px] bg-cyan-500 font-RobotoFlex
              hover:scale-105 duration-500 border-none
               rounded-sm text-white w-full disabled:bg-red-500
                disabled:cursor-not-allowed font-medium hover:shadow-lg hover:shadow-teal-500/50"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Submit Task
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AssignedTasks;
