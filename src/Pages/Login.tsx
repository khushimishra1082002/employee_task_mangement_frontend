import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import ErrorMessagess from "./ErrorMessagess";
import LoginSucccessModel from "../Pages/Models/LoginSucccessModel";
import { loginUser } from "../Services/AuthService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux Toolkit/app/Store";
import { fetchProfile, logout } from "../Redux Toolkit/Fetatures/ProfileSlice";
import { useNavigate } from "react-router-dom";

interface LoginValues {
  email: string;
  password: string;
}

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [hide, setHide] = useState<boolean>(true);
  const [openLoginModel, setOpenLoginModel] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: LoginValues,
    onSubmitProps: FormikHelpers<LoginValues>
  ) => {
    try {
      
      dispatch(logout());

      const response = await loginUser(values);

      if (response.token) {
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("role", response.role);

    
        await dispatch(fetchProfile());

        alert("Login Successful");

        setOpenLoginModel(true);

        onSubmitProps.resetForm();

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      onSubmitProps.setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(8, "Must contain at least 8 characters")
      .required("Required"),
  });

  return (
    <>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-96 m-auto p-8 border border-white/90 rounded-xl shadow-2xl"
        >
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form className="grid gap-4">
                <div className=" flex flex-col items-center justify-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#14b8a6" />{" "}
                        {/* Teal-500 */}
                        <stop offset="100%" stopColor="#06b6d4" />{" "}
                        {/* Cyan-500 */}
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.93 0 3.5 1.57 3.5 3.5S13.93 12 12 12s-3.5-1.57-3.5-3.5S10.07 5 12 5zm0 14c-2.5 0-4.71-1.28-6-3.22 0-1.99 4-3.08 6-3.08s6 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"
                      fill="url(#gradient)"
                    />
                  </svg>

                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl font-Urbanist font-semibold text-center"
                  >
                    Login
                  </motion.h2>
                </div>

                {/* Email Field */}
                <motion.div
                  className="flex flex-col gap-1"
                  animate={
                    formik.errors.email && formik.touched.email
                      ? { x: [0, -5, 5, -5, 0] }
                      : {}
                  }
                  transition={{ duration: 0.2 }}
                >
                  <label className="font-Poppins font-medium" htmlFor="email">
                    Enter Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="p-2 rounded-md font-Poppins border border-black/30"
                  />
                  <div className="error">
                    <ErrorMessage name="email" component={ErrorMessagess} />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  className="relative flex flex-col gap-1"
                  animate={
                    formik.errors.password && formik.touched.password
                      ? { x: [0, -5, 5, -5, 0] }
                      : {}
                  }
                  transition={{ duration: 0.2 }}
                >
                  <label
                    className="font-Poppins font-medium"
                    htmlFor="password"
                  >
                    Enter Password
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      placeholder="Enter Your Password"
                      type={hide ? "password" : "text"}
                      className="w-full p-2 rounded-md pr-10 font-Poppins border border-black/30"
                    />
                    {hide ? (
                      <AiFillEyeInvisible
                        onClick={() => setHide(!hide)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-2xl cursor-pointer"
                      />
                    ) : (
                      <AiFillEye
                        onClick={() => setHide(!hide)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-2xl cursor-pointer"
                      />
                    )}
                  </div>
                  <div className="error">
                    <ErrorMessage name="password" component={ErrorMessagess} />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  whileHover={
                    !formik.isValid || formik.isSubmitting ? {} : { scale: 1.1 }
                  }
                  whileTap={
                    !formik.isValid || formik.isSubmitting ? {} : { scale: 0.9 }
                  }
                  className={`p-2 bg-gradient-to-r from-teal-400 to-cyan-600
               hover:from-cyan-600 hover:to-teal-400 shadow-xl hover:font-semibold duration-700
               font-Poppins font-medium border-none rounded-sm text-white w-full
               hover:shadow hover:shadow-cyan-400/60
               ${
                 !formik.isValid || formik.isSubmitting
                   ? "opacity-50 cursor-not-allowed"
                   : "cursor-pointer"
               }`}
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Login
                </motion.button>

                {/* Create Account Link */}
                <div className="flex justify-center gap-2">
                  <span className="font-Poppins font-medium">
                    Don't have an account?
                  </span>
                  <motion.button
                    onClick={() => setIsLoggedIn(true)}
                    className="text-teal-500 font-Poppins font-bold hover:underline text-[16px]"
                    whileHover={{ scale: 1.05, color: "#ff4757" }}
                  >
                    Register
                  </motion.button>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
        <div>
          <LoginSucccessModel
            openLoginModel={openLoginModel}
            setOpenLoginModel={setOpenLoginModel}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
