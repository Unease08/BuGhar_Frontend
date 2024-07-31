import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../../library/Api"; // Adjust the import path as necessary
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Assuming you have an API endpoint to handle password reset requests
      const response = await api.post(
        "/auth/forgot-password",
        { email: values.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { message } = response.data;
      toast.success(message); // Display success message
    } catch (error) {
      // Handle error responses
      if (error.response && error.response.data.message) {
        setFieldError("email", error.response.data.message);
      } else {
        toast.error("An error occurred while processing your request.");
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
                Forgot password?
              </h1>
            </div>

            <div className="mt-5">
              <Formik
                initialValues={{ email: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="grid gap-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          />
                          <ErrorMessage
                            name="email"
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
                          <span className="ml-3 bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                            <Link to="/login">Login here</Link>
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

export default ForgotPassword;
