import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../library/Api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import ProfileSidebar from "../profilesidebar/ProfileSidebar";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleOldPasswordVisibility = () =>
    setShowOldPassword(!showOldPassword);
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get("/user/details", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setEmail(response.data.email); // Set the email state
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to load user details.");
      }
    };

    fetchUserDetails();
  }, []);


  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old Password is required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("New Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm New Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await api.post(
          "/user/change-password",
          {
            current_password: values.oldPassword,
            new_password: values.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
  
        // Assuming the backend returns a message in the response
        const successMessage = response.data?.detail || "Password changed successfully!";
        toast.success(successMessage);
      } catch (error) {
        // Extracting custom error message from the backend
        const errorMessage = error.response?.data?.detail || "Failed to change password. Please try again.";
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });
  

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <ProfileSidebar />
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-gray-800 shadow rounded-lg p-4">
              <div className="mt-10 ml-10">
                <h1 className="text-indigo-400 font-bold text-2xl">
                  Change Password
                </h1>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mt-5">
                    <span className="text-gray-400 font-bold text-lg">
                      Email
                    </span>
                    <p className="text-gray-400 text-md">{ email || "Loading..."}</p>
                  </div>
                  <div className="mt-5 space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-1 relative">
                        <label
                          className="block text-sm font-bold text-gray-400"
                          htmlFor="old-password"
                        >
                          Old Password
                        </label>
                        <div className="relative">
                          <input
                            type={showOldPassword ? "text" : "password"}
                            id="old-password"
                            placeholder="Old Password"
                            {...formik.getFieldProps("oldPassword")}
                            className={`mt-2 block w-[50%] pr-10 border ${
                              formik.touched.oldPassword &&
                              formik.errors.oldPassword
                                ? "border-red-600"
                                : "border-gray-700"
                            } rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring`}
                          />
                          <span
                            onClick={toggleOldPasswordVisibility}
                            className="absolute inset-y-0 left-96 flex items-center pr-3 cursor-pointer text-gray-400"
                          >
                            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                        {formik.touched.oldPassword &&
                        formik.errors.oldPassword ? (
                          <div className="text-red-600 text-sm mt-1">
                            {formik.errors.oldPassword}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1 relative">
                        <label
                          className="block text-sm font-bold text-gray-400"
                          htmlFor="new-password"
                        >
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            id="new-password"
                            placeholder="New Password"
                            {...formik.getFieldProps("newPassword")}
                            className={`mt-2 block w-[50%] pr-10 border ${
                              formik.touched.newPassword &&
                              formik.errors.newPassword
                                ? "border-red-600"
                                : "border-gray-700"
                            } rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring`}
                          />
                          <span
                            onClick={toggleNewPasswordVisibility}
                            className="absolute inset-y-0 left-96 flex items-center pr-3 cursor-pointer text-gray-400"
                          >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                        {formik.touched.newPassword &&
                        formik.errors.newPassword ? (
                          <div className="text-red-600 text-sm mt-1">
                            {formik.errors.newPassword}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1 relative">
                        <label
                          className="block text-sm font-bold text-gray-400"
                          htmlFor="confirm-password"
                        >
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirm-password"
                            placeholder="Confirm New Password"
                            {...formik.getFieldProps("confirmPassword")}
                            className={`mt-2 block w-[50%] pr-10 border ${
                              formik.touched.confirmPassword &&
                              formik.errors.confirmPassword
                                ? "border-red-600"
                                : "border-gray-700"
                            } rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring`}
                          />
                          <span
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute inset-y-0 left-96 flex items-center pr-3 cursor-pointer text-gray-400"
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                        {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword ? (
                          <div className="text-red-600 text-sm mt-1">
                            {formik.errors.confirmPassword}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="mt-10">
                    <div className="flex flex-col items-center justify-start mt-6 md:flex-row">
                      <button
                        type="submit"
                        className="inline-block w-auto text-center min-w-[180px] px-6 py-4 text-white transition-all rounded-md shadow-xl sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-b dark:shadow-blue-900 shadow-blue-200 hover:shadow-2xl hover:shadow-blue-400 hover:-translate-y-px"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
