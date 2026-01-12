import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { decodeToken } from "../../Utills/DecodeToken";
import { toast } from "react-toastify";

interface Task {
  task_id: number;
  name: string;
  title: string;
  status: string;
  description: string;
  created_at: string;
  emp_id: number;
}

interface DecodedToken {
  id: number;
  name: string;
  role: string;
  exp: number;
  iat: number;
}

const MyTask: React.FC = () => {
  const [myTaskDetail, setTasks] = useState<Task[]>([]);
  console.log("myTaskDetail", myTaskDetail);

  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    console.log("storedToken", storedToken);
    if (!storedToken) {
      console.error("No token found");
      return;
    }

    try {
      const decoded = decodeToken(storedToken);
      if (decoded?.id) {
        setUserId(decoded.id);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchTasks(userId);
    }
  }, [userId]);

  const fetchTasks = async (userId: number) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get<Task[]>(`/api/auth/search/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setTasks(response.data);
    } catch (error: any) {
      console.error(
        "Error fetching tasks:",
        error.response?.data || error.message
      );
    }
  };

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
        toast.success("Task Status updated successfully!");

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.task_id === taskId ? { ...task, status: newStatus } : task
          )
        );
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

  return (
    <div className="bg-white/80 min-h-screen">
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-medium text-gray-900 font-Poppins">
          My Assigned Tasks
        </h2>

        {myTaskDetail.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTaskDetail.map((task, index) => (
              <li
                key={task.task_id}
                className="p-6 bg-white border border-gray-200 space-y-2
                 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                {/* Task Title */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {index + 1}. {task.title}
                </h3>

                {/* Task Description */}
                <p className="text-sm text-gray-700">{task.description}</p>

                {/* Status Badge */}
                <span
                  className={`inline-block px-3 py-2 text-xs font-semibold rounded-full capitalize 
                 ${
                   task.status === "completed"
                     ? "bg-green-200 text-green-800 font-Roboto"
                     : task.status === "in-progress"
                     ? "bg-yellow-200 text-yellow-800 font-Roboto"
                     : "bg-red-200 text-red-800 font-Roboto"
                 }`}
                >
                  {task.status}
                </span>

                {/* Update Status Dropdown */}
                <div className="space-y-2">
                  <label
                    htmlFor={`status-${task.task_id}`}
                    className="block text-sm font-medium text-gray-600"
                  >
                    Update Status
                  </label>

                  <select
                    className="w-full py-2 px-3 border rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={task.status}
                    onChange={(e) =>
                      updateTaskStatus(task.task_id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progess">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center text-lg">
            No tasks assigned to you.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyTask;
