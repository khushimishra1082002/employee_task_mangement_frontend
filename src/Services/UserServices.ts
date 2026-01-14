import api from "./api";
import conf from "../Conf";

export const getUsers = async () => {
  try {
    const response = await api.get(conf.AllUsersUrl, {
      headers: { requiresAuth: true },
    });

    console.log("API Response:", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error fetching users:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchSingleUserDetail = async (userId:string) => {
  try {
    const response = await api.get(`${conf.SingleUserUrl}/${userId}`, {
      headers: { requiresAuth: true },
    });

    console.log("Full Response:", response);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error fetching user:",
      error.response?.data || error.message
    );
    return null;
  }
};

interface UserValues {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const addUser = async (values:UserValues) => {
  try {
    if (!values) {
      throw new Error("No user data provided");
    }

    const response = await api.post(conf.AddUserUrl, values, {
      headers: { requiresAuth: true },
    });

    console.log("User added successfully:", response.data);
    return response.data;
  } catch (error:any) {
    console.error("Error adding user:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteUser = async (id:string) => {
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
  } catch (error:any) {
    console.error(
      "Error deleting user:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const updateUserDetail = async (userId :string, userData:UserValues) => {
  try {
    const response = await api.put(
      `${conf.EditUserUrl}/${userId}`,
      userData,
      {
        headers: { requiresAuth: true },
      }
    );

    return response.data;
  } catch (error:any) {
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

export const changeRole = async (userId:string, role:string) => {
  try {
    const response = await api.put(
      `${conf.ChangeRoleUrl}/${userId}`,
      { role }, 
      {
        headers: { requiresAuth: true },
      }
    );

    return response.data;
  } catch (error:any) {
    console.error(
      "Error updating role:",
      error.response?.data || error.message
    );
    return null;
  }
};




