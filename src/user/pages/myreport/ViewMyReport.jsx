import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import config from "../../../config";
import api from "../.../../../../library/Api";

const ViewMyReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get(`/report/${id}`);
        setReport(response.data);
        console.log("Report data:", response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching report:", error);
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const handleImageClick = (imageSrc) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
            &times;
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

  const selectedVulnerabilities =
    report.vulnerabilities?.map((vuln) => ({
      value: vuln,
      label: vuln,
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
              readOnly
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
            value={report.impact || ""}
            disabled
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
            options={selectedVulnerabilities}
            isMulti
            isDisabled
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
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={currentImage}
      />
    </div>
  );
};

export default ViewMyReport;
