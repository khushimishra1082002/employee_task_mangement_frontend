import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import ErrorMessagess from "../Pages/ErrorMessagess";
import { changePassword } from "../Services/AuthService";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";

interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password required"),
    newPassword: Yup.string()
      .min(8, "Minimum 8 characters")
      .required("New password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password required"),
  });

  const onSubmit = async (
    values: ChangePasswordValues,
    actions: FormikHelpers<ChangePasswordValues>
  ) => {
    try {
      await changePassword(values);
      alert("Password changed successfully");
      actions.resetForm();
      navigate("/profiles");
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="py-6 w-full h-full ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=""
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form
              className="w-11/12 md:w-7/12 m-auto 
              p-8 rounded-xl shadow-lg grid grid-cols-1 gap-6 items-center bg-white"
            >
              <div className="flex gap-2 items-center">
                <RiLockPasswordLine className="text-2xl" />
                <h2 className="text-xl font-body font-medium">
                  Change Password
                </h2>
              </div>
              {/* Current Password */}
              <div className="flex flex-col gap-1">
                <label className="font-medium">Current Password</label>
                <div className="relative">
                  <Field
                    name="currentPassword"
                    type={hide ? "password" : "text"}
                    className="p-2 rounded-md font-Poppins border border-black/30 w-full"
                    placeholder="Current Password"
                  />
                  {hide ? (
                    <AiFillEyeInvisible
                      onClick={() => setHide(false)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                    />
                  ) : (
                    <AiFillEye
                      onClick={() => setHide(true)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                    />
                  )}
                </div>
                <ErrorMessage
                  name="currentPassword"
                  component={ErrorMessagess}
                />
              </div>

              {/* New Password */}
              <div className="flex flex-col gap-1">
                <label className="font-medium">New Password</label>
                <Field
                  name="newPassword"
                  type={hide ? "password" : "text"}
                  className="p-2 rounded-md font-Poppins border border-black/30"
                  placeholder="New Password"
                />
                <ErrorMessage name="newPassword" component={ErrorMessagess} />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <label className="font-medium">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type={hide ? "password" : "text"}
                  className="p-2 rounded-md font-Poppins border border-black/30"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component={ErrorMessagess}
                />
              </div>

              {/* Submit */}
              <motion.button
                whileHover={!formik.isSubmitting ? { scale: 1.05 } : {}}
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className={`p-2 text-white rounded bg-cyan-600
                  ${
                    !formik.isValid || formik.isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
              >
                Change Password
              </motion.button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
