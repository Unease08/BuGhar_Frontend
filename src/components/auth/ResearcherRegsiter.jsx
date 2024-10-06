import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../library/Api"; // Adjust the import path as necessary
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResearcherRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await api.post(
        "/auth/register",
        {
          username: values.username,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { message } = response.data;

      toast.success(message); // Display success message

      navigate("/auth/login"); // Redirect to login page after successful registration
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data && error.response.data.detail) ||
        "Unknown Error Occured.";

      toast.error(errorMessage);
    }
    setSubmitting(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="py-24 h-screen bg-gray-900">
      <div className="flex bg-n-14 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-4xl text-white text-center">Join the Hunt !!!</p>
          <div className="flex flex-col mt-4 mb-4 items-center justify-center text-sm">
            <h3 className="text-white">
              Already have an account?
              <a
                className="group text-blue-400 transition-all duration-100 ease-in-out"
                href="#"
              >
                <span className="ml-3 bg-left-bottom underline bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  <Link to="/auth/login">Signin as researcher</Link>
                </span>
              </a>
            </h3>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-3/4"></span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-4">
                <div>
                  <label className="block text-white text-sm font-bold mb-2">
                    Username
                  </label>
                  <Field
                    name="username"
                    type="text"
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    placeholder="Username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>

                <div className="relative mt-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    Password
                  </label>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none pr-10"
                    placeholder="Password"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 top-10 flex pr-3 cursor-pointer text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>

                <div className="relative mt-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none pr-10"
                    placeholder="Confirm Password"
                  />
                  <span
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 top-10 flex pr-3 cursor-pointer text-gray-600"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="bg-n-16 text-white font-bold py-2 px-4 w-full rounded hover:bg-n-17"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="flex flex-col mt-4 mb-4 items-center justify-center text-sm">
            <h3 className="text-white">
              Looking for company portal?
              <a
                className="group text-blue-400 transition-all duration-100 ease-in-out"
                href="#"
              >
                <span className="ml-3 underline bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  <Link to="/auth/company/register">Go to company portal</Link>
                </span>
              </a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearcherRegister;
