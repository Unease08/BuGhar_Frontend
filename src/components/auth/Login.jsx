import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../library/Api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import config from "../../config";

const validationSchema = Yup.object().shape({
  identifier: Yup.string().required("Email or Username is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

const handleGoogleSignIn = () => {
  window.location.href = config.OAUTH_LINK;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const message = sessionStorage.getItem("toastMessage");
    if (message) {
      toast.success(message);
      sessionStorage.removeItem("toastMessage"); 
    }
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
     
      const response = await api.post(
        "/auth/login",
        {
          email: values.identifier.includes("@") ? values.identifier : null,
          username: values.identifier,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token, refresh_token, token_type } = response.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("token_type", token_type);

      const successMessage = "Login successful!";

      sessionStorage.setItem("toastMessage", successMessage);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        (error.response && error.response.data && error.response.data.detail) ||
        "Unknown error occurred";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-24 h-screen bg-gray-900">
      <div className="flex bg-n-14 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover h-auto"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-3xl text-white text-center">Welcome, Login Here</p>
          <div className="flex flex-col mt-4 mb-4 items-center justify-center text-sm">
            <h3 className="text-white">
              Don't have an account?
              <a
                className="group text-blue-400 transition-all duration-100 ease-in-out"
                href="#"
              >
                <span className="ml-3 bg-left-bottom underline bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  <Link to="/auth/researcher/register">
                    Signup as a researcher
                  </Link>
                </span>
              </a>
            </h3>
          </div>

          <a
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center mt-4 text-white rounded-lg shadow-m border-2 bg-white cursor-pointer"
          >
            <div className="px-4 py-3">
              <svg className="h-6 w-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>
            <h1 className="px-4 py-3 w-5/6 text-center bg-white text-gray-700 font-bold">
              Sign in with Google
            </h1>
          </a>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <a href="" className="text-xs text-center text-white uppercase">
              OR
            </a>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <Formik
            initialValues={{ identifier: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="identifier"
                    className="block mt-2 text-white text-sm font-bold mb-2"
                  >
                    Email or Username
                  </label>
                  <Field
                    id="identifier"
                    name="identifier"
                    type="text"
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    placeholder="Email or Username"
                  />
                  <ErrorMessage
                    name="identifier"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <Field
                    id="password"
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
                <div className="mb-4 text-right">
                  <a className="text-xs text-white" href="">
                    <Link to="/auth/forgot-password">
                      {" "}
                      Forgot Your Password?
                    </Link>
                  </a>
                </div>
                <button
                  className="bg-n-16 text-white font-bold py-2 px-4 w-full rounded hover:bg-n-17"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
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

export default Login;
