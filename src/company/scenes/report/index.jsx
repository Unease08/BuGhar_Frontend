import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import api from "../../../library/Api";
import { toast } from "react-hot-toast";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImpact, setSelectedImpact] = useState("All Impact");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get("/report/");
        setReports(response.data.reverse()); // Reverse the data to show the latest first
        console.log("Fetched Reports:", response.data); // Log the fetched data
      } catch (error) {
        console.error("Error fetching reports data:", error);
      }
    };

    fetchReports();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/report/${id}`, { status: newStatus });
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === id ? { ...report, status: newStatus } : report
        )
      );
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  const handleDeleteReport = async (id) => {
    try {
      await api.delete(`/report/${id}`);
      setReports((prevReports) =>
        prevReports.filter((report) => report.id !== id)
      );
      toast.success("Report deleted successfully!");
    } catch (error) {
      console.error("Error deleting report:", error);
      toast.error("Failed to delete report.");
    }
  };

  // Sort and filter reports based on impact and status
  const filteredReports = reports
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) // Sort in ascending order of date
    .filter((report) => {
      const impactFilter =
        selectedImpact === "All Impact" || report.impact === selectedImpact;
      const statusFilter =
        selectedStatus === "All Status" || report.status === selectedStatus;
      return impactFilter && statusFilter;
    });

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentReports = filteredReports.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box m="20px">
      <Header title="Reports" subtitle="List of Reports" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-gray-900">
          <div className="flex gap-5 ml-2">
            <div>
              <select
                value={selectedImpact}
                onChange={(e) => setSelectedImpact(e.target.value)}
                className="border  text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 text-white"
              >
                <option value="All Impact">All Impact</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="informational">Informational</option>
              </select>
            </div>
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 text-white ml-4"
              >
                <option value="All Status">All Status</option>
                <option value="opened">Opened</option>
                <option value="triaged">Triaged</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="not_applicable">Not Applicable</option>
                <option value="duplicate">Duplicate</option>
                <option value="wont_fix">Won't Fix</option>
                <option value="informative">Informative</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {currentReports.length > 0 ? (
          <>
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-md uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th className="px-6 py-3">S.N.</th>
                  <th className="px-6 py-3">Program</th>
                  <th className="px-6 py-3">Reporter</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Impact</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentReports.map((report, index) => (
                  <tr
                    key={report.id}
                    className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white"
                  >
                    <td className="px-6 py-4">{startIdx + index + 1}</td>
                    <td className="px-6 py-4">{report.program_name}</td>
                    <td className="px-6 py-4">
                      {report.first_name} {report.last_name}
                    </td>

                    <td className="px-6 py-4">{report.title}</td>
                    <td className="px-6 py-4">{report.impact}</td>
                    <td className="px-6 py-4">
                      {formatDate(report.created_at)}
                    </td>
                    <td className="px-6 py-6 flex items-center space-x-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          report.status === "opened"
                            ? "bg-blue-600 text-white" // Blue for opened
                            : report.status === "triaged"
                            ? "bg-yellow-500 text-white" // Yellow for triaged
                            : report.status === "pending"
                            ? "bg-orange-500 text-white" // Orange for pending
                            : report.status === "in_progress"
                            ? "bg-indigo-600 text-white" // Indigo for in progress
                            : report.status === "resolved"
                            ? "bg-green-600 text-white" // Green for resolved
                            : report.status === "not_applicable"
                            ? "bg-gray-500 text-white" // Gray for not applicable
                            : report.status === "duplicate"
                            ? "bg-gray-400 text-white" // Light Gray for duplicate
                            : report.status === "wont_fix"
                            ? "bg-red-600 text-white" // Red for won't fix
                            : report.status === "informative"
                            ? "bg-teal-500 text-white" // Teal for informative
                            : report.status === "closed"
                            ? "bg-green-600 text-white" // Green for closed
                            : "bg-gray-200 text-black" // Default gray for unknown statuses
                        }`}
                      ></span>
                      <span>
                        {report.status === "opened"
                          ? "Opened"
                          : report.status === "triaged"
                          ? "Triaged"
                          : report.status === "pending"
                          ? "Pending"
                          : report.status === "in_progress"
                          ? "In Progress"
                          : report.status === "resolved"
                          ? "Resolved"
                          : report.status === "not_applicable"
                          ? "Not Applicable"
                          : report.status === "duplicate"
                          ? "Duplicate"
                          : report.status === "wont_fix"
                          ? "Won't Fix"
                          : report.status === "informative"
                          ? "Informative"
                          : report.status === "closed"
                          ? "Closed"
                          : report.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 space-x-2">
                      <Link to={`/report-view/${report.id}`}>
                        <button className="py-2 px-3 text-white bg-blue-700 rounded-lg hover:bg-blue-900">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border bg-gray-800 text-white rounded-md disabled:opacity-50"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 border rounded-md ${
                      currentPage === index + 1
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border bg-gray-800 text-white rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </>
        ) : (
          <div className="p-6 text-center text-white bg-gray-800 rounded-lg">
            No data to show.
          </div>
        )}
      </div>
    </Box>
  );
};

export default Report;
