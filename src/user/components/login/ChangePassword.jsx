import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProfileSidebar from "../profilesidebar/ProfileSidebar";

const ChangePassword = () => {
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
    onSubmit: (values) => {
      // Handle form submission
      console.log("Form values:", values);
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
                    <p className="text-gray-400 text-md">anisheyyy@gmail.com</p>
                  </div>
                  <div className="mt-5 space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label
                          className="block text-sm font-bold text-gray-400"
                          htmlFor="old-password"
                        >
                          Old Password
                        </label>
                        <input
                          type="password"
                          id="old-password"
                          placeholder="Old Password"
                          {...formik.getFieldProps("oldPassword")}
                          className={`mt-2 block w-[50%] border ${
                            formik.touched.oldPassword &&
                            formik.errors.oldPassword
                              ? "border-red-600"
                              : "border-gray-700"
                          } rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring`}
                        />
                        {formik.touched.oldPassword &&
                        formik.errors.oldPassword ? (
                          <div className="text-red-600 text-sm mt-1">
                            {formik.errors.oldPassword}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label
                          className="block text-sm font-bold text-gray-400"
                          htmlFor="new-password"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          id="new-password"
                          placeholder="New Password"
                          {...formik.getFieldProps("newPassword")}
                          className={`mt-2 block w-[50%] border ${
                            formik.touched.newPassword &&
                            formik.errors.newPassword
                              ? "border-red-600"
                              : "border-gray-700"
                          } rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring`}
                        />
                        {formik.touched.newPassword &&
                        formik.errors.newPassword ? (
                          <div className="text-red-600 text-sm mt-1">
                            {formik.errors.newPassword}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label
                          className="block text-sm font-bold text-gray-400"
                          htmlFor="confirm-password"
                        >
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirm-password"
                          placeholder="Confirm New Password"
                          {...formik.getFieldProps("confirmPassword")}
                          className={`mt-2 block w-[50%] border ${
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                              ? "border-red-600"
                              : "border-gray-700"
                          } rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring`}
                        />
                        {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword ? (
                          <div className="text-red-600 text-sm mt-1">
                            {formik.errors.confirmPassword}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 ml-10">
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
