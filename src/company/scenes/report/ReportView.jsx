import {
  Box,
  Grid,
  Dialog,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../../components";
import api from "../../../library/Api";
import { toast } from "react-hot-toast";
import config from "../../../config"; // Ensure this import path is correct for your project

const ReportView = () => {
  const { id } = useParams(); // Extract 'id' from the URL
  const [report, setReport] = useState(null);
  const [openModal, setOpenModal] = useState(false); // Modal visibility state
  const [selectedImage, setSelectedImage] = useState(""); // State for selected image
  const [comment, setComment] = useState(""); // State to hold comment text
  const [comments, setComments] = useState([]); // State to hold list of comments
  const [impact, setImpact] = useState(""); // Initially empty
  const [status, setStatus] = useState(""); // Initially empty

  // Fetch report data
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get(`/report/${id}`); // Fetch report data
        setReport(response.data); // Set the report data
        setImpact(response.data.impact || ""); // Set initial impact value
        setStatus(response.data.status || ""); // Set initial status value
      } catch (error) {
        console.error("Error fetching report data:", error);
        toast.error("Failed to fetch report data.");
      }
    };

    fetchReport();
  }, [id]);

  const getStatusLabel = (status) => {
    const statusLabels = {
      new: "New",
      triaged: "Triaged",
      pending: "Pending",
      in_progress: "In Progress",
      resolved: "Resolved",
      not_applicable: "Not Applicable",
      duplicate: "Duplicate",
      wont_fix: "Won't Fix",
      informative: "Informative",
      closed: "Closed",
    };
    return statusLabels[status] || status;
  };

  const getStatusColor = (status) => {
    const statusColors = {
      new: "bg-blue-600 text-white",
      triaged: "bg-yellow-500 text-white",
      pending: "bg-orange-500 text-white",
      in_progress: "bg-indigo-600 text-white",
      resolved: "bg-green-600 text-white",
      not_applicable: "bg-gray-500 text-white",
      duplicate: "bg-gray-400 text-white",
      wont_fix: "bg-red-600 text-white",
      informative: "bg-teal-500 text-white",
      closed: "bg-green-600 text-white",
    };
    return statusColors[status] || "bg-gray-200 text-black";
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleImageClick = (src) => {
    setSelectedImage(src); // Set selected image for modal
    setOpenModal(true); // Open modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close modal
    setSelectedImage(""); // Clear selected image
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value); // Update comment state
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        { text: comment, author: "Anonymous", date: new Date() },
      ]);
      setComment(""); // Clear the comment box after submission
      toast.success("Comment added successfully.");
    } else {
      toast.error("Comment cannot be empty.");
    }
  };

  // Handle impact change
  const handleImpactChange = (event) => {
    setImpact(event.target.value); // Update impact value
  };

  // Handle status change
  const handleStatusChange = (event) => {
    setStatus(event.target.value); // Update status value
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("impact", impact); // Append updated impact value
    formData.append("status", status); // Append updated status value

    try {
      const response = await api.put(`/report/${id}/impact_status`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Or "multipart/form-data" if sending files
        },
      });

      // Check if the status is 200 and success is true in the response data
      if (response.status === 200 && response.data.message) {
        // Show a success toast with the success message from the backend
        toast.success(response.data.message || "Report updated successfully!");
        setReport((prev) => ({
          ...prev,
          impact: impact,
          status: status,
        }));
      } else {
        // If the response data doesn't contain success message, show a generic error
        toast.error(response.data.message || "Failed to update report.");
      }
    } catch (error) {
      console.error("Error updating report:", error);

      // Use error message from backend response, if available
      const errorMessage =
        error.response?.data?.detail || "Unknown error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <Box m="20px">
      <Header title="View Report" subtitle="Report Data" />
      <div className="bg-gray-900 text-white min-h-screen mt-4">
        <div className="container mx-auto py-4 px-4">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-3">
            {/* Report Content */}
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-gray-800 shadow rounded-lg p-4">
                {report ? (
                  <div>
                    <div className="mt-5 ml-4">
                      <span className="font-semibold text-lg">Title</span>
                      <p className="text-sm mt-1">{report.title}</p>
                    </div>
                    <div className="mt-3 ml-4">
                      <span className="font-semibold text-lg">
                        Steps To Reproduce
                      </span>
                      <p className="text-sm mt-1">
                        {report.steps_to_reproduce}
                      </p>
                    </div>
                    <div className="mt-3 ml-4">
                      <span className="font-semibold text-lg">Description</span>
                      <p className="text-sm mt-1">{report.description}</p>
                    </div>
                    <div className="mt-10 ml-4">
                      <h1 className="text-indigo-400 font-bold text-lg">
                        Attachments
                      </h1>
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
                                  handleImageClick(
                                    `${config.BASE_URL}${attachment}`
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400">
                          No attachments available
                        </p>
                      )}
                    </div>
                    <hr className="mt-10" />

                    {/* Comment Box */}
                    <div className="mt-10 ml-4">
                      <h1 className="text-indigo-400 font-bold text-lg">
                        Add a Comment
                      </h1>
                      <div className="mt-4 flex">
                        {/* User Profile Image */}
                        <img
                          src="https://saugat-nepal.com.np/assets/img/profile-img.png" // Replace with dynamic user image URL if necessary
                          alt="User Avatar"
                          className="rounded-full w-6 h-6 border-2 border-black mr-3"
                        />
                        {/* Comment Text Field */}
                        <div className="flex-1">
                          <TextField
                            fullWidth
                            multiline
                            rows={2}
                            value={comment}
                            onChange={handleCommentChange}
                            variant="outlined"
                            className="mt-5 bg-gray-700 text-white"
                            placeholder="Write your comment..."
                          />
                        </div>
                      </div>

                      {/* Post Button */}
                      <div className="flex justify-end mt-3">
                        <Button
                          onClick={handleCommentSubmit}
                          variant="contained"
                          color="primary"
                          className="mt-3"
                        >
                          Post Comment
                        </Button>
                      </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-5 ml-4">
                      <h1 className="text-indigo-400 font-bold text-lg">
                        Comments
                      </h1>
                      {comments.length > 0 ? (
                        comments.map((comment, index) => (
                          <div
                            key={index}
                            className="p-2 bg-gray-800 rounded-md mb-3"
                          >
                            {/* Author Image, Name, and Date on the same row */}
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                {/* Image on the left side of the name */}
                                <img
                                  src={
                                    comment.authorImage ||
                                    "https://via.placeholder.com/30"
                                  } // Placeholder if no image
                                  alt={comment.author}
                                  className="w-8 h-8 rounded-full border-2 border-gray-600"
                                />
                                <p className="font-semibold">
                                  {comment.author}
                                </p>
                              </div>
                              <span className="text-xs text-gray-400">
                                {formatDate(comment.date)}
                              </span>
                            </div>
                            {/* Comment Text */}
                            <p className="text-sm mt-1 ml-10 text-gray-300">
                              {comment.text}
                            </p>
                            <hr className="mt-3" />
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">No comments yet.</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>

            {/* Report Metadata */}
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-gray-800 shadow rounded-lg p-6 h-[650px]">
                <div className="flex flex-col">
                  {report ? (
                    <>
                      <h1 className="font-bold">
                        Submitted At: {formatDate(report.created_at)}
                      </h1>
                      <h4 className="mt-4 font-bold">Reported by:</h4>
                      <div className="mt-2 flex gap-2">
                        <img
                          src={
                            report.profile_picture &&
                            report.profile_picture !== null
                              ? `${config.BASE_URL}${report.profile_picture}`
                              : "https://saugat-nepal.com.np/assets/img/profile-img.png" // Default image when profile picture is null or undefined
                          }
                          className="rounded-full w-6 h-6 border-2 border-black shadow-xl cursor-pointer"
                          alt="Profile"
                        />
                        <span>
                          {report.first_name} {report.last_name}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-col">
                        <span className="font-bold">Vulnerability Type:</span>
                        <span className="text-[11px] mt-2 font-bold">
                          {Array.isArray(report.vulnerabilities) ? (
                            report.vulnerabilities.map(
                              (vulnerability, index) => (
                                <li key={index}>{vulnerability}</li>
                              )
                            )
                          ) : typeof report.vulnerabilities === "string" ? (
                            report.vulnerabilities
                              .split("\n")
                              .map((vulnerability, index) => (
                                <li key={index}>{vulnerability}</li>
                              ))
                          ) : (
                            <li>No vulnerabilities listed</li>
                          )}
                        </span>
                      </div>
                      <div>
                        <div className="mt-4">
                          <p className="text-sm font-bold">Impact:</p>
                          <select
                            id="report-impact"
                            value={impact} // Bind value to state
                            onChange={handleImpactChange} // Handle value change
                            className="border mt-2 mr-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                          >
                            <option value="critical">Critical</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                            <option value="informative">Informative</option>
                          </select>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-bold">Status:</p>
                          <select
                            id="report-status"
                            value={status} // Bind value to state
                            onChange={handleStatusChange} // Handle value change
                            className="border mt-2 mr-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                          >
                            <option value="new">New</option>
                            <option value="triaged">Triaged</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="not_applicable">
                              Not Applicable
                            </option>
                            <option value="duplicate">Duplicate</option>
                            <option value="wont_fix">Won't Fix</option>
                            <option value="informative">Informative</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>

                        <div className="mt-8 flex justify-end">
                          <button
                            onClick={handleUpdate} // Call the update function
                            className="bg-indigo-600 text-white py-1 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default ReportView;
