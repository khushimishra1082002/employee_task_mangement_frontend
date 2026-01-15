import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, Circle } from "lucide-react";
import { BiTask } from "react-icons/bi";
import { getMyTasks } from "../../Services/EmployeeService";
import { employeeUpdateTaskStatus } from "../../Services/EmployeeService";

type TaskStatus = "pending" | "in-progress" | "completed";

interface AssignedTo {
  _id: string;
  name: string;
  email: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assigned_to: AssignedTo;
  createdAt: string;
  updatedAt: string;
}

const MyTaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  console.log("tasks", tasks);

  useEffect(() => {
  const fetchTasks = async (): Promise<void> => {
    try {
      const response = await getMyTasks();
      console.log("Fetched tasks:", response.tasks); // ✅ yahan dekho
      setTasks(response.tasks);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  fetchTasks();
}, []);


  const handleStatusChange = async (
    _id: string,
    newStatus: TaskStatus
  ): Promise<void> => {
    try {
      await employeeUpdateTaskStatus(_id, newStatus);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === _id ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 space-y-4">
      <h2 className="text-xl font-medium font-Poppins">My Task List</h2>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <BiTask className="text-6xl mb-4 text-gray-400" />
          <p className="text-lg font-semibold">No Tasks Found</p>
          <p className="text-sm text-gray-400">
            You don’t have any assigned tasks right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border border-transparent hover:border-cyan-500 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="p-8 flex flex-col gap-2 justify-center items-center">
                <BiTask className="text-4xl text-green-500" />

                <h3 className="text-xl font-medium text-gray-800 font-RobotoFlex">
                  {task.title}
                </h3>

                <p className="text-gray-600 text-sm">{task.description}</p>

                <span className="flex items-center text-sm font-medium">
                  {task.status === "completed" ? (
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                  ) : task.status === "pending" ? (
                    <Clock className="text-yellow-500 w-5 h-5 mr-2" />
                  ) : task.status === "in-progress" ? (
                    <Circle className="text-cyan-500 w-5 h-5 mr-2" />
                  ) : null}

                  <span className="capitalize px-3 py-1 rounded-full text-sm shadow bg-gray-100">
                    {task.status}
                  </span>
                </span>

                {/* STATUS DROPDOWN */}
                <div className="mt-2 w-full space-y-1">
                  <label className="font-Poppins text-sm">Select status</label>
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task._id, e.target.value as TaskStatus)
                    }
                    className="w-full text-sm border rounded-md px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTaskList;
