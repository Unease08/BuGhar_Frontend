import { Box, useTheme } from "@mui/material";
import { Header } from "../../components";
import Select from "react-select";
import React, { useState } from "react";

const CompanyVerification = () => {
  const theme = useTheme();
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file
  const [preview, setPreview] = useState(null); // State to hold the preview URL

  const options = [
    { value: "Company Registration", label: "Company Registration" },
    { value: "Business License", label: "Business License" },
    { value: "Tax Document", label: "Tax Document" },
    { value: "Insurance Certificate", label: "Insurance Certificate" },
    { value: "Compliance Report", label: "Compliance Report" },
    { value: "Contract Agreement", label: "Contract Agreement" },
  ];

  // Handle file selection and create a preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file); // Create a URL for the selected file
      setPreview(objectUrl); // Set the preview URL
    }
  };

  // Handle closing the preview
  const handleClosePreview = () => {
    setPreview(null);
    setSelectedFile(null); // Clear the selected file
  };

  return (
    <Box m="20px">
      <Header title="Company Verification" />

      <form className="max-w-8xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col gap-8">
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
            styles={{
              control: (provided) => ({
                ...provided,
                border: "1px solid #D1D5DB", // Tailwind gray-300
                borderRadius: "0.5rem", // Tailwind rounded-lg
                padding: "0.5rem", // Tailwind p-2.5
                backgroundColor: "#374151", // Tailwind gray-700
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#FFFFFF", // Tailwind white for text color
              }),
              input: (provided) => ({
                ...provided,
                color: "#FFFFFF", // Text color for typed input
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 9999, // Ensure dropdown is above other elements
                backgroundColor: "#374151", // Set background color to dark gray-700
                borderRadius: "0.5rem", // Add border radius to match control
              }),
              option: (provided, { isFocused, isSelected }) => ({
                ...provided,
                backgroundColor: isFocused
                  ? "#141B2D" // Tailwind blue-500 for focused option
                  : isSelected
                  ? "#1F2937" // Tailwind blue-500 for selected option
                  : "#374151", // Default background color for options
                color: isSelected ? "#FFFFFF" : "#FFFFFF", // Text color for selected
                padding: "10px 20px", // Add some padding for better spacing
                cursor: "pointer", // Change cursor to pointer for better UX
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
              onChange={handleFileChange} // Add the change handler
            />
          </label>

          {/* Preview section with close button */}
          {preview && (
            <div className="mt-3 relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto rounded-md border border-gray-500 shadow-lg"
              />
              <button
                onClick={handleClosePreview} // Close button functionality
                className="absolute top-1 right-1 bg-red-600 text-white h-8 w-8 flex items-center justify-center rounded-full hover:bg-red-700 transition duration-200"
              >
                &times; {/* Close icon */}
              </button>
            </div>
          )}
          <div className="flex justify-end mt-5">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
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
