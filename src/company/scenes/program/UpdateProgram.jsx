import { Box } from "@mui/material";
import { Header } from "../../components";
import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const UpdateProgram = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const initialValues = {
    title: "",
    in_scope: "",
    out_scope: "",
    terms: "",
    description: "",
    start_date: "",
    end_date: "",
    min_price: "",
    max_price: "",
    logo: null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    in_scope: Yup.string().required("In Scope is required"),
    out_scope: Yup.string().required("Out Scope is required"),
    terms: Yup.string().required("Terms are required"),
    description: Yup.string().required("Description is required"),
    start_date: Yup.date().required("Start Date is required"),
    end_date: Yup.date().required("End Date is required"),
    min_price: Yup.number()
      .required("Minimum Price is required")
      .min(0, "Minimum Price must be a positive number"),
    max_price: Yup.number()
      .required("Maximum Price is required")
      .min(0, "Maximum Price must be a positive number"),
    logo: Yup.mixed().required("Logo is required"),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFieldValue("logo", file);
    }
  };

  const handleRemoveImage = (setFieldValue) => {
    setSelectedImage(null);
    setFieldValue("logo", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input value
    }
  };

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <Box m="20px">
      <Header title="Update Program" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="max-w-8xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col gap-8">
            <div className="grid gap-2 md:grid-cols-1">
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="border text-lg rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                  placeholder="Title or Summary"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  In Scope
                </label>
                <Field
                  type="text"
                  id="in_scope"
                  name="in_scope"
                  className="border text-lg rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                  placeholder="In Scope"
                />
                <ErrorMessage
                  name="in_scope"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Out Scope
                </label>
                <Field
                  type="text"
                  id="out_scope"
                  name="out_scope"
                  className="border text-lg rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                  placeholder="Out Scope"
                />
                <ErrorMessage
                  name="out_scope"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-1">
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Terms
                </label>
                <Field
                  type="text"
                  id="terms"
                  name="terms"
                  className="border text-lg rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                  placeholder="terms"
                />
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
            </div>
            <div className="grid gap-2 md:grid-cols-1">
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  rows="6"
                  placeholder="Write your company description here..."
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Start Date
                </label>
                <Field
                  type="date"
                  id="start_date"
                  name="start_date"
                  className="border text-lg rounded-lg  focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                />
                <ErrorMessage
                  name="start_date"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  End Date
                </label>
                <Field
                  type="date"
                  id="end_date"
                  name="end_date"
                  className="border  text-lg rounded-lg  focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                />
                <ErrorMessage
                  name="end_date"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Minimum Price
                </label>
                <Field
                  type="number"
                  id="min_price"
                  name="min_price"
                  className="border text-lg rounded-lg  focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                  placeholder="Minimum Price"
                />
                <ErrorMessage
                  name="min_price"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Maximum Price
                </label>
                <Field
                  type="number"
                  id="max_price"
                  name="max_price"
                  className="border text-lg rounded-lg  focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                  placeholder="Maximum Price"
                />
                <ErrorMessage
                  name="max_price"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
            </div>
            {/* File input for the logo */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Logo
                </label>
                <input
                  ref={fileInputRef}
                  className="border text-lg rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                  type="file"
                  name="logo"
                  onChange={(event) => handleImageChange(event, setFieldValue)}
                />
                {selectedImage && (
                  <div className="relative mt-4 w-48 h-48">
                    <img
                      src={selectedImage}
                      alt="Selected Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(setFieldValue)}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 focus:outline-none"
                    >
                      &times;
                    </button>
                  </div>
                )}
                <ErrorMessage
                  name="logo"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
            </div>
            {/* Submit button */}
            <div className="flex justify-between">
              <Link to="/program">
                <button className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center focus:ring-gray-700">
                  Back
                </button>
              </Link>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UpdateProgram;
