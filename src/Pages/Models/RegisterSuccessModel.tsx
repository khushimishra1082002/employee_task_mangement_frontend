import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

interface RegisterSuccessModalProps {
  openRegiterModel: boolean;
  setOpenRegisterModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterSuccessModal: React.FC<RegisterSuccessModalProps> = ({
  openRegiterModel,
  setOpenRegisterModel,
}) => {
  const handleClose = () => {
    setOpenRegisterModel(false);
  };

  return (
    <>
      <AnimatePresence>
        {openRegiterModel && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                <RxCross2 size={24} />
              </button>
              <h2 className="text-xl font-bold mb-2 text-center text-green-600">
                Registration Successful!
              </h2>
              <p className="text-center text-gray-700 mb-4">
                Your account has been created successfully. You can now log in.
              </p>
              <div className="flex justify-center">
                <motion.button
                  onClick={handleClose}
                  className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RegisterSuccessModal;
