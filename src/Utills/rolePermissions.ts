import { IconType } from "react-icons";
import { MdDashboard } from "react-icons/md";
import { FaUser, FaPlus, FaRegListAlt } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";

export interface MenuItem {
  name: string;
  path: string;
  icon: IconType; 
}

export type RoleMenus = {
  admin: MenuItem[];
  subadmin: MenuItem[];
  employee: MenuItem[];
};

export const roleMenus: RoleMenus = {
  admin: [
    { name: "Dashboard", path: "/dashboard", icon: MdDashboard },
    { name: "My Profile", path: "/dashboard/profiles", icon: FaUser },
    {
      name: "Change Password",
      path: "/dashboard/change-password",
      icon: RiLockPasswordLine,
    },
    {
      name: "Assign Tasks",
      path: "/dashboard/assignTasks",
      icon: FaPlus,
    },
    {
      name: "User Management",
      path: "/dashboard/allUser",
      icon: FaUser,
    },
    {
      name: "Task Management",
      path: "/dashboard/allTask",
      icon: SiGoogletasks,
    },
  ],

  subadmin: [
    { name: "Dashboard", path: "/dashboard", icon: MdDashboard },
    {
      name: "Task Management",
      path: "/dashboard/allTask",
      icon: SiGoogletasks,
    },
    { name: "My Profile", path: "/dashboard/profiles", icon: FaUser },
    {
      name: "Change Password",
      path: "/dashboard/change-password",
      icon: RiLockPasswordLine,
    },
  ],

  employee: [
    { name: "Dashboard", path: "/dashboard", icon: MdDashboard },
    { name: "My Profile", path: "/dashboard/profiles", icon: FaUser },
    {
      name: "Change Password",
      path: "/dashboard/change-password",
      icon: RiLockPasswordLine,
    },
    {
      name: "My all tasks list",
      path: "/dashboard/myTask",
      icon: FaRegListAlt,
    },
  ],
};
