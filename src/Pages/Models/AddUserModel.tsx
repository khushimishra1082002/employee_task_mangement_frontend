import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import AddUsersForm from "../user/AddUsersForm";

const AddUserModel = ({ openAddUserModel,setOpenAddUserModel }) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50
          overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-md shadow-2xl p-9 w-[45vw] text-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
              onClick={() => setOpenAddUserModel(false)}
            >
              <X className="text-xl" />
            </button>
            <div>
              <AddUsersForm setOpenAddUserModel={setOpenAddUserModel} />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default AddUserModel;
