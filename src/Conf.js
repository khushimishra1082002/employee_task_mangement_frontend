// const conf = {
//   RegisterUrl: String(import.meta.env.VITE_REGISTER_URL),
//   LoginUrl: String(import.meta.env.VITE_LOGIN_URL),
//   GetAllUsersUrl: String(import.meta.env.VITE_GETALL_USERS_URL),
//   GetAllTasksUrl: String(import.meta.env.VITE_GETALL_TASKS_URL),
//   AssignTaskUrl: String(import.meta.env.VITE_ASSIGN_TASK_URL),
//   searchUrl: String(import.meta.env.VITE_SEARCH_URL),
//   updateTaskStatusUrl: String(import.meta.env.VITE_UPDATE_TASKSTATUS_URL),
//   AddUserUrl: String(import.meta.env.VITE_ADDUSER_URL),
//   UpdateUserDetailUrl: String(import.meta.env.VITE_UPDATE_USER_DETAIL_URL),
//   DeleteUserUrl: String(import.meta.env.VITE_DELETE_USER_URL),
//   DeleteTaskUrl: String(import.meta.env.VITE_DELETE_TASK_URL),
//   UpdateTaskUrl: String(import.meta.env.VITE_UPDATE_TASK_URL),
//   singleTaskUrl: String(import.meta.env.VITE_SINGLE_TASK_URL),
//   searchByUserID: String(import.meta.env.VITE_USER_SEARCH_ID_URL),
//   uploadUrl: String(import.meta.env.VITE_UPLOAD_URL),
// };

const conf = {
  BaseUrl: import.meta.env.VITE_API_BASE_URL,
  LoginUrl: "/auth/login",
  RegisterUrl: "/auth/register",
  ChangePasswordUrl: "/auth/change-password",
  AllUsersUrl: "/user/allUsers",
  AddUserUrl: "/user/addUser",
  SingleUserUrl: "/user/singleUser",
  DeleteUserUrl: "/user/deleteUser",
  EditUserUrl: "/user/editUser",
  GetUserByRole: "/user/getUsersByRole",
  ChangeRoleUrl:"/user/change-role",
  GetAllTaskUrl: "/task/getAllTask",
  AssignTaskUrl: "/task/asignTask",
  SingleTaskUrl: "/task/getSingleTask",
  EditTaskUrl: "/task/updatetask",
  DeleteTaskUrl: "/task/deletetask",
  MyTaskUrl: "/employeeTask/myTask",
  EmployeeUpdateTaskStatus: "/employeeTask/employeeupdateTaskStatus",
  MyProfileUrl: "/profile/me",
  EditProfileUrl: "/profile/updateProfile",
  ImageBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
  UploadUrl: "/uploads",
};

console.log("Base URL:", conf.BaseUrl);

export default conf;
