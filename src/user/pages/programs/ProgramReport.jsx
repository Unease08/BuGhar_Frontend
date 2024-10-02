import React, { useState } from "react";
import profile1 from "../../../assets/profile1.jpg";
import { TbReportSearch } from "react-icons/tb";
import { FaMedal } from "react-icons/fa";
import { FaBug } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProgramReport = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Get the selected files
    const newImagePreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result); // Resolve with the image data URL
      });
    });

    Promise.all(newImagePreviews).then((results) => {
      setSelectedImages((prevImages) => [...prevImages, ...results]); // Append new images to existing ones
    });
    event.target.value = "";
  };

  const removeImage = (index) => {
    setSelectedImages(
      (prevImages) => prevImages.filter((_, i) => i !== index) // Remove the image at the given index
    );
  };

  const validationSchema = Yup.object().shape({
    summary: Yup.string().required("Summary is required"),
    target: Yup.string().required("Target is required"),
    scope: Yup.string().required("Scope is required"),
    severity: Yup.string().required("Severity is required"),
    vulnerabilityType: Yup.string().required("Vulnerability type is required"),
    url: Yup.string().url("Invalid URL").required("URL is required"),
    description: Yup.string().required("Description is required"),
    traceDump: Yup.string().required("Trace dump/HTTP request is required"),
    file: Yup.mixed().required("A file is required"),
  });

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="flex justify-start ml-32 gap-40">
        <div className="bg-card mt-10 bg-gray-700 text-card-foreground p-4 rounded-lg max-w-6xl">
          <h1 className="mt-2 text-3xl font-bold font-grotesk text-indigo-400">
            Under Armour’s vision
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Under Armour’s vision is to inspire you with performance solutions
            you never knew you needed and can’t imagine living without.
          </p>
          <div className="mt-4 text-right mb-2 flex justify-between items-center">
            <span>20th Semptember, 2024</span>
            <span className="text-primary font-bold text-xl text-indigo-400">
              Rs 125 - Rs 2,500 <p className="text-sm">per vulnerability</p>
            </span>{" "}
          </div>
          <hr />
          <Link to="/programdetails/:id">
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
        <div className="h-52 w-52 mt-10 mr-5 border-4 border-white rounded-full overflow-hidden shadow-lg">
          <img
            src={profile1}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="bg-card mt-5 ml-32 h-auto bg-gray-700 text-card-foreground p-4 rounded-md w-[970px] mx-auto shadow-lg">
        <Formik
          initialValues={{
            summary: "",
            target: "",
            scope: "",
            severity: "",
            vulnerabilityType: "",
            url: "",
            description: "",
            traceDump: "",
            file: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form data", values);
          }}
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
                  name="summary"
                  className="w-full mt-4 py-2 px-4 rounded border text-black border-gray-300"
                  placeholder="summary/title of your submissions"
                />
                <ErrorMessage
                  name="summary"
                  component="div"
                  className="text-red-600 mt-2"
                />
                <hr className="mt-10" />
              </div>

              <div className="font-sans mt-10">
                <h1 className="font-bold text-indigo-400 text-xl mb-4">
                  Target
                </h1>
                <p className="text-md leading-6 text-gray-300">
                  Targets that are not explicitly in scope may not be eligible
                  for acceptance.
                </p>
                <div className="mt-2">
                  <strong className="text-sm">
                    Select the vulnerable target
                  </strong>
                  <div className="flex mt-2 space-x-4">
                    <div className="w-1/3">
                      <Field
                        as="select"
                        name="target"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                      >
                        <option value="">Select target</option>
                        <option value="website">Website</option>
                      </Field>
                      <ErrorMessage
                        name="target"
                        component="div"
                        className="text-red-600 text-sm mt-2"
                      />
                    </div>
                    <div className="w-2/3">
                      <Field
                        as="select"
                        name="scope"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                      >
                        <option value="">Select Scope</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                      </Field>
                      <ErrorMessage
                        name="scope"
                        component="div"
                        className="text-red-600 text-sm mt-2"
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-10" />
              </div>

              <div className="font-sans mt-10">
                <h1 className="font-bold text-indigo-400 text-xl mb-4">
                  Target
                </h1>
                <p className="text-md leading-6 text-gray-300">
                  Targets that are not explicitly in scope may not be eligible
                  for acceptance.
                </p>
                <div className="mt-2">
                  <strong className="text-sm">
                    Select the vulnerable target
                  </strong>
                  <div className="flex mt-2 space-x-4">
                    <div className="w-1/3">
                      <Field
                        as="select"
                        name="target"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                      >
                        <option value="">Select target</option>
                        <option value="website">Website</option>
                      </Field>
                      <ErrorMessage
                        name="target"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>
                    <div className="w-2/3">
                      <Field
                        as="select"
                        name="scope"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                      >
                        <option value="">Select Scope</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                      </Field>
                      <ErrorMessage
                        name="scope"
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
                  Vulnerability details
                </h1>
                <p className="text-gray-300 text-base leading-relaxed">
                  Describe the vulnerability, and provide a proof of concept.
                  How would you fix it?
                </p>

                <div className="mt-2">
                  <strong className="text-sm">Vulnerability type</strong>
                  <div className="flex mt-2 space-x-4">
                    <Field
                      as="select"
                      name="vulnerabilityType"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                    >
                      <option value="">Select vulnerability type</option>
                      <option value="sql_injection">SQL Injection</option>
                      <option value="xss">Cross-Site Scripting (XSS)</option>
                      <option value="csrf">
                        Cross-Site Request Forgery (CSRF)
                      </option>
                      <option value="rce">Remote Code Execution (RCE)</option>
                      <option value="directory_traversal">
                        Directory Traversal
                      </option>
                      <option value="idor">
                        Insecure Direct Object References (IDOR)
                      </option>
                      <option value="ssrf">
                        Server-Side Request Forgery (SSRF)
                      </option>
                      <option value="security_misconfiguration">
                        Security Misconfiguration
                      </option>
                      <option value="sensitive_data_exposure">
                        Sensitive Data Exposure
                      </option>
                      <option value="insufficient_logging">
                        Insufficient Logging and Monitoring
                      </option>
                    </Field>
                  </div>
                  <ErrorMessage
                    name="vulnerabilityType"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div className="mt-8">
                  <strong className="text-sm">
                    URL/Location of the vulnerability
                  </strong>
                  <div className="flex mt-2 space-x-4">
                    <Field
                      type="text"
                      name="url"
                      className="w-full mt-4 py-2 px-4 rounded border text-black border-gray-300"
                    />
                  </div>
                  <ErrorMessage
                    name="url"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div className="mt-8">
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

                <div className="mt-8">
                  <strong className="text-sm">Trace Dump/HTTP Request</strong>
                  <div className="flex mt-2 space-x-4">
                    <Field
                      as="textarea"
                      name="traceDump"
                      rows="8"
                      className="block p-2 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50"
                    />
                  </div>
                  <ErrorMessage
                    name="traceDump"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
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
                  name="file"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                    handleFileChange(event);
                  }}
                  className="border border-gray-300 rounded-lg py-2 px-4 mt-2"
                />
                <ErrorMessage
                  name="file"
                  component="div"
                  className="text-red-600"
                />

                <div className="mt-4 flex flex-wrap">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative w-1/3 h-32 m-1">
                      <img
                        src={image}
                        alt={`attachment-${index}`}
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
