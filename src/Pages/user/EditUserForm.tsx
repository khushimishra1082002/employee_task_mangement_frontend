import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import ErrorMessagess from "../ErrorMessagess";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { AppDispatch } from "../../Redux Toolkit/app/Store";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../Redux Toolkit/Fetatures/UserSlice";
import { fetchSingleUserDetail } from "../../Services/UserServices";
import { updateUserDetail } from "../../Services/UserServices";
import { toast } from "react-toastify";

interface UserValues {
  name: string;
  email: string;
  role: string;
  password: string;
}

const roles = [
  { label: "Employee", value: "employee" },
  { label: "Admin", value: "admin" },
  { label: "Subadmin", value: "subadmin" },
];

interface EditUserFormProps {
  getEditId: string;
  setOpenEditUserModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  getEditId,
  setOpenEditUserModel,
}) => {
  const [singleUserData, setSingleUserData] = useState<UserValues | null>(null);
  console.log("singleUserData", singleUserData);
  const [hide, setHide] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (!token) {
          console.error("No token found");
          return;
        }

    
        const details = await fetchSingleUserDetail(getEditId);

        console.log("details", details);

        if (details) {
          const { name, email, role, password } = details;
          setSingleUserData({ name, email, role, password });
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching user:", error.message);
        } else {
          console.error("Unknown error occurred");
        }
      }
    };

    if (getEditId) {
      getUserData();
    }
  }, [getEditId, token]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    // email: Yup.string().email("Invalid email format").required("Required"),
    // role: Yup.string().required("Required"),
  });

  const onSubmit = async (
    values: UserValues,
    onSubmitProps: FormikHelpers<UserValues>
  ) => {
    try {
      console.log("values", values);

      const response = await updateUserDetail(getEditId, values);

      if (response) {
        console.log("User updated successfully:", response);
        // alert("User updated successfully");
        toast.success("User Detail updated successfully!");
        dispatch(fetchUsers());
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
        setOpenEditUserModel(false);
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="">
      <h2 className="text-xl text-center font-Poppins font-medium">
        Edit User
      </h2>

      {singleUserData ? (
        <Formik
          initialValues={singleUserData}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {(formik) => (
            <Form className="space-y-5">
              <div className="flex flex-col gap-1">
                <label className="text-left" htmlFor="name">
                  Enter Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="p-2 border border-black/25 rounded-md "
                />
                <ErrorMessage name="name" component={ErrorMessagess} />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-left" htmlFor="email">
                  Enter Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="p-2 border border-black/25 rounded-md"
                />
                <ErrorMessage name="email" component={ErrorMessagess} />
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
                <label className="text-left" htmlFor="role">
                  Select Role
                </label>
                <Field
                  as="select"
                  name="role"
                  className="p-2 border rounded-md border-black/25"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="role" component={ErrorMessagess} />
              </div>

              <button
                type="submit"
                className="p-2 bg-blue-600 text-white w-full rounded-md"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <p className="text-center text-gray-600">Loading user data...</p>
      )}
    </div>
  );
};

export default EditUserForm;
