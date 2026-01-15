import api from "./api";
import conf from "../Conf";

console.log(conf.MyTaskUrl);


export const getMyTasks = async () => {
  try {
    const response = await api.get(conf.MyTaskUrl, {
      headers: { requiresAuth: true },
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching tasks:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export type TaskStatus = "pending" | "in-progress" | "completed";

export const employeeUpdateTaskStatus = async (
  taskId: string,
  status: TaskStatus
) => {
  try {
    const response = await api.put(
      `${conf.EmployeeUpdateTaskStatus}/${taskId}`,
      { status },
      {
        headers: { requiresAuth: true },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating task status:",
      error.response?.data || error.message
    );
    throw error;
  }
};
