import api from "../Services/api";
import conf from "../Conf";

export const getUsers = async () => {
  try {
    const response = await api.get(conf.AllUsersUrl, {
      headers: { requiresAuth: true },
    });

    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchSingleUserDetail = async (userId) => {
  try {
    const response = await api.get(`${conf.SingleUserUrl}/${userId}`, {
      headers: { requiresAuth: true },
    });

    console.log("Full Response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const addUser = async (values) => {
  try {
    if (!values) {
      throw new Error("No user data provided");
    }

    const response = await api.post(conf.AddUserUrl, values, {
      headers: { requiresAuth: true },
    });

    console.log("User added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteUser = async (id) => {
  if (!id) {
    throw new Error("User ID is required for delete");
  }

  try {
    const response = await api.delete(
      `${conf.DeleteUserUrl}/${id}`,
      {
        headers: { requiresAuth: true },
      }
    );

    console.log("User deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting user:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const updateUserDetail = async (userId, userData) => {
  try {
    const response = await api.put(
      `${conf.EditUserUrl}/${userId}`,
      userData,
      {
        headers: { requiresAuth: true },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const getEmployees = async () => {
  

  const response = await api.get(
    `${conf.GetUserByRole}?role=employee`,
     {
        headers: { requiresAuth: true },
      }
  );

  return response.data;
};

export const changeRole = async (userId, role) => {
  try {
    const response = await api.put(
      `${conf.ChangeRoleUrl}/${userId}`,
      { role }, // ✅ object me bhejo
      {
        headers: { requiresAuth: true },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating role:",
      error.response?.data || error.message
    );
    return null;
  }
};




