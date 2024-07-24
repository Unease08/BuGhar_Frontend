import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../../library/Api";
import { useNavigate } from "react-router-dom";

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

      console.log("Login Successfull");
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ apiError: "Invalid email or password" });
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
                    {errors.apiError && (
                      <div className="text-red-500 text-sm mt-2">
                        {errors.apiError}
                      </div>
                    )}
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
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,19.009,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C15.846,4,9.059,8.835,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.132,0,9.799-1.977,13.293-5.186l-6.065-5.258C29.269,35.664,26.729,36,24,36 c-5.228,0-9.675-3.346-11.326-8.014l-6.513,5.02C9.139,39.106,16.059,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.801,2.261-2.23,4.216-4.085,5.655 c0.002-0.001,0.004-0.003,0.006-0.005l6.065,5.258C36.48,38.084,44,32,44,24C44,22.659,43.862,21.35,43.611,20.083z"
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
