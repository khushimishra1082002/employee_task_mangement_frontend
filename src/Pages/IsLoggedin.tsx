import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { motion } from "framer-motion";

const IsLoggedin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-[100vh] relative bg-gray-100 ">
      <div className="relative w-full h-full">
        <img
          src="https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg?cs=srgb&dl=pexels-pixabay-290595.jpg&fm=jpg"
          className="w-full h-full object-cover rounded-2xl shadow-lg"
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r
         from-black/60  to-black/40 
          flex flex-col justify-center items-center gap-3 text-white text-center p-6"
        >
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-bold drop-shadow-lg font-Urbanist"
          >
            Welcome to Our Platform
          </motion.h1>

          <motion.p
            className="text-sm max-w-md font-Poppins"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }} 
          >
            Streamline your workflow, assign tasks seamlessly, and track
            progress effortlessly—all in one powerful task management system.
          </motion.p>
        </div>
      </div>
      <div className="h-full p-6 flex flex-col justify-center items-center gap-4 bg-white">
        {isLoggedIn ? (
          <Register setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </div>
  );
};

export default IsLoggedin;
