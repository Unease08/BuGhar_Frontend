import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import config from "../../../config"
import api from "../.../../../../library/Api"; // Adjust the path based on your file structure

const ViewMyReport = () => {
  const { id } = useParams(); // Get the ID from URL parameters
  const [report, setReport] = useState(null); // State to store the report data
  const [loading, setLoading] = useState(true); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [currentImage, setCurrentImage] = useState(""); // State to store the current image

  // Fetch single report using the ID from the URL
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get(`/report/${id}`); // Ensure correct endpoint
        setReport(response.data); // Assuming response.data is the report object
        console.log("Report data:", response.data);

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching report:", error);
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]); // Dependency array includes id to refetch if id changes

  const handleImageClick = (imageSrc) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Modal component defined within ViewMyReport
const Modal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 relative">
        <img
          src={imageSrc}
          alt="Large view"
          className="rounded"
          style={{ maxWidth: "100%", maxHeight: "80vh" }}
        />
        <button
          className="absolute top-0 right-0 bg-red-500 text-white rounded p-2 w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors duration-300" // Square button styling
          onClick={onClose}
          aria-label="Close"
        >
          &times; {/* Close button */}
        </button>
      </div>
    </div>
  );
};



  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p>No report found</p>
      </div>
    );
  }

  // Prepare the selected vulnerabilities for react-select
  const selectedVulnerabilities =
    report.vulnerabilities?.map((vuln) => ({
      value: vuln, // Use the vulnerability string as the value
      label: vuln, // Use the vulnerability string as the label
    })) || [];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="mt-8 ml-16 bg-gray-700 text-card-foreground p-4 rounded-lg max-w-6xl">
        <div className="font-sans">
          <h1 className="font-bold text-indigo-400 text-xl">Information</h1>
          <div className="mt-2">
            <label className="text-lg">Summary/Title</label>
            <input
              type="text"
              name="summary"
              className="w-full mt-1 py-1 px-2 rounded border border-gray-400 text-black"
              value={report.title || ""}
              readOnly // Set input to read-only as this is for viewing
            />
          </div>
        </div>
        <div className="font-sans mt-6">
          <h1 className="font-bold text-indigo-400 text-xl mb-2">
            Technical Severity
          </h1>
          <label className="text-lg">Selected severity</label>
          <select
            name="severity"
            className="w-full mt-1 py-1 px-2 rounded border border-gray-400 bg-gray-50 text-black"
            value={report.impact || ""} // Bind value to report.impact
            disabled // Make it disabled so that it is view-only, but still shows the value as a dropdown
          >
            <option value={report.impact}>{report.impact}</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        <div className="font-sans mt-6">
          <h1 className="font-bold text-indigo-400 text-xl mb-2">
            Vulnerability Details
          </h1>
          <label className="text-lg">Vulnerability type</label>
          <Select
            name="vulnerability_ids"
            className="text-black w-full mt-1"
            value={selectedVulnerabilities}
            options={selectedVulnerabilities} // Use the selected vulnerabilities
            isMulti // Allow multiple selections
            isDisabled // Disable select to make it read-only
          />
          <div className="mt-6">
            <label className="text-lg">URL/Location of the vulnerability</label>
            <input
              type="text"
              name="location"
              className="w-full mt-1 py-1 px-2 rounded border border-gray-400 bg-gray-50 text-black"
              value={report.steps_to_reproduce || ""}
              readOnly
            />
          </div>
          <div className="mt-6">
            <label className="text-lg">Description</label>
            <textarea
              name="description"
              rows="5"
              className="w-full mt-1 p-2 rounded border border-gray-400 bg-gray-50 text-black"
              value={report.description || ""}
              readOnly
            />
          </div>
          <div className="mt-6">
            <h1 className="font-bold text-indigo-400 text-xl">Attachments</h1>
            {report.attachments && report.attachments.length > 0 ? (
              <div className="mt-2 flex flex-wrap justify-start">
                {report.attachments.map((attachment, index) => (
                  <div key={index} className="flex-shrink-0 m-2">
                    <img
                      src={`${config.BASE_URL}${attachment}`}
                      alt={`Attachment ${index + 1}`}
                      className="rounded border border-gray-500 cursor-pointer"
                      style={{ width: "200px", height: "200px" }}
                      onClick={() =>
                        handleImageClick(`${config.BASE_URL}${attachment}`)
                      } // Set image source for modal
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No attachments available</p>
            )}
          </div>
        </div>
      </div>
      {/* Modal for displaying the large image */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={currentImage}
      />
    </div>
  );
};

export default ViewMyReport;
