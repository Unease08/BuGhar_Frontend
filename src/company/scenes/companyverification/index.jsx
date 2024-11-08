import { Box, useTheme } from "@mui/material";
import { Header } from "../../components";
import Select from "react-select";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../../library/Api";
import { Navigate, useNavigate } from "react-router-dom";

const CompanyVerification = () => {
  const theme = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const options = [
    { value: "Company Registration", label: "Company Registration" },
    { value: "Business License", label: "Business License" },
    { value: "Tax Document", label: "Tax Document" },
    { value: "Insurance Certificate", label: "Insurance Certificate" },
    { value: "Compliance Report", label: "Compliance Report" },
    { value: "Contract Agreement", label: "Contract Agreement" },
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleClosePreview = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile || !selectedOption) {
      toast.error("Please select a document type and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("document", selectedFile);
    formData.append("document_type", selectedOption.value);

    try {
      const response = await api.post("/company/upload-document/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      navigate("/program");
    } catch (error) {
      console.error("Error submitting report:", error);
      const errorMessage =
        (error.response && error.response.data && error.response.data.detail) ||
        "Unknown error occurred";
      toast.error(`Error: ${errorMessage}`);
    }
  };

  return (
    <Box m="20px">
      <Header title="Company Verification" />

      <form
        onSubmit={handleSubmit}
        className="max-w-8xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col gap-8"
      >
        <div className="flex-1 w-full">
          <label
            htmlFor="countries"
            className="block mb-2 text-lg font-medium text-gray-300"
          >
            Select an option
          </label>
          <Select
            id="countries"
            options={options}
            classNamePrefix="react-select"
            className="react-select-container"
            onChange={handleOptionChange}
            styles={{
              control: (provided) => ({
                ...provided,
                border: "1px solid #D1D5DB",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                backgroundColor: "#374151",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#FFFFFF",
              }),
              input: (provided) => ({
                ...provided,
                color: "#FFFFFF",
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 9999,
                backgroundColor: "#374151",
                borderRadius: "0.5rem",
              }),
              option: (provided, { isFocused, isSelected }) => ({
                ...provided,
                backgroundColor: isFocused
                  ? "#141B2D"
                  : isSelected
                  ? "#1F2937"
                  : "#374151",
                color: isSelected ? "#FFFFFF" : "#FFFFFF",
                padding: "10px 20px",
                cursor: "pointer",
              }),
            }}
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="upload-doc"
            className="block mb-2 text-lg font-medium text-gray-300"
          >
            Upload Document
          </label>
          <label
            className="flex mt-3 cursor-pointer justify-center items-center rounded-md border border-gray-600 bg-gray-700 p-4 text-lg text-gray-300 transition hover:border-gray-400 focus:outline-none"
            tabIndex="0"
          >
            <span className="flex items-center space-x-2">
              <svg className="h-6 w-6 stroke-gray-400" viewBox="0 0 256 256">
                <path
                  d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                />
                <path
                  d="M80,128a80,80,0,1,1,144,48"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                />
                <polyline
                  points="118.1 161.9 152 128 185.9 161.9"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                />
                <line
                  x1="152"
                  y1="208"
                  x2="152"
                  y2="128"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                />
              </svg>
              <span className="text-md font-medium">
                Drop files to Attach, or
                <span className="text-blue-600 underline"> browse</span>
              </span>
            </span>
            <input
              id="upload-doc"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>

          {preview && (
            <div className="mt-3 relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto rounded-md border border-gray-500 shadow-lg"
              />
              <button
                onClick={handleClosePreview}
                className="absolute top-1 right-1 bg-red-600 text-white h-8 w-8 flex items-center justify-center rounded-full hover:bg-red-700 transition duration-200"
              >
                &times;
              </button>
            </div>
          )}
          <div className="flex justify-end mt-5">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
              disabled={!selectedFile || !selectedOption}
            >
              Submit Document
            </button>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default CompanyVerification;
