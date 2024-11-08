import { useState } from "react";
import { Box } from "@mui/material";
import { Header } from "../../components";
import { Link } from "react-router-dom";

const demoData = [
  {
    id: 1,
    name: "Company A",
    website: "www.companya.com",
    country: "USA",
    number: "+1 234 567 890",
    date: "2024-11-01",
    status: "Pending",
  },
  {
    id: 2,
    name: "Company B",
    website: "www.companyb.com",
    country: "Canada",
    number: "+1 234 567 891",
    date: "2024-11-02",
    status: "Submitted",
  },
  {
    id: 3,
    name: "Company C",
    website: "www.companyc.com",
    country: "UK",
    number: "+44 123 456 789",
    date: "2024-11-03",
    status: "Approved",
  },
  {
    id: 4,
    name: "Company D",
    website: "www.companyd.com",
    country: "Germany",
    number: "+49 123 456 789",
    date: "2024-11-04",
    status: "Rejected",
  },
  {
    id: 5,
    name: "Company E",
    website: "www.companye.com",
    country: "France",
    number: "+33 123 456 789",
    date: "2024-11-05",
    status: "Pending",
  },
  {
    id: 6,
    name: "Company F",
    website: "www.companyf.com",
    country: "Italy",
    number: "+39 123 456 789",
    date: "2024-11-06",
    status: "Submitted",
  },
  {
    id: 7,
    name: "Company G",
    website: "www.companyg.com",
    country: "Spain",
    number: "+34 123 456 789",
    date: "2024-11-07",
    status: "Approved",
  },
  {
    id: 8,
    name: "Company H",
    website: "www.companyh.com",
    country: "Netherlands",
    number: "+31 123 456 789",
    date: "2024-11-08",
    status: "Rejected",
  },
  {
    id: 9,
    name: "Company I",
    website: "www.companyi.com",
    country: "Australia",
    number: "+61 123 456 789",
    date: "2024-11-09",
    status: "Pending",
  },
  {
    id: 10,
    name: "Company J",
    website: "www.companyj.com",
    country: "Japan",
    number: "+81 123 456 789",
    date: "2024-11-10",
    status: "Submitted",
  },
];


const CompanyVerification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  // Filter data based on search term
  const filteredData = demoData.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box m="20px">
      <Header title="Company Verification" subtitle="List of Companies" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-gray-900">
          <div className="flex gap-5 ml-2">
            <div>
              <select className="border text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 text-white">
                <option value="All Impact">Verification Status</option>
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end md:ml-auto w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 text-white focus:outline-none w-96"
            />
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-md uppercase bg-gray-700 text-gray-400">
            <tr>
              <th className="px-6 py-3">S.N.</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Website</th>
              <th className="px-6 py-3">Country</th>
              <th className="px-6 py-3">Number</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((company, index) => (
                <tr
                  key={company.id}
                  className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white"
                >
                  <td className="px-6 py-4 text-white">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 text-white">{company.name}</td>
                  <td className="px-6 py-4">{company.website}</td>
                  <td className="px-6 py-4">{company.country}</td>
                  <td className="px-6 py-4">{company.number}</td>
                  <td className="px-6 py-6 flex items-center space-x-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        company.status === "Approved"
                          ? "bg-green-500"
                          : company.status === "Pending"
                          ? "bg-yellow-500"
                          : company.status === "Rejected"
                          ? "bg-red-500"
                          : company.status === "Submitted"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      }`}
                    ></span>
                    <span className="text-white">{company.status}</span>
                  </td>
                  <td className="px-6 py-4">{company.date}</td>
                  <td className="px-6 py-4 space-x-2">
                    <Link to={`/company-view/${company.id}`}>
                      <button className="py-2 px-3 text-white bg-blue-700 rounded-lg hover:bg-blue-900">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="p-6 text-center text-white bg-gray-800 rounded-lg"
                >
                  No data to show.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
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
      </div>
    </Box>
  );
};

export default CompanyVerification;
