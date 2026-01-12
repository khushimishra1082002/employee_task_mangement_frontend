import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import ErrorMessagess from "./ErrorMessagess";
import { motion } from "framer-motion";
import RegisterSuccessModal from "./Models/RegisterSuccessModel";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Services/AuthService";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
  role: string;
  image: File | null;
}

interface registerProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<registerProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [hide, setHide] = useState<boolean>(true)
  const [openRegiterModel, setOpenRegisterModel] = useState<boolean>(false);

  const initialValues: RegisterValues = {
    name: "",
    email: "",
    password: "",
    role: "employee",
    image: null,
  };

  const onSubmit = async (
    values: RegisterValues,
    onSubmitProps: FormikHelpers<RegisterValues>
  ) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("role", values.role);

      if (values.image) {
        formData.append("image", values.image);
      }

      const result = await registerUser(formData);

      if (result.success) {
        setOpenRegisterModel(true);
        onSubmitProps.resetForm();

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        setTimeout(() => {
          setIsLoggedIn(false);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      onSubmitProps.setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(8, "Must contain at least 8 characters")
      .required(" Required"),
  });

  return (
    <>
      <div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form
                className="border border-white/90 w-96 m-auto p-7 rounded-xl 
            shadow-2xl grid grid-cols-1 gap-4 items-center transition-all 
            duration-500 ease-in-out transform scale-95 animate-fade-in"
              >
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-xl font-Poppins font-semibold text-center"
                >
                  Create Your Account
                </motion.h2>

                {/* Image Upload */}
                <div className="flex flex-col gap-1">
                  <label className="font-Poppins font-medium">
                    Upload Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "image",
                        e.currentTarget.files?.[0] || null
                      )
                    }
                    className="p-2 rounded-md font-Poppins border border-black/30"
                  />
                </div>

                <div className="space-y-3">
                  {/* Name Field */}
                  <motion.div
                    animate={
                      formik.errors.email && formik.touched.email
                        ? { x: [0, -5, 5, -5, 0] }
                        : {}
                    }
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1"
                  >
                    <label className="font-Poppins font-medium " htmlFor="name">
                      Enter Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter Your Name"
                      className="p-2 rounded-md font-Poppins border border-black/30"
                    />
                    <div className="error">
                      <ErrorMessage name="name" component={ErrorMessagess} />
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    animate={
                      formik.errors.email && formik.touched.email
                        ? { x: [0, -5, 5, -5, 0] }
                        : {}
                    }
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1"
                  >
                    <label
                      className="font-Poppins font-medium "
                      htmlFor="email"
                    >
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
                    animate={
                      formik.errors.email && formik.touched.email
                        ? { x: [0, -5, 5, -5, 0] }
                        : {}
                    }
                    transition={{ duration: 0.2 }}
                    className="relative flex flex-col gap-1"
                  >
                    <label
                      className="font-Poppins font-medium "
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
                      <ErrorMessage
                        name="password"
                        component={ErrorMessagess}
                      />
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                </div>

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
                  Create Account
                </motion.button>

                {/* Already have an account? */}
                <div className="flex justify-center gap-2">
                  <span className="font-Poppins font-medium">
                    Already have an account?
                  </span>
                  <motion.button
                    onClick={() => setIsLoggedIn(false)}
                    className="text-teal-500 font-Poppins font-bold hover:underline text-[17px] "
                    whileHover={{ scale: 1.05, color: "#ff4757" }}
                  >
                    Login
                  </motion.button>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
        <div>
          <RegisterSuccessModal
            openRegiterModel={openRegiterModel}
            setOpenRegisterModel={setOpenRegisterModel}
          />
        </div>
      </div>
    </>
  );
};

export default Register;
