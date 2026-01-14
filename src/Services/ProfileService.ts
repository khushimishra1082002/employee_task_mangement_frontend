// ProfileService.ts
import api from "./api";
import conf from "../Conf";

export const getMyProfile = async () => {
  try {
    const response = await api.get(conf.MyProfileUrl, {
      headers: { requiresAuth: true },
    });
    console.log("API Response:", response.data);
    return response.data; 
  } catch (error:any) {
    console.error("Error fetching profile:", error.response?.data || error.message);
    throw error;
  }
};

export const updateMyProfile = async (formData: FormData) => {
  try {
    const response = await api.put(conf.EditProfileUrl, formData, {
      headers: {
        requiresAuth: true,
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data; 
  } catch (error:any) {
    console.error("Error updating profile:", error.response?.data || error.message);
    throw error;
  }
};
