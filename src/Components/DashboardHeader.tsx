import React, { useState, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { decodeToken } from "../Utills/DecodeToken";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux Toolkit/app/Store";
import { fetchProfile } from "../Redux Toolkit/Fetatures/ProfileSlice";
import { getUserImageUrl } from "../Services/ImageService";
import { logout } from "../Redux Toolkit/Fetatures/ProfileSlice";

interface NavbarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardHeader: React.FC<NavbarProps> = ({ open, setOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.profile);

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const token = sessionStorage.getItem("token");
  console.log("token", token);

  const decoded = decodeToken(token);
  console.log("decoded", decoded);

  useEffect(() => {
    if (!user) dispatch(fetchProfile());
  }, [user, dispatch]);

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div
        className="flex justify-between gap-4 items-center h-full px-6
       shadow bg-white z-40 sticky top-0"
      >
        <div className="flex gap-3 items-center ">
          {!open ? (
            <button
              onClick={() => setOpen(true)}
              className="text-3xl
             duration-300  lg:hidden"
            >
              <MdMenu />
            </button>
          ) : (
            <RxCross2
              onClick={() => setOpen(false)}
              className="text-3xl  cursor-pointer lg:hidden"
            />
          )}

          <div className="text-xl font-Poppins font-medium tracking-wider">
            Task Dashboard
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Profile */}
          <div
            onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
            className="relative flex gap-2 items-center py-4 space-y-2 cursor-pointer"
          >
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full  relative">
                <img
                  className="w-full h-full rounded-full"
                  src={
                    user?.image ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  }
                  alt="Profile"
                />
                <div
                  className=" w-2 h-2 bg-green-500 absolute left-7  top-1 
                rounded-full"
                ></div>
              </div>
              <h4 className="capitalize font-RobotoFlex">{user?.name}</h4>
            </div>

            {profileOpen && (
              <div
                className="absolute top-12 mt-2 w-40 bg-white
               dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50 "
              >
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2
                   w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 transition 
                   "
                >
                  <IoMdLogOut />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Search */}
          <div className=" ">
            <AiOutlineSearch className=" text-gray-600 text-2xl" />
          </div>

          {/* Notifications */}
          <div className="relative">
            <IoIosNotificationsOutline
              className="text-gray-600 dark:text-gray-300 text-2xl cursor-pointer"
              onMouseEnter={() => setNotificationOpen(true)}
              onMouseLeave={() => setNotificationOpen(false)}
            />

            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-[15px] h-[15px] rounded-full bg-red-500 text-white flex justify-center items-center text-[10px]">
              0
            </div>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50">
                <p className="px-2 text-sm py-2 text-gray-600 dark:text-gray-300">
                  No new notifications
                </p>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className=" ">
            <IoSettings className="text-xl text-gray-400" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
