import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import FaEye and FaEyeSlash
import api from "../../../library/Api"; // Adjust the import path as necessary
import toast from "react-hot-toast";

// Validation schema for new password and confirm password
const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ResetPassword = () => {
  const { id } = useParams(); // Extracting the ID from the URL
  const navigate = useNavigate(); // Initialize the navigate function

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Sending POST request to reset the password
      const response = await api.post(
        `/auth/reset-password`, // API endpoint with id
        { token: id, new_password: values.newPassword }, // Send new password
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { message } = response.data;
      toast.success(message); // Show success message from the backend

      // Redirect to the login page after a successful password reset
      navigate("/auth/researcher/login");
    } catch (error) {
      if (error.response && error.response.data.detail) {
        // Display backend error message in toast
        toast.error(error.response.data.detail);
        setFieldError("newPassword", error.response.data.detail);
      } else {
        toast.error("An error occurred while resetting your password."); // Default message if no backend message is returned
      }
    }
    setSubmitting(false);
  };


  return (
    <div className="h-screen w-full bg-gray-900">
      <main id="content" role="main" className="max-w-md mx-auto p-6">
        <div className="mt-40 bg-n-14 rounded-xl shadow-lg dark:border-gray-700 border-2">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-white">
                Reset Password
              </h1>
            </div>

            <div className="mt-5">
              <Formik
                initialValues={{ newPassword: "", confirmPassword: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="grid gap-y-4">
                      {/* New Password Field */}
                      <div>
                        <label
                          htmlFor="newPassword"
                          className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                        >
                          New Password
                        </label>
                        <div className="relative">
                          <Field
                            type={showNewPassword ? "text" : "password"} // Toggle between text and password
                            id="newPassword"
                            name="newPassword"
                            placeholder="New Password"
                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          />
                          <span
                            onClick={toggleNewPasswordVisibility}
                            className="absolute inset-y-0 right-4 top-3 cursor-pointer"
                          >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                          <ErrorMessage
                            name="newPassword"
                            component="p"
                            className="text-xs text-red-600 mt-2"
                          />
                        </div>
                      </div>

                      {/* Confirm Password Field */}
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                        >
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Field
                            type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          />
                          <span
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute inset-y-0 right-4 top-3 cursor-pointer"
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                          <ErrorMessage
                            name="confirmPassword"
                            component="p"
                            className="text-xs text-red-600 mt-2"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="bg-n-16 mt-3 text-white font-bold py-2 px-4 w-full rounded hover:bg-n-17"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Reset Password"}
                      </button>

                      <h3 className="mt-2 dark:text-white">
                        Remember Your Password?
                        <a
                          className="group text-blue-400 transition-all duration-100 ease-in-out"
                          href="#"
                        >
                          <span className="ml-3 bg-left-bottom underline bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                            <Link to="/auth/researcher/login">
                              Go to researcher login
                            </Link>
                          </span>
                        </a>
                      </h3>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
