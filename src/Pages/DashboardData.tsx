import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import { TbProgress } from "react-icons/tb";
import { MdPending } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BiTask } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../Redux Toolkit/Fetatures/TaskSlice";
import { fetchUsers } from "../Redux Toolkit/Fetatures/UserSlice";
import { RootState, AppDispatch } from "../Redux Toolkit/app/Store";
import { decodeToken } from "../Utills/DecodeToken";

interface Task {
  id: number;
  title: string;
  status: "pending" | "completed" | "in-progress";
}

interface User {
  id: number;
  name: string;
  role: string;
}

const DashboardData: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.profile);

  const navigate = useNavigate();
  const userRole = sessionStorage.getItem("role");
  const dispatch = useDispatch<AppDispatch>();

  const { tasks } = useSelector((state: RootState) => state.tasks) as {
    tasks: Task[];
  };
  console.log("tasks", tasks);

  const { users } = useSelector((state: RootState) => state.users) as {
    users: User[];
  };

  const token = sessionStorage.getItem("token");
  console.log("token", token);

  const decoded = decodeToken(token);
  console.log("decoded", decoded);

  const userId = decoded.id;

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, [dispatch]);


  const allEmployeessPendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;
  console.log("allEmployeessPendingTasks", allEmployeessPendingTasks);

  const allEmployeecompletedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  console.log("allEmployeecompletedTasks", allEmployeecompletedTasks);

  const allEmployeessinProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const allEmployeessTotalTasks = tasks.length;


  // Employee tasks status 

  const employeeAllTasks = tasks.filter(
    (task) => task.assigned_to?._id === userId
  )

  const pendingEmployeeTask = employeeAllTasks.filter(
    (task) => task.status === "pending"
  );

  const completedEmployeeTask = employeeAllTasks.filter(
    (task) => task.status === "completed"
  );
  const inProgressEmployeeTasks = employeeAllTasks.filter(
    (task) => task.status === "in-progress"
  );

  const dashboardItemsAdmin = [
    {
      icon: <FaUser className="text-4xl text-cyan-500" />,
      title: "Total Employee",
      count: allEmployeessTotalTasks,
      color: "from-cyan-500 to-cyan-200",
      route: "/tasks/in-progress",
    },
    {
      icon: <GrTasks className="text-4xl text-gray-600" />,
      title: "All Tasks",
      count: allEmployeessTotalTasks,
      color: "from-gray-500 to-gray-300",
      route: "/tasks",
    },
    {
      icon: <TbProgress className="text-4xl text-yellow-600" />,
      title: "In Progress",
      count: allEmployeessinProgressTasks,
      color: "from-yellow-500 to-yellow-300",
      route: "/tasks/in-progress",
    },
    {
      icon: <MdPending className="text-4xl text-red-600" />,
      title: "Pending",
      count: allEmployeessPendingTasks,
      color: "from-red-500 to-red-300",
      route: "/tasks/pending",
    },
    {
      icon: <SiTicktick className="text-4xl text-green-600" />,
      title: "Completed",
      count: allEmployeecompletedTasks,
      color: "from-green-500 to-green-300",
      route: "/tasks/completed",
    },
  ];

  const dashboardItemsSubadmin = [
    {
      icon: <GrTasks className="text-4xl text-gray-600" />,
      title: "All Tasks",
      count: allEmployeessTotalTasks,
      color: "from-gray-500 to-gray-300",
      route: "/tasks",
    },
    {
      icon: <TbProgress className="text-4xl text-yellow-600" />,
      title: "In Progress",
      count: allEmployeessinProgressTasks,
      color: "from-yellow-500 to-yellow-300",
      route: "/tasks/in-progress",
    },
    {
      icon: <MdPending className="text-4xl text-red-600" />,
      title: "Pending",
      count: allEmployeessPendingTasks,
      color: "from-red-500 to-red-300",
      route: "/tasks/pending",
    },
    {
      icon: <SiTicktick className="text-4xl text-green-600" />,
      title: "Completed",
      count: allEmployeecompletedTasks,
      color: "from-green-500 to-green-300",
      route: "/tasks/completed",
    },
  ];

  const dashboardItemsEmployee = [
    {
      icon: <GrTasks className="text-4xl text-gray-600" />,
      title: "My Tasks",
      count: employeeAllTasks.length, // ✅
      color: "from-gray-500 to-gray-300",
      route: "/tasks/my-tasks",
    },
    {
      icon: <MdPending className="text-4xl text-red-600" />,
      title: "Pending",
      count: pendingEmployeeTask.length,
      color: "from-red-500 to-red-300",
      route: "/dashboard/employeePendingTasks",
    },
    {
      icon: <SiTicktick className="text-4xl text-green-600" />,
      title: "Completed",
      count: completedEmployeeTask.length,
      color: "from-green-500 to-green-300",
      route: "/dashboard/employeeCompletedTasks",
    },
    {
      icon: <TbProgress className="text-4xl text-blue-600" />,
      title: "In Progress",
      count: inProgressEmployeeTasks.length,
      color: "from-blue-500 to-blue-300",
      route: "/dashboard/employeeInProgressTasks",
    },
  ];

  const dashboardItems =
    userRole === "admin"
      ? dashboardItemsAdmin
      : userRole === "subadmin"
      ? dashboardItemsSubadmin
      : dashboardItemsEmployee;

  return (
    <div className="space-y-2">
      <div className="p-6 space-y-5 bg-white">
        <h1 className="text-xl font-Roboto font-medium flex items-center gap-2 text-gray-800">
          <BiTask className="text-2xl text-green-500" />
          Task Overview
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dashboardItems.map((item, index) => (
            <motion.div
              key={index}
              onClick={() => navigate(item.route)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`relative flex flex-col justify-center items-center gap-2 
                bg-gradient-to-br ${item.color} text-white shadow-lg rounded-xl p-8 
                cursor-pointer transition-transform`}
            >
              {item.icon}
              <span className="text-base font-[Poppins] font-semibold">
                {item.title}
              </span>
              <span className="text-3xl font-bold">{item.count}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardData;
