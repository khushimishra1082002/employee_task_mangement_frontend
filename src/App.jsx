import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import IsLoggedin from "./Pages/IsLoggedin";
import PageNotFound from "./Pages/PageNotFound";
import AllUsers from "./Pages/user/AllUsers";
import DashboardData from "./Pages/DashboardData";
import AllTasks from "./Pages/Task/AllTasks";
import MainDashboardPage from "./Components/MainDashboardPage";
import AddUsersForm from "./Pages/user/AddUsersForm";
import EditUserForm from "./Pages/user/EditUserForm";
import EditTasks from "./Pages/Task/EditTasks";
import AddTasks from "./Pages/Task/AssignedTasks";
import LoginSucccessModel from "./Pages/Models/LoginSucccessModel";
import RegisterSuccessModel from "./Pages/Models/RegisterSuccessModel";
import Profile from "./Pages/Profile/Profile";
import Notifications from "./Pages/Notifications";
import EditProfile from "./Pages/Profile/EditProfile";
import EditTaskModel from "./Pages/Models/EditTaskModel";
import EmployeeCompletedTask from "./Pages/Task/EmployeeCompletedTask";
import EmployeePendingTask from "./Pages/Task/EmployeePendingTask";
import AssignedTasks from "./Pages/Task/AssignedTasks";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyTaskList from "./Pages/Task/MyTaskList";
import ChangePassword from "./Components/ChangePassword";
import Unauthorized from "./Components/Unauthorized";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/isLogggedin" element={<IsLoggedin />} />
        <Route index element={<IsLoggedin />} />
        <Route path="dashboard" element={<MainDashboardPage />}>
          <Route index element={<DashboardData />} />
          <Route path="dashboardData" element={<DashboardData />} />
          <Route
            path="allUser"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="allTask"
            element={
              <ProtectedRoute allowedRoles={["admin", "subadmin"]}>
                <AllTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="assignTasks"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AssignedTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="myTask"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <MyTaskList />
              </ProtectedRoute>
            }
          />

          <Route path="addUsersForm" element={<AddUsersForm />} />
          <Route path="editUsersForm/:id" element={<EditUserForm />} />
          <Route path="editTasks/:id" element={<EditTasks />} />
          <Route path="loginmodel" element={<LoginSucccessModel />} />
          <Route path="registermodel" element={<RegisterSuccessModel />} />
          <Route path="profiles" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="editTaskModel" element={<EditTaskModel />} />
          <Route
            path="employeeCompltedTasks"
            element={<EmployeeCompletedTask />}
          />
          <Route
            path="employeePendingTasks"
            element={<EmployeePendingTask />}
          />
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
