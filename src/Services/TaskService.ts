import api from "./api";
import conf from "../Conf";

interface AssignTaskValues {
  title: string;
  description: string;
  status: string;
  assigned_to: string; 
}
interface TaskValues {
  title: string;
  status: string;
  description: string;
  name: string; 
  created_at?: string; 
}

// TaskService.ts

export interface UpdateTaskPayload {
  title: string;
  description: string;
  status: string;
}

export const getAllTasks = async () => {
  try {
    const response = await api.get(conf.GetAllTaskUrl);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error fetching tasks:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchSingleTaskDetail = async (taskId:string) => {
  console.log("fetchSingleTaskDetail called with ID:", taskId);

  try {
    const response = await api.get(`${conf.SingleTaskUrl}/${taskId}`, {
      headers: { requiresAuth: true },
    });
    console.log(" Full API Response:", response);

    if (response?.data) {
      console.log("Task Data:", response.data);
      return response.data;
    } else {
      console.warn("No data in response");
      return null;
    }
  } catch (error:any) {
    console.error(
      "Error in fetchSingleTaskDetail:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const assignNewTask = async (values:AssignTaskValues) => {
  try {
    const response = await api.post(conf.AssignTaskUrl, values, {
      headers: { requiresAuth: true },
    });
    console.log("Task added successfully:", response.data);
    return response.data;
  } catch (error:any) {
    console.error("Error adding task:", error.response?.data || error.message);
    throw error;
  }
};

export const updateTaskDetail = async (taskId : string, taskData:UpdateTaskPayload) => {
  try {
    const response = await api.put(
      `${conf.EditTaskUrl}/${taskId}`,
      taskData,
      {
        headers: { requiresAuth: true },
      }
    );

    console.log("Task updated successfully:", response.data);
    return response.data; 
  } catch (error:any) {
    console.error(
      "Error updating task:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const deleteTask = async (id : string) => {
  try {
    const response = await api.delete(`${conf.DeleteTaskUrl}/${id}`, {
      headers: { requiresAuth: true },
    });

    console.log("Task deleted successfully:", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error deleting task:",
      error.response?.data || error.message
    );
    throw error;
  }
};
