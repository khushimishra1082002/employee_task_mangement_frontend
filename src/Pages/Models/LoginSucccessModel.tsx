import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const LoginSuccessModal = ({ openLoginModel, setOpenLoginModel }) => {
  if (!openLoginModel) return null;
  const navigate = useNavigate();

  const handleLoginModel = () => {
    setOpenLoginModel(false);
    navigate("/dashboard");
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpenLoginModel(false)}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl p-6 w-80 text-center mx-auto space-y-4 relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              type: "spring",
              stiffness: 120,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-800 text-2xl hover:text-red-500 transition duration-300"
              onClick={() => setOpenLoginModel(false)}
            >
              <RxCross2 />
            </button>

            <motion.img
              src="https://static.vecteezy.com/system/resources/previews/010/011/934/non_2x/has-been-unlock-login-success-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
              alt="Success"
              className="w-32 mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            <h4 className="text-lg font-semibold text-gray-800 font-Inter">
              You have successfully logged in!
            </h4>

            <motion.button
              className="px-8 py-2 bg-green-500 text-white rounded-md shadow-lg hover:scale-105 hover:bg-green-600 transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoginModel}
            >
              OK
            </motion.button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default LoginSuccessModal;
