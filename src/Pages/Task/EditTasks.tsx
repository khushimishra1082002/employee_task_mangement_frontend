import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ErrorMessagess from "../ErrorMessagess";
import { AppDispatch } from "../../Redux Toolkit/app/Store";
import { fetchTasks } from "../../Redux Toolkit/Fetatures/TaskSlice";
import { useDispatch } from "react-redux";
import { fetchSingleTaskDetail } from "../../Services/TaskService";
import { updateTaskDetail } from "../../Services/TaskService";
import { toast } from "react-toastify";

interface TaskValues {
  title: string;
  status: string;
  description: string;
  name: string; 
  created_at?: string; 
}

const EditTasks: React.FC<{
  selectedId: string;
  setEditTaskDetailModel: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ selectedId, setEditTaskDetailModel }) => {
  const id = selectedId;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const token = sessionStorage.getItem("token")?.trim();

  const [singleTaskData, setSingleTaskData] = useState<TaskValues | null>(null);
  console.log("singleTaskData", singleTaskData);

  useEffect(() => {
    console.log(" Starting fetchTask with ID:", id);
    const fetchSingleTask = async () => {
      try {
        const details = await fetchSingleTaskDetail(id);
        console.log(" Fetched Task Details:", details);
        const data = Array.isArray(details) ? details[0] : details;
        if (!data) {
          console.error(" No task found.");
          return;
        }
        setSingleTaskData({
          title: data.title,
          status: data.status,
          description: data.description,
          name: data.assigned_to?.name || "N/A",
          created_at: data.createdAt,
        });
      } catch (error: any) {
        console.error(
          "Error in fetchTask:",
          error.response?.data || error.message
        );
      }
    };

    fetchSingleTask();
  }, [id]);

  const validationSchema = Yup.object({
    // name: Yup.string().required("Required"),
    // title: Yup.string().required("Required"),
    // status: Yup.string().required("Required"),
    // description: Yup.string().required("Required"),
  });

  interface UpdateTaskPayload {
  title: string;
  description: string;
  status: string;
}


  const onSubmit = async (
    values: TaskValues,
    helpers: FormikHelpers<TaskValues>
  ) => {
    const payload = {
      title: values.title,
      description: values.description,
      status: values.status.toLowerCase(),
    };

    try {
      const updatedTask = await updateTaskDetail(id, payload);

      if (updatedTask) {
        toast.success("Task updated successfully!");
        dispatch(fetchTasks());

        setEditTaskDetailModel(false); 
        setSingleTaskData(null); 
      }
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <>
      <div className="">
        <h2 className="text-2xl font-medium text-center font-Poppins">
          Edit Task
        </h2>
        {singleTaskData ? (
          <Formik
            initialValues={singleTaskData}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {(formik) => (
              <Form className="space-y-4">
                <Field
                  type="text"
                  name="name"
                  disabled
                  className="p-2 border rounded-md font-RobotoFlex border-black/25 bg-gray-100"
                />

                <div className="flex flex-col gap-1">
                  <label className=" text-left font-RobotoFlex" htmlFor="title">
                    Enter Title
                  </label>
                  <Field
                    type="text"
                    name="title"
                    className="p-2 border rounded-md font-RobotoFlex border-black/25"
                  />
                  <ErrorMessage name="title" component={ErrorMessagess} />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className=" text-left font-RobotoFlex"
                    htmlFor="status"
                  >
                    Enter Status
                  </label>
                  <Field
                    as="select"
                    name="status"
                    className="p-2 border rounded-md font-RobotoFlex border-black/25"
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Field>
                  <ErrorMessage name="status" component={ErrorMessagess} />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className=" text-left font-RobotoFlex"
                    htmlFor="description"
                  >
                    Enter Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    className="p-2 border rounded-md font-RobotoFlex border-black/25"
                  />
                  <ErrorMessage name="description" component={ErrorMessagess} />
                </div>

                <button
                  type="submit"
                  className="p-2 bg-gradient-to-r from-blue-500 to-blue-500
                 text-white w-full rounded-md
                hover:scale-105 duration-500  transition-all font-medium cursor-pointer"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <p className="text-center text-gray-600">Loading Task data...</p>
        )}
      </div>
    </>
  );
};

export default EditTasks;
