import { Box, useTheme } from "@mui/material";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSort } from "react-icons/fa";
import api from "../../../library/Api";
import { toast } from "react-hot-toast";

const Program = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [programs, setPrograms] = useState([]);

  // Fetch programs data from the API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await api.get("/programs/");
        setPrograms(response.data.reverse()); // Reverse the array to show new data first
      } catch (error) {
        console.error("Error fetching programs data:", error);
      }
    };

    fetchPrograms();
  }, []);

  const handleSort = (field) => {
    const direction =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);
  };

  const sortedPrograms = [...programs].sort((a, b) => {
    const aValue = a[sortField] !== undefined ? a[sortField] : "";
    const bValue = b[sortField] !== undefined ? b[sortField] : "";

    if (sortField === "min_price" || sortField === "max_price") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    } else if (sortField === "start_date" || sortField === "end_date") {
      return sortDirection === "asc"
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    } else if (sortField === "status") {
      return sortDirection === "asc"
        ? aValue === bValue
          ? 0
          : aValue
          ? -1
          : 1
        : aValue === bValue
        ? 0
        : aValue
        ? 1
        : -1;
    } else {
      return sortDirection === "asc"
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    }
  });

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this program?"
    );
    if (!confirmation) return;

    try {
      await api.delete(`/programs/${id}`);
      toast.success("Program deleted successfully!");
      setPrograms((prevPrograms) =>
        prevPrograms.filter((program) => program.id !== id)
      );
    } catch (error) {
      console.error("Error deleting program:", error);
      toast.error("Failed to delete program.");
    }
  };

  return (
    <Box m="20px">
      <Header title="Programs" subtitle="List of Programs" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-gray-900">
          <div className="relative flex justify-between flex-grow items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block p-3 text-sm border rounded-lg w-full md:w-80 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for programs"
            />
            <Link to="/add-program">
              <div className="mr-4">
                <button className="py-2 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                  Add Program
                </button>
              </div>
            </Link>
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-md uppercase bg-gray-700 text-gray-400">
            <tr>
              <th className="flex items-center px-6 py-3 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200">
                S.N.
              </th>
              <th
                className="px-6 py-3 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
                onClick={() => handleSort("name")}
              >
                <div className="flex">
                  Program
                  <i className="ml-2 mt-1 text-gray-300">
                    <FaSort />
                  </i>
                </div>
              </th>
              <th
                className="px-6 py-3 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
                onClick={() => handleSort("min_price")}
              >
                <div className="flex">
                  Min Price
                  <i className="ml-2 mt-1 text-gray-300">
                    <FaSort />
                  </i>
                </div>
              </th>
              <th
                className="px-6 py-3 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
                onClick={() => handleSort("max_price")}
              >
                <div className="flex">
                  Max Price
                  <i className="ml-2 mt-1 text-gray-300">
                    <FaSort />
                  </i>
                </div>
              </th>
              <th className="px-6 py-3" onClick={() => handleSort("status")}>
                <div className="flex">
                  Status
                  <i className="ml-2 mt-1 text-gray-300">
                    <FaSort />
                  </i>
                </div>
              </th>
              <th
                className="px-6 py-3"
                onClick={() => handleSort("start_date")}
              >
                <div className="flex">
                  Start Date
                  <i className="ml-2 mt-1 text-gray-300">
                    <FaSort />
                  </i>
                </div>
              </th>
              <th
                className="px-6 py-3 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
                onClick={() => handleSort("end_date")}
              >
                <div className="flex">
                  End Date
                  <i className="ml-2 mt-1 text-gray-300">
                    <FaSort />
                  </i>
                </div>
              </th>

              <th className="px-6 py-3 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPrograms
              .filter((program) =>
                program.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((program, index) => (
                <tr
                  key={program.id}
                  className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white"
                >
                  <td className="px-6 py-4 text-white">{index + 1}</td>
                  <td className="flex items-center px-6 py-6 whitespace-nowrap text-white">
                    <div className="text-base font-semibold">
                      {program.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">Rs. {program.min_price}</td>
                  <td className="px-6 py-4">Rs. {program.max_price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full mr-2 ${
                          program.is_active ? "bg-green-500" : "bg-red-500"
                        }`}
                        aria-label={program.is_active ? "Active" : "Inactive"}
                        role="status"
                      ></div>
                      {program.is_active ? "Active" : "Inactive"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {formatDate(program.start_date)}
                  </td>
                  <td className="px-6 py-4">{formatDate(program.end_date)}</td>
                  <td className="px-6 py-4 space-x-2">
                    <Link to={`/update-program/${program.id}`}>
                      <button className="py-2.5 px-3 rounded-lg text-sm font-medium text-white bg-green-700 hover:bg-green-900 transition-colors duration-200">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(program.id)}
                      className="py-2.5 px-3 rounded-lg text-sm font-medium text-white bg-red-700 hover:bg-red-900 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default Program;
