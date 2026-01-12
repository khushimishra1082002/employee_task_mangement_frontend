import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import EditUserForm from "../user/EditUserForm";

// ✅ Props type
interface EditUserModelProps {
  openEditUserModel: boolean;
  setOpenEditUserModel: React.Dispatch<React.SetStateAction<boolean>>;
  getEditId: string | null;
}

const EditUserModel: React.FC<EditUserModelProps> = ({
  openEditUserModel,
  setOpenEditUserModel,
  getEditId,
}) => {
  if (!openEditUserModel || !getEditId) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
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
          {/* Close button */}
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
            onClick={() => setOpenEditUserModel(false)}
          >
            <X className="text-xl" />
          </button>

          {/* Edit form */}
          <EditUserForm
            getEditId={getEditId}
            setOpenEditUserModel={setOpenEditUserModel}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditUserModel;
