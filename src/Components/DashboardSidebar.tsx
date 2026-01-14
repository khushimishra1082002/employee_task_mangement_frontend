import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaRegListAlt, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { SiGoogletasks } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux Toolkit/app/Store";
import { fetchProfile } from "../Redux Toolkit/Fetatures/ProfileSlice";
import { getUserImageUrl } from "../Services/ImageService";
import { FiSettings } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { roleMenus } from "../Utills/rolePermissions";
import { logout } from "../Redux Toolkit/Fetatures/ProfileSlice";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardSidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state: RootState) => state.profile);

  console.log("user", user);

  const userRole = user?.role || sessionStorage.getItem("role");

  useEffect(() => {
    if (!user) dispatch(fetchProfile());
  }, [user, dispatch]);

  const menuOptions =
    roleMenus[userRole as "admin" | "subadmin" | "employee"] || [];

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(logout());
    navigate("/");
  };

  return (
    <div
      className={`fixed lg:relative top-[10vh] left-0 right-0 w-64 h-screen bg-white shadow-lg lg:top-0
        transition-transform duration-700 lg:translate-x-0 z-50 lg:z-0 ${
          open ? "translate-x-0 z-50 lg:z-0" : "-translate-x-full"
        }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-center h-[10vh] border-b border-gray-200 bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md">
        <h2 className="text-xl font-bold font-Poppins">Task Manager</h2>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center py-4 space-y-2">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={
              user?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            }
            alt="Profile"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h4 className="text-gray-900 font-semibold text-lg capitalize font-Roboto">
            {user?.name || "Guest"}
          </h4>
          <span className="text-cyan-600 text-sm font-semibold capitalize">
            {user?.role || "Employee"}
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <ul className="w-9/12 mx-auto space-y-1">
        {menuOptions.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={index}
              onClick={() => setOpen(false)}
              to={item.path}
              className={`flex items-center gap-4 p-2 rounded-sm transition-all cursor-pointer ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "hover:bg-cyan-100 hover:text-cyan-500"
              }`}
            >
              <span
                className={`text-lg ${
                  isActive ? "text-white" : "text-cyan-500"
                }`}
              >
                <Icon />
              </span>

              <li className="font-Poppins text-sm font-medium">{item.name}</li>
            </Link>
          );
        })}

        {/* Logout */}
        <li
          onClick={handleLogout}
          className="flex items-center gap-4 p-2 rounded-sm hover:bg-cyan-100 hover:text-cyan-500 transition-all cursor-pointer"
        >
          <span className="text-cyan-500 text-lg">
            <FaSignOutAlt />
          </span>
          <span className="font-Poppins text-sm font-medium text-gray-700">
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebar;
