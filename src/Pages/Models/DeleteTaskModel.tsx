import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchTasks } from "../../Redux Toolkit/Fetatures/TaskSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux Toolkit/app/Store";
import { deleteTask } from "../../Services/TaskService";
import { toast } from "react-toastify";

interface DeleteTaskModelProps {
  openDeleteModel: boolean;
  setOpenDeleteModel: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDeleteId: string;
}

const DeleteTaskModel: React.FC<DeleteTaskModelProps> = ({
  openDeleteModel,
  setOpenDeleteModel,
  selectedDeleteId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const getToken = () => sessionStorage.getItem("token")?.trim() || "";

  const handleDeleteDatas = async () => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token found");
      await deleteTask(selectedDeleteId);
      toast.success("Task Deleted successfully!");
      dispatch(fetchTasks());
      setOpenDeleteModel(false);
    } catch (error) {
      console.error("Error deleting Task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <>
      <AnimatePresence>
        {openDeleteModel && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center lg:z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl p-6 w-80 text-center mx-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h4 className="text-lg font-semibold text-gray-800">
                Are you sure you want to delete this task?
              </h4>
              <p className="text-sm text-gray-500 mt-2">
                This action cannot be undone.
              </p>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => setOpenDeleteModel(false)}
                  className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteDatas}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeleteTaskModel;
