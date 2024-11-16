import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import api from "../.../../../../library/Api";

const MyReport = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get("/report/");
        console.log("API response", response.data);

        const sortedReports = response.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setReports(sortedReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const totalPages = Math.ceil(reports.length / reportsPerPage);

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="w-full max-w-screen-sm px-4 ml-8">
        <div className="relative">
          <IoSearch className="absolute left-3 mt-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            id="search"
            name="Search"
            className="w-full mt-10 rounded-sm border text-white border-gray-300 bg-gray-700 py-2 pl-10 pr-3 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search by report title or program name"
            type="search"
          />
        </div>
      </div>
      <div className="bg-card mt-10 ml-10 bg-gray-700 text-card-foreground p-2 rounded-lg max-w-7xl">
        <div className="text-muted-foreground">
          <h1 className="text-indigo-400 text-2xl">My Reports</h1>
          <p className="text-gray-50 mt-2">
            Your reports till now are listed below
          </p>
        </div>

        {currentReports.length > 0 ? (
          currentReports.map((report, index) => (
            <div
              key={index}
              className="p-1 mt-4 mb-4 border border-gray-50 rounded-lg"
            >
              <div className="ml-3 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl text-indigo-400">
                    {report.program_name}
                  </span>
                  <div className="flex items-center space-x-2 mr-4">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        report.status === "new"
                          ? "bg-blue-600"
                          : report.status === "triaged"
                          ? "bg-yellow-500"
                          : report.status === "pending"
                          ? "bg-orange-500"
                          : report.status === "in_progress"
                          ? "bg-indigo-600"
                          : report.status === "resolved"
                          ? "bg-green-600"
                          : report.status === "not_applicable"
                          ? "bg-gray-500"
                          : report.status === "duplicate"
                          ? "bg-gray-400"
                          : report.status === "wont_fix"
                          ? "bg-red-600"
                          : report.status === "informative"
                          ? "bg-teal-500"
                          : report.status === "closed"
                          ? "bg-green-600"
                          : "bg-gray-200"
                      }`}
                    ></span>
                    <span className="text-white font-bold">
                      {report.status
                        .replace("_", " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col mt-1 space-y-1">
                  <div className="flex items-center space-x-1">
                    <span className="text-lg font-semibold text-white">
                      Title:{" "}
                    </span>
                    <p className="text-md text-gray-400">
                      {report.title.length > 50
                        ? `${report.title.slice(0, 50)}...`
                        : report.title}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-white">Date of Submission: </span>
                    <p className="text-gray-400">
                      {formatDate(report.created_at)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-1 mb-2">
                <Link to={`/myreport/view/${report.id}`}>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    View Report
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 mt-4">No reports found.</p>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-2">
              {/* Prev Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 bg-gray-800 text-white rounded-md disabled:opacity-50"
              >
                Prev
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 border border-gray-300 rounded-md ${
                    currentPage === index + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 bg-gray-800 text-white rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReport;
