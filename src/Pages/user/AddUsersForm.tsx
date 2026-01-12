import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import ErrorMessagess from "../ErrorMessagess";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux Toolkit/app/Store";
import { fetchUsers } from "../../Redux Toolkit/Fetatures/UserSlice";
import { addUser } from "../../Services/UserServices";
import { toast } from "react-toastify";

interface AddUsersFormProps {
  setOpenAddUserModel: (open: boolean) => void;
}

interface UserValues {
  name: string;
  email: string;
  password: string;
  role: string;
}

const roles = [
  { label: "Employee", value: "employee" },
  { label: "Admin", value: "admin" },
  { label: "Subadmin", value: "subadmin" },
];

const AddUsersForm: React.FC<AddUsersFormProps> = ({ setOpenAddUserModel }) => {
  const [hide, setHide] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: UserValues = {
    name: "",
    email: "",
    password: "",
    role: "employee",
  };

  const onSubmit = async (
    values: UserValues,
    onSubmitProps: FormikHelpers<UserValues>
  ) => {
    console.log("Form values:", values);
    try {
      const response = await addUser(values);
      console.log("User added successfully:", response);
      // alert("User added successfully");
      toast.success("User added successfully!");
      dispatch(fetchUsers());
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
      setOpenAddUserModel(false);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(8, "Must contain at least 8 characters")
      .required("Password is required"),
  });

  return (
    <>
      <div className="">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form className=" space-y-4 grid grid-cols-1">
              <h2 className="text-xl font-medium text-center font-Poppins">
                Add New User
              </h2>

              <div className="flex flex-col gap-1">
                <label className="text-left font-RobotoFlex" htmlFor="name">
                  Enter Name
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="p-2 border rounded-md font-RobotoFlex border-black/25"
                />
                <ErrorMessage
                  className="text-left"
                  name="name"
                  component={ErrorMessagess}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-left font-RobotoFlex" htmlFor="email">
                  Enter Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="p-2 border rounded-md font-RobotoFlex border-black/25"
                />
                <ErrorMessage
                  className="text-left"
                  name="email"
                  component={ErrorMessagess}
                />
              </div>

              <div className="relative flex flex-col gap-1">
                <label className="text-left font-RobotoFlex" htmlFor="password">
                  Enter Password
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={hide ? "password" : "text"}
                    placeholder="Your Password"
                    className="p-2 border rounded-md font-RobotoFlex border-black/25 w-full"
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
                <ErrorMessage
                  className="text-left"
                  name="password"
                  component={ErrorMessagess}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-left font-RobotoFlex" htmlFor="role">
                  Select Role
                </label>
                <Field
                  as="select"
                  name="role"
                  className="p-2 border rounded-md font-RobotoFlex border-black/25"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  className="text-left"
                  name="role"
                  component={ErrorMessagess}
                />
              </div>

              <div className="py-2">
                <button
                  type="submit"
                  className="p-2 bg-skin-primary font-Roboto font-medium hover:scale-110 duration-500 border-none rounded-sm text-white w-full disabled:bg-red-500 disabled:cursor-not-allowed"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddUsersForm;
