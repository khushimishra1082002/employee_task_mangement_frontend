import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PageNotFound = () => {
  return (
    <>
      <div className="relative w-full h-screen">
        <img
          className="w-full h-full object-cover"
          src="https://t3.ftcdn.net/jpg/02/94/52/66/360_F_294526635_8Fc9IbBHWOC83JsiFNRNx5VivafEjiyi.jpg"
          alt="Page Not Found"
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex flex-col 
        justify-center items-center gap-2 text-center px-4"
        >
          <h2 className="text-4xl md:text-5xl text-white font-bold animate-bounce font-Roboto">
            404 - Page Not Found
          </h2>
          <p className="text-white text-lg md:text-xl mb-4 font-RobotoFlex">
            Oops ! The page you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="px-6 py-2 rounded-md bg-gradient-to-r from-orange-500 to-red-500 
           duration-300 text-white font-Poppins
          hover:scale-105 transition flex items-center gap-1 font-medium"
          >
            <ArrowLeft size={20} className="animate-pulse" />
            Go To Home Page
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
