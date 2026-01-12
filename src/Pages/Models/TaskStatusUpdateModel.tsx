import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux Toolkit/app/Store";
import { toast } from "react-toastify";

interface TaskStatusUpdateModelProps {
  openTaskStatusUpdateModel: boolean;
  setOpenTaskStatusUpdateModel: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: number | null;
  refetchTasks: () => void;
}

interface TaskData {
  task_id: number;
  name: string;
  title: string;
  status: string;
  description: string;
  created_at: string;
}

const TaskStatusUpdateModel: React.FC<TaskStatusUpdateModelProps> = ({
  openTaskStatusUpdateModel,
  setOpenTaskStatusUpdateModel,
  taskId,
  refetchTasks,
}) => {
  const [singleTaskData, setSingleTaskData] = useState<TaskData | null>(null);
  const [newStatus, setNewStatus] = useState<string>("pending");
  const token = sessionStorage.getItem("token");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchSingleTaskDetail = async () => {
      if (!token || !taskId) {
        console.error("Token or task ID is missing.");
        return;
      }

      try {
        const response = await axios.get(`/api/task/gettask/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const details = Array.isArray(response.data)
          ? response.data[0]
          : response.data;

        if (details) {
          setSingleTaskData(details);
          setNewStatus(details.status || "pending");
        } else {
          console.error("No task found.");
        }
      } catch (error: any) {
        console.error(
          "Error fetching task:",
          error?.response?.data || error.message
        );
      }
    };

    if (taskId) fetchSingleTaskDetail();
  }, [taskId, token]);

  const updateTaskStatus = async (taskId: number, newStatus: string) => {
    console.log(`Updating task ${taskId} to status: ${newStatus}`);

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.put(
        `/api/task/empupdatetask/${taskId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);

      if (response.status === 200) {
        // alert("Task status updated successfully!");
        toast.success("Task Status updated successfully!");
        setSingleTaskData((prevTask) =>
          prevTask ? { ...prevTask, status: newStatus } : null
        );
        setOpenTaskStatusUpdateModel(false);
        refetchTasks();
      } else {
        throw new Error("Failed to update task");
      }
    } catch (error: any) {
      console.error(
        "Error updating task status:",
        error.response?.data || error.message
      );
    }
  };

  if (!singleTaskData) return null;

  return (
    <AnimatePresence>
      {openTaskStatusUpdateModel && (
        <motion.div
          className="fixed top-0 inset-0 bg-black bg-opacity-60 
          flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-6 w-[400px] text-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
              onClick={() => setOpenTaskStatusUpdateModel(false)}
            >
              <X size={20} />
            </button>

            <div className="space-y-4 text-left">
              <h2 className="text-2xl font-semibold text-cyan-500 text-center">
                Task Details
              </h2>
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-gray-700">
                  {singleTaskData.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {singleTaskData.description}
                </p>
              </div>

              <div className="text-sm text-gray-500">
                <span className="block mb-1">
                   <strong>Created At:</strong> {singleTaskData.created_at}
                </span>
                <span className="block mb-3">
                   <strong>Current Status:</strong> {singleTaskData.status}
                </span>

                {/* Status Badge */}
                <span
                  className={`inline-block px-3 py-2 text-xs font-semibold rounded-full capitalize 
                 ${
                   singleTaskData.status === "completed"
                     ? "bg-green-200 text-green-800"
                     : singleTaskData.status === "in-progess"
                     ? "bg-yellow-200 text-yellow-800"
                     : "bg-red-200 text-red-800"
                 }`}
                >
                  {singleTaskData.status}
                </span>

                {/* Update Status Dropdown */}
                <div className="space-y-2 mt-2">
                  <label
                    htmlFor={`status-${singleTaskData.task_id}`}
                    className="block text-sm font-medium text-gray-600"
                  >
                    Update Status
                  </label>
                  <select
                    className="w-full py-2 px-3 border rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progess">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => setOpenTaskStatusUpdateModel(false)}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-5 py-2 rounded-lg transition shadow-md duration-500 hover:scale-105 hover:shadow-lg"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  updateTaskStatus(singleTaskData.task_id, newStatus)
                }
                className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-5 py-2 rounded-lg transition shadow-md duration-500 hover:scale-105 hover:shadow-lg"
              >
                Update Status
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskStatusUpdateModel;
