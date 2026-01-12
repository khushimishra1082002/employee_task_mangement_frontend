import api from "./api";
import conf from "../Conf";

console.log("api", api);

export const registerUser = async (formData: FormData) => {
  console.log("Register URL:", conf.BaseUrl + conf.RegisterUrl);

  const response = await api.post(conf.RegisterUrl, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return { success: true, user: response.data };
};

export const loginUser = async (values: any) => {
  const response = await api.post(conf.LoginUrl, values);
  return response.data;
};

export const changePassword = async (values) => {
  const response = await api.post(
    conf.ChangePasswordUrl,
    {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    },
    {
      headers: { requiresAuth: true },
    }
  );
  return { success: true, user: response.data };
};
