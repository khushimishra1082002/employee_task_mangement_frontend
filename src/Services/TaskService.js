import api from "./api";
import conf from "../Conf";

export const getAllTasks = async () => {
  try {
    const response = await api.get(conf.GetAllTaskUrl);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching tasks:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get Single Task Detail
export const fetchSingleTaskDetail = async (taskId) => {
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
  } catch (error) {
    console.error(
      "Error in fetchSingleTaskDetail:",
      error.response?.data || error.message
    );
    return null;
  }
};

// Add a new task (requires token)
export const assignNewTask = async (values) => {
  try {
    const response = await api.post(conf.AssignTaskUrl, values, {
      headers: { requiresAuth: true },
    });
    console.log("Task added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error.response?.data || error.message);
    throw error;
  }
};

// Update task data (requires token)
export const updateTaskDetail = async (taskId, taskData) => {
  try {
    const response = await api.put(
      // ✅ await added
      `${conf.EditTaskUrl}/${taskId}`,
      taskData,
      {
        headers: { requiresAuth: true },
      }
    );

    console.log("Task updated successfully:", response.data);
    return response.data; // { message, task }
  } catch (error) {
    console.error(
      "Error updating task:",
      error.response?.data || error.message
    );
    return null;
  }
};

// Delete a task (requires token)
export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`${conf.DeleteTaskUrl}/${id}`, {
      headers: { requiresAuth: true },
    });

    console.log("Task deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting task:",
      error.response?.data || error.message
    );
    throw error;
  }
};
