import { Box, Grid, Dialog, DialogContent, IconButton } from "@mui/material"; // Import Dialog and IconButton
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components";
import api from "../../../library/Api";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import config from "../../../config"; // Ensure this import is correct for your project

const ReportView = () => {
  const { id } = useParams(); // Extracts the 'id' from the URL
  const [report, setReport] = useState(null);
  const [openModal, setOpenModal] = useState(false); // State to manage modal visibility
  const [selectedImage, setSelectedImage] = useState(""); // State for the selected image

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get(`/report/${id}`); // Fetches data for the specific id
        setReport(response.data); // Sets the fetched report data
        console.log("Fetched Report:", response.data); // Log the fetched data
      } catch (error) {
        console.error("Error fetching report data:", error);
        toast.error("Failed to fetch report data.");
      }
    };

    fetchReport();
  }, [id]);

  const getStatusLabel = (status) => {
    switch (status) {
      case "open":
        return "Opened";
      case "closed":
        return "Closed";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-blue-600 text-white"; // Blue for opened
      case "closed":
        return "bg-green-600 text-white"; // Green for closed
      case "rejected":
        return "bg-red-600 text-white"; // Red for rejected
      default:
        return "bg-gray-200 text-black"; // Gray for other statuses
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleImageClick = (src) => {
    setSelectedImage(src); // Set the selected image for the modal
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setSelectedImage(""); // Clear the selected image
  };

  return (
    <Box m="20px">
      <Header title="View Report" subtitle="Details of Report ID" />
      {report ? (
        <div className="items-center space-y-4 md:space-y-0 py-4 bg-gray-900">
          <div className="flex justify-end mb-4">
            <p
              className={`flex items-center px-4 py-1 rounded-full mr-2 ${getStatusColor(
                report.status
              )}`}
            >
              {getStatusLabel(report.status)} {/* Display the status text */}
            </p>
          </div>
          <div className="ml-6">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <p className="font-bold text-gray-200 text-xl">Program Name:</p>
                <p className="text-gray-300 mt-1">{report.program_name}</p>
              </Grid>
              <Grid item xs={12} md={6}>
                <p className="font-bold text-gray-200 text-xl">
                  Program Title:
                </p>
                <p className="text-gray-300 mt-1">{report.title}</p>
              </Grid>
              <Grid item xs={6}>
                <p className="font-bold text-gray-200 text-xl">
                  Program Description:
                </p>
                <p className="text-gray-300 mt-1">{report.description}</p>
              </Grid>
              <Grid item xs={6}>
                <p className="font-bold text-gray-200 text-xl">Date:</p>
                <p className="text-gray-300 mt-1">
                  {formatDate(report.created_at)}
                </p>
              </Grid>
              <Grid item xs={12}>
                <p className="font-bold text-gray-200 text-xl">Impact:</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-300 mt-1">{report.impact}</p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <p className="font-bold text-gray-200 text-xl">
                  Vulnerabilities:
                </p>
                <ul className="list-disc text-gray-300">
                  {Array.isArray(report.vulnerabilities) ? (
                    report.vulnerabilities.map((vulnerability, index) => (
                      <li key={index}>{vulnerability}</li>
                    ))
                  ) : typeof report.vulnerabilities === "string" ? (
                    report.vulnerabilities
                      .split("\n")
                      .map((vulnerability, index) => (
                        <li key={index}>{vulnerability}</li>
                      ))
                  ) : (
                    <li>No vulnerabilities listed</li>
                  )}
                </ul>
              </Grid>
              <Grid item xs={12}>
                <p className="font-bold text-gray-200 text-xl">
                  Steps to Reproduce:
                </p>
                <p className="text-gray-300 mt-1">
                  {report.steps_to_reproduce}
                </p>
              </Grid>
            </Grid>
            <div className="mt-6 mb-6">
              <h1 className="font-bold text-gray-200 text-xl">Attachments</h1>
              {report.attachments && report.attachments.length > 0 ? (
                <div className="mt-2 flex flex-wrap justify-start">
                  {report.attachments.map((attachment, index) => (
                    <div key={index} className="flex-shrink-0 m-2">
                      <img
                        src={`${config.BASE_URL}${attachment}`}
                        alt={`Attachment ${index + 1}`}
                        className="rounded border border-gray-500 cursor-pointer"
                        style={{ width: "250px", height: "250px" }}
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
          <div className="flex justify-between">
            {" "}
            {/* Add mt-4 here for top margin */}
            <div className="ml-4">
              <Link to="/report">
                <button className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-md text-lg w-full sm:w-auto px-5 py-2.5 text-center focus:ring-gray-700">
                  Back
                </button>
              </Link>
            </div>
            <select
              id="report-status"
              value={report.status}
              className="border mt-2 mr-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 py-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              onChange={(e) => {
                console.log("Selected status:", e.target.value);
                // You can add logic here to update the report status
              }}
            >
              <option value="open">Opened</option>
              <option value="closed">Closed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}

      {/* Modal for displaying the selected image */}
      {/* Modal for displaying the selected image */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
      >
        <div className="relative">
          <button
            onClick={handleCloseModal}
            className="absolute top-1 right-0 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-700"
            aria-label="Remove image"
          >
            &times;
          </button>
          <DialogContent style={{ padding: 0 }}>
            {" "}
            {/* Remove padding to fit image properly */}
            <img
              src={selectedImage}
              alt="Large view"
              className="w-full h-auto max-w-full max-h-[90vh] object-contain" // Set max height to 90vh to fit the viewport
            />
          </DialogContent>
        </div>
      </Dialog>
    </Box>
  );
};

export default ReportView;
