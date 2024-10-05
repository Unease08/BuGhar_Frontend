import React, { useState, useEffect } from "react";
import { TbReportSearch } from "react-icons/tb";
import { FaMedal } from "react-icons/fa";
import { FaBug } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import api from "../../../library/Api";
import config from "../../../config";

const ProgramReport = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [program, setProgram] = useState(null);
  const [vulnerabilityOptions, setVulnerabilityOptions] = useState([]);
  const { id } = useParams();

  // Fetch the program details
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await api.get(`/programs/${id}`);
        setProgram(response.data);
      } catch (error) {
        console.error("Error fetching program:", error);
      }
    };

    if (id) {
      fetchProgram();
    }
  }, [id]);

  // Fetch vulnerability types and transform for react-select
  useEffect(() => {
    const fetchVulnerabilityTypes = async () => {
      try {
        const response = await api.get("/vulnerability-type/");
        const options = response.data.map((vul) => ({
          value: vul.id,
          label: `${vul.name}`,
        }));
        setVulnerabilityOptions(options);
      } catch (error) {
        console.error("Error fetching vulnerability types:", error);
      }
    };

    fetchVulnerabilityTypes();
  }, []);

  // Handle file uploads
  // Handle file uploads and generate previews
  const handleFileChange = (event, setFieldValue) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    setFieldValue("attachments", files); // Set all selected files in the Formik state

    // Create an array of promises to read each file as a Data URL
    const newImagePreviews = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file); // Read the file as a Data URL
      });
    });

    // Once all files are read, update the selectedImages state
    Promise.all(newImagePreviews)
      .then((results) => {
        setSelectedImages((prevImages) => [...prevImages, ...results]);
      })
      .catch((error) => console.error("Error reading files:", error));

    event.target.value = ""; // Reset the file input after selection
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Summary is required"),
    impact: Yup.string().required("Severity is required"),
    vulnerability_ids: Yup.array().min(
      1,
      "At least one vulnerability type is required"
    ),
    steps_to_reproduce: Yup.string().required("URL is required"),
    description: Yup.string().required("Description is required"),
    attachments: Yup.mixed().required("A file is required"),
  });

  const submitReport = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("program_id", id);
    formData.append("impact", values.impact);

    // Add vulnerability IDs
    values.vulnerability_ids.forEach((vulnerabilityId) => {
      formData.append("vulnerability_ids", vulnerabilityId);
    });

    formData.append("steps_to_reproduce", values.steps_to_reproduce);
    formData.append("description", values.description);

    // Check if attachments are provided and handle FileList
    if (values.attachments && values.attachments.length > 0) {
      Array.from(values.attachments).forEach((file) => {
        formData.append("attachments", file); // Appending each file
      });
    }

    try {
      const response = await api.post("/report/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Report submitted successfully:", response.data);
      // Handle success notifications here
    } catch (error) {
      console.error("Error submitting report:", error);
      // Handle error notifications here
    }
  };

  if (!program) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="flex justify-start ml-48 gap-40">
        <div className="bg-gray-700 text-card-foreground p-4 rounded-lg w-[1080px] relative overflow-visible transform mt-24">
          <div className="relative">
            <div className="h-32 w-32 mt-10 mr-5 border-4 border-white rounded-full overflow-hidden shadow-lg absolute -top-48 left-1/2 transform -translate-x-1/2">
              <img
                src={`${config.BASE_URL}/${program.program_logo}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="mt-20 text-3xl font-bold font-grotesk text-indigo-400 text-center">
              {program.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground text-center">
              {program.description}
            </p>
            <div className="mt-4 text-right mb-2 flex justify-between items-center">
              <span></span>
              <span className="text-primary font-bold text-xl text-indigo-400">
                Rs. {program.min_price} - Rs. {program.max_price}{" "}
                <p className="text-md">per vulnerability</p>
              </span>
            </div>
            <hr />
            <Link to={`/program-details/${program.id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded">
                Learn More
              </button>
            </Link>
            <hr className="mt-4" />
            <div className="mt-3">
              <span className="mt-2 text-2xl font-bold font-grotesk text-indigo-400">
                Information Stats
              </span>
              <div className="mt-2 flex flex-col space-y-4">
                <span className="flex items-center text-xl">
                  <i className="mr-2 text-blue-500 text-xl">
                    <TbReportSearch />
                  </i>
                  <span className="flex">Total reports</span>
                  <strong className="text-white text-xl ml-15">50</strong>
                </span>
                <span className="flex items-center text-xl">
                  <i className="mr-2 text-green-500 text-xl">
                    <FaMedal />
                  </i>
                  <span className="flex">Reports resolved</span>
                  <strong className="text-white text-xl ml-6">50</strong>
                </span>
                <span className="flex items-center text-xl">
                  <i className="mr-2 text-red-700 text-xl">
                    <FaBug />
                  </i>
                  <span className="flex">Total bounty paid</span>
                  <strong className="text-white text-xl ml-4">50</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card mt-5 ml-48 h-auto bg-gray-700 text-card-foreground p-4 rounded-md w-[1080px] mx-auto shadow-lg">
        <Formik
          initialValues={{
            title: "",
            impact: "",
            vulnerability_ids: [],
            steps_to_reproduce: "",
            description: "",
            attachments: [],
          }}
          validationSchema={validationSchema}
          onSubmit={submitReport}
        >
          {({ setFieldValue }) => (
            <Form className="w-full mt-2">
              <div className="font-sans">
                <h1 className="font-bold text-indigo-400 text-xl mb-4">
                  Information
                </h1>
                <p className="text-md leading-6 text-gray-300">
                  Help us get an idea of what this vulnerability is about.
                </p>
                <Field
                  type="text"
                  name="title"
                  className="w-full mt-4 py-2 px-4 rounded border text-black border-gray-300"
                  placeholder="summary/title of your submissions"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-600 mt-2"
                />
                <hr className="mt-10" />
              </div>

              <div className="font-sans mt-10">
                <h1 className="font-bold text-indigo-400 text-xl mb-4">
                  Technical Severity
                </h1>
                <div className="mt-2">
                  <strong className="text-sm">Select the severity</strong>
                  <div className="flex mt-2 space-x-4">
                    <div className="w-full">
                      <Field
                        as="select"
                        name="impact"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                      >
                        <option value="">Select severity</option>
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="moderate">Moderate</option>
                        <option value="low">Low</option>
                        <option value="informational">Informational</option>
                      </Field>
                      <ErrorMessage
                        name="impact"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-10" />
              </div>

              <div className="font-sans mt-10">
                <h1 className="font-bold text-indigo-400 text-xl mb-4">
                  Vulnerability Type
                </h1>
                <p className="text-md leading-6 text-gray-300">
                  Please select the type(s) of vulnerabilities
                </p>
                <Select
                  name="vulnerability_ids"
                  className="text-black"
                  isMulti
                  options={vulnerabilityOptions}
                  onChange={(selectedOptions) => {
                    setFieldValue(
                      "vulnerability_ids",
                      selectedOptions.map((option) => option.value)
                    );
                  }}
                />
                <ErrorMessage
                  name="vulnerability_ids"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mt-4">
                <strong className="text-sm">
                  URL/Location of the vulnerability
                </strong>
                <div className="flex mt-2 space-x-4">
                  <Field
                    type="text"
                    name="steps_to_reproduce"
                    className="w-full mt-4 py-2 px-4 rounded border text-black border-gray-300"
                  />
                </div>
                <ErrorMessage
                  name="steps_to_reproduce"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mt-4">
                <strong className="text-sm">Description</strong>
                <div className="flex mt-2 space-x-4">
                  <Field
                    as="textarea"
                    name="description"
                    rows="8"
                    className="block p-2 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50"
                  />
                </div>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="font-sans mt-10">
                <h1 className="font-bold text-indigo-400 text-xl mb-4">
                  Attachments
                </h1>
                <p className="text-md leading-6 text-gray-300">
                  Attach Proof-of-Concept files here.
                </p>
                <input
                  type="file"
                  name="attachments"
                  multiple // allow multiple file selection
                  onChange={(event) => handleFileChange(event, setFieldValue)} // Pass setFieldValue here
                  className="border border-gray-300 rounded-lg py-2 px-4 mt-2"
                />

                <ErrorMessage
                  name="attachments"
                  component="div"
                  className="text-red-600"
                />

                <div className="mt-4 flex flex-wrap">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative w-1/3 h-32 m-1">
                      <img
                        src={image}
                        alt={`attachments-${index}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)} // Call the remove function
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700"
                        aria-label="Remove image"
                      >
                        &times; {/* Close icon */}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Submit Vulnerability
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProgramReport;
