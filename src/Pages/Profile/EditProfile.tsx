import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ErrorMessagess from "../ErrorMessagess";
import { getUserImageUrl } from "../../Services/ImageService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux Toolkit/app/Store"; // make sure path is correct
import {
  fetchProfile,
  updateProfile,
} from "../../Redux Toolkit/Fetatures/ProfileSlice";

interface FormValues {
  name: string;
  email: string;
  image: File | null;
}

const EditProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.profile.user);
  const [loading, setLoading] = useState(true);

  // local preview for image before submitting
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) await dispatch(fetchProfile());
      setLoading(false);
    };
    loadProfile();
  }, [user, dispatch]);

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (!user)
    return <div className="text-center text-red-500">User not found</div>;

  const initialValues: FormValues = {
    name: user.name,
    email: user.email,
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      if (values.image) formData.append("image", values.image);

      const updatedUser = await dispatch(updateProfile(formData)).unwrap(); // unwrap to get payload
      setPreviewImage(null); // clear local preview

      toast.success("Profile updated successfully");
      actions.setSubmitting(false);

      // navigate only if needed
      navigate("/dashboard/profiles");
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to update profile");
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white w-9/12 m-auto space-y-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ setFieldValue, values }) => (
          <Form className="shadow-lg p-8 rounded-xl space-y-6">
            {/* Profile Image */}
            <div className="flex gap-4 items-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border">
                <img
                  src={
                    previewImage
                      ? URL.createObjectURL(previewImage) // show selected image
                      : user?.image // show current image from backend
                  }
                  className="w-full h-full object-cover"
                />

                <label className="absolute bottom-1 right-1 bg-white p-2 rounded-full cursor-pointer shadow-md hover:scale-110 transition">
                  <Camera className="w-5 h-5 text-cyan-600" />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      if (e.currentTarget.files && e.currentTarget.files[0]) {
                        const file = e.currentTarget.files[0];
                        setPreviewImage(file);
                        setFieldValue("image", file);
                      }
                    }}
                  />
                </label>
              </div>

              <div>
                <h4 className="text-2xl font-medium">{user.name}</h4>
                <span className="capitalize bg-cyan-500 text-white px-3 py-1 rounded-full text-sm">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 col-span-2">
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="p-[10px] border border-black/20 rounded-md text-sm"
                />
                <ErrorMessage name="name" component={ErrorMessagess} />
              </div>

              <div className="flex flex-col gap-1 col-span-2">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="p-[10px] border border-black/20 rounded-md text-sm"
                />
                <ErrorMessage name="email" component={ErrorMessagess} />
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-2 rounded"
              >
                Update Profile
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;
