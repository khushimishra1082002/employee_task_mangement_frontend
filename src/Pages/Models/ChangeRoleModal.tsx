import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { changeRole } from "../../Services/UserServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux Toolkit/app/Store";
import { fetchUsers } from "../../Redux Toolkit/Fetatures/UserSlice";

interface ChangeRoleModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  currentRole: string;
}

const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({
  open,
  setOpen,
  userId,
  currentRole,
}) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateRole = async () => {
    if (!selectedRole || selectedRole === currentRole) return;

    setLoading(true);

    const res = await changeRole(userId, selectedRole);

    setLoading(false);

    if (res) {
      toast.success("User role updated successfully 🎉");

      dispatch(fetchUsers());

      setOpen(false);
    } else {
      toast.error("Failed to update role ");
    }
  };

  return (
    <AnimatePresence>
      {open && (
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
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              onClick={() => setOpen(false)}
            >
              <X />
            </button>

            <h2 className="text-lg font-semibold mb-4">Change User Role</h2>

            <div className="space-y-6 text-left">
              {/* Current Role */}
              <div className="bg-gray-100 rounded-md p-4">
                <p className="text-sm text-gray-500">Current Role</p>
                <p className="text-lg font-semibold capitalize">
                  {currentRole}
                </p>
              </div>

              {/* Select Role */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Select New Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="admin">Admin</option>
                  <option value="subadmin">Sub Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdateRole}
                  disabled={loading || selectedRole === currentRole}
                  className="px-5 py-2 bg-yellow-600 text-white rounded-md disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Role"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChangeRoleModal;
