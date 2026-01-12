import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchUsers } from "../../Redux Toolkit/Fetatures/UserSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux Toolkit/app/Store";
import { deleteUser } from "../../Services/UserServices";
import { toast } from "react-toastify";


interface DeleteUserModelProps {
  openDeleteUserModel: boolean;
  setOpenDeleteUserModel: React.Dispatch<React.SetStateAction<boolean>>;
  getDeleteId: string;
}

const DeleteUserModel: React.FC<DeleteUserModelProps> = ({
  openDeleteUserModel,
  setOpenDeleteUserModel,
  getDeleteId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  console.log("getDeleteId",getDeleteId);
  

  const getToken = () => sessionStorage.getItem("token")?.trim() || "";

  const handleDeleteDatas = async () => {
    try {
      await deleteUser(getDeleteId);
      toast.success("User data deleted successfully!");
      dispatch(fetchUsers());
      setOpenDeleteUserModel(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <>
      <AnimatePresence>
        {openDeleteUserModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <div className="bg-white p-6 rounded-md shadow-md text-center">
              <h2 className="text-lg font-bold mb-4 font-Poppins">
                Confirm Delete
              </h2>
              <p className="mb-5 font-RobotoFlex">
                Are you sure you want to delete this user?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteDatas}
                  className="bg-red-500 text-white py-2 px-4 rounded-md font-Poppins"
                >
                  Delete
                </button>
                <button
                  onClick={() => setOpenDeleteUserModel(false)}
                  className="bg-gray-300 py-2 px-4 rounded-md font-Poppins"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeleteUserModel;
