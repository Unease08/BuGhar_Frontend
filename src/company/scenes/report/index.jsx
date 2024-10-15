import { Box } from "@mui/material";
import { useState } from "react";
import { Header } from "../../components";
import { Link } from "react-router-dom";

// Sample JSON data
const initialReportData = [
  {
    id: 1,
    program: "Sample Program 1",
    minPrice: 1000,
    maxPrice: 5000,
    impact: "Critical",
    status: "Opened",
  },
  {
    id: 2,
    program: "Sample Program 2",
    minPrice: 2000,
    maxPrice: 6000,
    impact: "High",
    status: "Closed",
  },
  {
    id: 3,
    program: "Sample Program 3",
    minPrice: 1500,
    maxPrice: 4500,
    impact: "Moderate",
    status: "Opened",
  },
  {
    id: 4,
    program: "Sample Program 4",
    minPrice: 3000,
    maxPrice: 8000,
    impact: "Low",
    status: "Rejected",
  },
  {
    id: 5,
    program: "Sample Program 5",
    minPrice: 2500,
    maxPrice: 7000,
    impact: "Informational",
    status: "Opened",
  },
  {
    id: 6,
    program: "Sample Program 6",
    minPrice: 1200,
    maxPrice: 4200,
    impact: "Critical",
    status: "Closed",
  },
  {
    id: 7,
    program: "Sample Program 7",
    minPrice: 2600,
    maxPrice: 7100,
    impact: "High",
    status: "Opened",
  },
  {
    id: 8,
    program: "Sample Program 8",
    minPrice: 3200,
    maxPrice: 8300,
    impact: "Moderate",
    status: "Rejected",
  },
  {
    id: 9,
    program: "Sample Program 9",
    minPrice: 2900,
    maxPrice: 7800,
    impact: "Informational",
    status: "Opened",
  },
  // Add more data as needed
];

const Report = () => {
  const [reports, setReports] = useState(initialReportData);
  const [selectedImpact, setSelectedImpact] = useState("All Impact");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  // Function to handle status change
  const handleStatusChange = (id, newStatus) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id ? { ...report, status: newStatus } : report
      )
    );
  };

  // Filter the reports based on selected impact, status, and search query
  const filteredReports = reports.filter((report) => {
    const impactFilter =
      selectedImpact === "All Impact" || report.impact === selectedImpact;
    const statusFilter =
      selectedStatus === "All Status" || report.status === selectedStatus;
    const searchFilter = report.program
      .toLowerCase()
      .includes(searchQuery.toLowerCase()); // Check if the program name includes the search query

    return impactFilter && statusFilter && searchFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentReports = filteredReports.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box m="20px">
      <Header title="Reports" subtitle="List of Reports" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
          <div className="flex gap-5 ml-2">
            <div>
              <select
                value={selectedImpact}
                onChange={(e) => setSelectedImpact(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="All Impact">All Impact</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
                <option value="Low">Low</option>
                <option value="Informational">Informational</option>
              </select>
            </div>
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="All Status">All Status</option>
                <option value="Opened">Opened</option>
                <option value="Closed">Closed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="relative flex justify-end flex-grow items-center">
            <input
              type="text"
              value={searchQuery} // Bind the input field to the searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // Update the search query state on input change
              className="block p-3 text-sm border rounded-lg w-full md:w-80 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for programs"
            />
          </div>
        </div>

        {currentReports.length > 0 ? (
          <>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-md uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th className="px-6 py-3">S.N.</th>
                  <th className="px-6 py-3">Program</th>
                  <th className="px-6 py-3">Min Price</th>
                  <th className="px-6 py-3">Max Price</th>
                  <th className="px-6 py-3">Impact</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentReports.map((report, index) => (
                  <tr
                    key={report.id}
                    className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {startIdx + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      <div className="text-base font-semibold">
                        {report.program}
                      </div>
                    </td>
                    <td className="px-6 py-4">Rs. {report.minPrice}</td>
                    <td className="px-6 py-4">Rs. {report.maxPrice}</td>
                    <td className="px-6 py-4">{report.impact}</td>
                    <td className="px-6 py-4">
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={report.status}
                        onChange={(e) =>
                          handleStatusChange(report.id, e.target.value)
                        }
                      >
                        <option value="Opened">Opened</option>
                        <option value="Closed">Closed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <Link to={`/update-program/${report.id}`}>
                        <button className="py-2.5 px-3 rounded-lg text-sm font-medium text-white bg-green-700 hover:bg-green-900 transition-colors duration-200">
                          Update
                        </button>
                      </Link>
                      <button className="py-2.5 px-3 rounded-lg text-sm font-medium text-white bg-red-700 hover:bg-red-900 transition-colors duration-200">
                        Delete
                      </button>
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
                  className="px-4 py-2 border border-gray-300 bg-gray-800 text-white rounded-md disabled:opacity-50"
                >
                  Prev
                </button>
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
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 bg-gray-800 text-white rounded-md disabled:opacity-50"
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
