// src/user/components/login/Login.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../../library/Api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  identifier: Yup.string().required("Email or Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
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

      // Store tokens in localStorage or any state management solution
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("token_type", token_type);

      toast.success("Login Successful!");
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ apiError: "Invalid email or password" });
      toast.error("Login Failed: Invalid email or password");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex font-poppins items-center justify-center">
      <div className="h-screen w-screen flex justify-center items-center dark:bg-gray-900">
        <div className="grid gap-8">
          <div
            id="back-div"
            className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4"
          >
            <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
              <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
                Log in
              </h1>
              <Formik
                initialValues={{ identifier: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors }) => (
                  <Form className="space-y-4">
                    <div>
                      <label
                        htmlFor="identifier"
                        className="mb-2 dark:text-gray-400 text-lg"
                      >
                        Username
                      </label>
                      <Field
                        id="identifier"
                        name="identifier"
                        type="text"
                        className="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                        placeholder="Email or Username"
                      />
                      <ErrorMessage
                        name="identifier"
                        component="div"
                        className="text-red-500 text-sm mt-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="mb-2 dark:text-gray-400 text-lg"
                      >
                        Password
                      </label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                        placeholder="Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-2"
                      />
                    </div>
                    {/* {errors.apiError && (
                      <div className="text-red-500 text-sm mt-2">
                        {errors.apiError}
                      </div>
                    )} */}
                    <div className="mb-4 text-right">
                      <a
                        className="group text-blue-400 transition-all duration-100 ease-in-out"
                        href="#"
                      >
                        <span className=" ml-3 bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                          Forgot Your Password?
                        </span>
                      </a>
                    </div>
                    <button
                      className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "LOG IN"}
                    </button>
                  </Form>
                )}
              </Formik>
              <div className="flex flex-col mt-4 mb-4 items-center justify-center text-sm">
                <h3 className="dark:text-gray-300">
                  Don't have an account?
                  <a
                    className="group text-blue-400 transition-all duration-100 ease-in-out"
                    href="#"
                  >
                    <span className=" ml-3 bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                      Sign Up
                    </span>
                  </a>
                </h3>
              </div>
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-border" />
                <span className="px-2 text-white text-muted-foreground">
                  OR
                </span>
                <hr className="flex-grow border-t border-border" />
              </div>
              <div
                id="third-party-auth"
                className="flex items-center justify-center mt-5 flex-wrap"
              >
                <button
                  type="button"
                  className="transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg "
                >
                  <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 48 48"
                      enableBackground="new 0 0 48 48"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.82C14.713,16.367,18.974,14,24,14c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C15.902,4,9.032,8.816,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.148,0,9.844-1.97,13.432-5.166l-6.104-5.564C29.837,34.61,27.036,36,24,36 c-5.233,0-9.671-3.343-11.307-8H6.094l-6.65,4.857C8.965,39.853,15.992,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.795,2.248-2.208,4.179-4.023,5.564 c1.997-1.315,3.647-3.222,4.614-5.564c0.4-0.972,0.711-1.989,0.914-3.033c0.134-0.686,0.211-1.393,0.211-2.125 C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                    Sign in with Google
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
