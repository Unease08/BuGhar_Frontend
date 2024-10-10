import { Box } from "@mui/material";
import { Header } from "../../components";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../library/Api";
import toast from "react-hot-toast";
import config from "../../../config";

const UpdateProgram = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [initialValues, setInitialValues] = useState({
    title: "",
    in_scope: "",
    out_of_scope: "",
    terms: "",
    description: "",
    start_date: "",
    end_date: "",
    min_price: "",
    max_price: "",
    program_logo: null,
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    in_scope: Yup.string().required("In Scope is required"),
    out_of_scope: Yup.string().required("Out Scope is required"),
    terms: Yup.string().required("Terms are required"),
    description: Yup.string().required("Description is required"),
    start_date: Yup.date().required("Start Date is required"),
    end_date: Yup.date()
      .min(Yup.ref("start_date"), "End Date must be later than Start Date")
      .required("End Date is required"),
    min_price: Yup.number()
      .required("Minimum Price is required")
      .min(0, "Minimum Price must be a positive number"),
    max_price: Yup.number()
      .required("Maximum Price is required")
      .min(0, "Maximum Price must be a positive number"),
    program_logo: Yup.mixed().required("Program Logo is required"),
  });

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await api.get(`/programs/${id}`);
        console.log("API response", response.data);

        const program = response.data;

        // Set initial values with the fetched data
        setInitialValues({
          title: program.title,
          in_scope: program.in_scope,
          out_of_scope: program.out_of_scope,
          terms: program.terms,
          description: program.description,
          start_date: program.start_date.split("T")[0], // Format date as YYYY-MM-DD
          end_date: program.end_date.split("T")[0], // Format date as YYYY-MM-DD
          min_price: program.min_price,
          max_price: program.max_price,
          program_logo: null, // Reset this as you'll handle the image upload separately
        });

        // Set selectedImage if program has an existing logo
        if (program.program_logo) {
          // Construct the full image URL using config.BASE_URL
          const imageUrl = `${config.BASE_URL}/${program.program_logo}`;
          setSelectedImage(imageUrl); // Set the formatted URL to state for preview
        } else {
          setSelectedImage(null); // If no image, reset preview to null
        }
      } catch (error) {
        console.error("Error fetching program data:", error);
        toast.error("Error fetching program data");
      }
    };

    fetchProgramData();
  }, [id]); // Dependency on id to refetch if it changes

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFieldValue("program_logo", file);
    }
  };

  const handleRemoveImage = (setFieldValue) => {
    setSelectedImage(null);
    setFieldValue("program_logo", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input value
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();

    // Convert start_date and end_date to the required format
    const formattedStartDate = new Date(values.start_date).toISOString();
    const formattedEndDate = new Date(values.end_date).toISOString();

    // Append all form fields to FormData
    formData.append("title", values.title);
    formData.append("in_scope", values.in_scope);
    formData.append("out_of_scope", values.out_of_scope);
    formData.append("terms", values.terms);
    formData.append("description", values.description);
    formData.append("start_date", formattedStartDate);
    formData.append("end_date", formattedEndDate);
    formData.append("min_price", values.min_price);
    formData.append("max_price", values.max_price);
    if (values.program_logo) {
      formData.append("program_logo", values.program_logo);
    }

    try {
      const response = await api.put(`/programs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      navigate("/program");
    } catch (error) {
      console.error("Error updating program:", error);
      const errorMessage =
        (error.response && error.response.data && error.response.data.detail) ||
        "Unknown error occurred";
      toast.error(`Error: ${errorMessage}`);
    }
  };

 

  return (
    <Box m="20px">
      <Header title="Update Program" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
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
                  In Scope{" "}
                  <span className="text-sm text-gray-400">
                    (Separate each scope with comma)
                  </span>
                </label>
                <Field
                  type="text"
                  id="in_scope"
                  name="in_scope"
                  className="border text-lg rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                  placeholder="Eg *.bughar.net, *.bughar.com"
                />
                <ErrorMessage
                  name="in_scope"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Out Of Scope{" "}
                  <span className="text-sm text-gray-400">
                    (Separate each scope with comma)
                  </span>
                </label>
                <Field
                  type="text"
                  id="out_of_scope"
                  name="out_of_scope"
                  className="border text-lg rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                  placeholder="Eg *.gmail.com, *.yahoo.com"
                />
                <ErrorMessage
                  name="out_of_scope"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium text-white">
                Terms
              </label>
              <Field
                as="textarea"
                id="terms"
                name="terms"
                className="border text-lg rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                placeholder="Terms and Conditions"
                rows="4"
              />
              <ErrorMessage
                name="terms"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium text-white">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="border text-lg rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                placeholder="Description of the program"
                rows="4"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 mt-1"
              />
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
                  className="border text-lg rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
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
                  className="border text-lg rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
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
                  className="border text-lg rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
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
                  className="border text-lg rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                  placeholder="Maximum Price"
                />
                <ErrorMessage
                  name="max_price"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Program Logo
                </label>
                <input
                  ref={fileInputRef}
                  className="border text-lg rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                  type="file"
                  name="program_logo"
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
                  name="program_logo"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
            </div>
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
