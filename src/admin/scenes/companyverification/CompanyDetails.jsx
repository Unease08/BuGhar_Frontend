import { Box, Grid, Dialog, DialogContent, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { Header } from "../../components";
import { Link, useParams } from "react-router-dom";
import api from "../../../library/Api"; // Assuming this is the API service file
import config from "../../../config";

const CompanyDetails = () => {
  const { id } = useParams(); // Get the company ID from the URL
  const [companyData, setCompanyData] = useState(null); // Initialize with null to handle loading state
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(""); // State to hold the current status
  const [openModal, setOpenModal] = useState(false); // Modal state
  const [selectedImage, setSelectedImage] = useState(""); // Selected image state for the modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/company/details/${id}`); // Fetch data based on ID
        console.log("Data fetched from API:", response.data);
        setCompanyData(response.data); // Set the company data
        setStatus(response.data.verifications?.[0]?.status || "Not Verified"); // Set the initial status
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchData();
  }, [id]); // The effect will run whenever the `id` changes

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500"; // Green for approved
      case "pending":
        return "bg-yellow-500"; // Yellow for pending
      case "rejected":
        return "bg-red-500"; // Red for rejected
      case "submitted":
        return "bg-blue-500"; // Blue for submitted
      default:
        return "bg-gray-500"; // Default gray if status is unknown
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "pending":
        return "Pending";
      case "rejected":
        return "Rejected";
      case "submitted":
        return "Submitted";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus); // Update local state

    try {
      // Send the updated status to the server
      await api.put(`/company/update-status/${id}`, { status: newStatus });
      console.log("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleImageClick = (src) => {
    setSelectedImage(src); // Set the selected image for the modal
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setSelectedImage(""); // Clear the selected image
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state while data is being fetched
  }

  if (!companyData) {
    return <div>No company data found.</div>; // Handle case where no data is found
  }

  const companyLogoUrl = companyData.company_logo
    ? `${config.BASE_URL}/${companyData.company_logo}`
    : "https://saugat-nepal.com.np/assets/img/profile-img.png"; // Use default URL if logo is missing

  return (
    <Box m="20px">
      <Header title="Company Information" />
      <form className="max-w-8xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col gap-8">
        <div className="flex justify-end mb-4">
          <p
            className={`flex items-center px-4 py-1 rounded-full mr-2 ${getStatusColor(
              status
            )}`}
          >
            {getStatusLabel(status)} {/* Display the status label */}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <label className="w-32 h-32 overflow-hidden rounded-full border-4 border-blue-300 flex justify-center items-center cursor-pointer">
            <img
              alt="Logo"
              className="object-cover w-full h-full"
              src={companyLogoUrl} // Display the company logo or the default logo
            />
          </label>
        </div>
        <div className="ml-6">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <p className="font-bold text-gray-200 text-xl">Company Name:</p>
              <p className="text-gray-300 mt-1">{companyData.company_name}</p>
            </Grid>
            <Grid item xs={12} md={6}>
              <p className="font-bold text-gray-200 text-xl">
                Company Website:
              </p>
              <p className="text-gray-300 mt-1">
                {companyData.website || "N/A"}
              </p>
            </Grid>
            <Grid item xs={12} md={6}>
              <p className="font-bold text-gray-200 text-xl">Country:</p>
              <p className="text-gray-300 mt-1">
                {companyData.country || "N/A"}
              </p>
            </Grid>
            <Grid item xs={12} md={6}>
              <p className="font-bold text-gray-200 text-xl">Phone Number:</p>
              <p className="text-gray-300 mt-1">
                {companyData.phone_number || "N/A"}
              </p>
            </Grid>
            <Grid item xs={12} md={6}>
              <p className="font-bold text-gray-200 text-xl">Date:</p>
              <p className="text-gray-300 mt-1">
                {formatDate(companyData.created_at)}
              </p>
            </Grid>
            <Grid item xs={12} md={12}>
              <p className="font-bold text-gray-200 text-xl">
                Company Description:
              </p>
              <p className="text-gray-300 mt-1">
                {companyData.description || "N/A"}
              </p>
            </Grid>
            <div className="mt-6 mb-6">
              <h1 className="font-bold text-gray-200 text-xl">Attachments</h1>
              {companyData?.documents && companyData.documents.length > 0 ? (
                <div className="mt-2 flex flex-wrap justify-start">
                  {companyData.documents.map((document, index) => (
                    <div key={index} className="flex-shrink-0 m-2">
                      <img
                        src={`${config.BASE_URL}/${document.document_url}`} // Use the document URL to display the image
                        alt={`Document ${document.document_type} - ${
                          index + 1
                        }`}
                        className="rounded border border-gray-500 cursor-pointer"
                        style={{ width: "250px", height: "250px" }}
                        onClick={() =>
                          handleImageClick(
                            `${config.BASE_URL}/${document.document_url}`
                          )
                        } // Open the image in a modal
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No attachments available</p>
              )}
            </div>
          </Grid>
        </div>
        <div className="flex justify-between">
          <div className="ml-4">
            <Link to="/company">
              <button className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-md text-lg w-full sm:w-auto px-5 py-2.5 text-center focus:ring-gray-700">
                Back
              </button>
            </Link>
          </div>
          <select
            id="report-status"
            value={status} // Bind the select value to the status state
            onChange={handleStatusChange} // Handle status change
            className="border mt-2 mr-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 py-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="submitted">Submitted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </form>

      {/* Modal Dialog for Image */}
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
            aria-label="Close image"
          >
            &times;
          </button>
          <DialogContent style={{ padding: 0 }}>
            <img
              src={selectedImage}
              alt="Large view"
              className="w-full h-auto max-w-full max-h-[90vh] object-contain"
            />
          </DialogContent>
        </div>
      </Dialog>
    </Box>
  );
};

export default CompanyDetails;
