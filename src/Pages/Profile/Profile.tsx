import React, { useEffect } from "react";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux Toolkit/app/Store";
import { fetchProfile } from "../../Redux Toolkit/Fetatures/ProfileSlice";
import { getUserImageUrl } from "../../Services/ImageService";

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status } = useSelector((state: RootState) => state.profile);

  // Fetch profile on mount
  useEffect(() => {
    if (!user) {
      dispatch(fetchProfile());
    }
  }, [user, dispatch]);

  if (status === "loading") {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-6 text-red-500">User not found!</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-cyan-500 to-blue-600 rounded-t-2xl p-6 text-white text-center">
        <div className="mx-auto w-32 h-32 rounded-full border-4 border-white overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={
              user?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            }
            alt="Profile"
          />
        </div>
        <h4 className="text-2xl font-semibold mt-4 font-Poppins">
          {user.name}
        </h4>
        <span className="text-base bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-3 py-1 rounded-full inline-block mt-2 shadow-md font-Poppins font-semibold capitalize">
          {user.role || "Employee"}
        </span>
      </div>

      {/* Profile Details */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
        <div className="flex items-center gap-2 font-Poppins">
          <span className="font-medium">Name:</span>
          <span className="text-gray-600 font-Poppins text-sm">
            {user.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Email:</span>
          <span className="text-gray-600 font-Poppins text-sm">
            {user.email}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Password:</span>
          <span className="text-gray-600">******</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Role:</span>
          <span className="text-gray-600 font-Poppins text-sm">
            {user.role || "Employee"}
          </span>
        </div>
      </div>

      {/* Edit Button */}
      <div className="text-center mb-4">
        <Link
          to="/dashboard/editProfile"
          className="flex items-center justify-center gap-2 bg-cyan-500 text-white rounded-md px-4 py-2 text-sm font-medium shadow-md hover:bg-cyan-600 transition transform hover:scale-105 w-36 font-Poppins"
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;
