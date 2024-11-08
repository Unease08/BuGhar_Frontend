import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import api from "../../../library/Api";

const CompanyVerification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/company/details/");
        console.log("Data fetched from API:", response.data);
        setCompanyData(response.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(companyData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentData = companyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box m="20px">
      <Header title="Company Verification" subtitle="List of Companies" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            {loading ? (
              <tr>
                <td
                  colSpan="8"
                  className="p-6 text-center text-white bg-gray-800 rounded-lg"
                >
                  Loading...
                </td>
              </tr>
            ) : currentData.length > 0 ? (
              currentData.map((company, index) => (
                <tr
                  key={company.id}
                  className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white"
                >
                  <td className="px-6 py-4">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4">
                    {company.company_name ?? "null"}
                  </td>
                  <td className="px-6 py-4">{company.website ?? "null"}</td>
                  <td className="px-6 py-4">{company.country ?? "null"}</td>
                  <td className="px-6 py-4">
                    {company.phone_number ?? "null"}
                  </td>
                  <td className="px-6 py-6 flex items-center space-x-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        company.verifications?.[0]?.status === "approved"
                          ? "bg-green-500"
                          : company.verifications?.[0]?.status === "pending"
                          ? "bg-yellow-500"
                          : company.verifications?.[0]?.status === "rejected"
                          ? "bg-red-500"
                          : company.verifications?.[0]?.status === "submitted"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      }`}
                    ></span>
                    <span className="">
                      {company.verifications?.[0]?.status
                        ? company.verifications[0].status
                            .charAt(0)
                            .toUpperCase() +
                          company.verifications[0].status.slice(1).toLowerCase()
                        : "Null"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {formatDate(company.created_at)}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <Link to={`/company/${company.id}`}>
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
