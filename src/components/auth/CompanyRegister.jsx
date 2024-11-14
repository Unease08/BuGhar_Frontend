import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../library/Api"; 
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

// Updated validationSchema
const validationSchema = Yup.object().shape({
  company_name: Yup.string()
    .min(3, "Company Name must be at least 3 characters")
    .required("Company Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone_number: Yup.string()
    .matches(/^\d+$/, "Phone number must contain only digits") 
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .required("Number is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const CompanyRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await api.post(
        "/company/register",
        {
          email: values.email,
          company_name: values.company_name,
          phone_number: values.phone_number,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { message } = response.data;
      toast.success(message);
      navigate("/auth/login");
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
    <div className="py-8 h-screen bg-gray-900">
      <div className="flex bg-n-14 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-4xl text-white text-center">Secure Your System</p>
          <div className="flex flex-col mt-4 mb-4 items-center justify-center text-sm">
            <h3 className="text-white">
              Already have an account?
              <a
                className="group text-blue-400 transition-all duration-100 ease-in-out"
                href="#"
              >
                <span className="ml-3 bg-left-bottom underline bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  <Link to="/auth/login">Signin as Company</Link>
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
              company_name: "",
              email: "",
              phone_number: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-4">
                <div className="mt-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    Company Name
                  </label>
                  <Field
                    name="company_name"
                    type="text"
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    placeholder="Company Name"
                  />
                  <ErrorMessage
                    name="company_name"
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

                <div className="mt-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <Field
                    name="phone_number"
                    type="text"
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    placeholder="Phone Number"
                  />
                  <ErrorMessage
                    name="phone_number"
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
              Looking for Researcher Portal?
              <a
                className="group text-blue-400 transition-all duration-100 ease-in-out"
                href="#"
              >
                <span className="ml-3 bg-left-bottom underline bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  <Link to="/auth/login">Go to Login</Link>
                </span>
              </a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegister;
