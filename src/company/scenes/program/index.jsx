import { Box, Typography, useTheme } from "@mui/material";
import { Header } from "../../components";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataInvoices } from "../../data/mockData";
import { tokens } from "../../../theme";
import { useState } from "react";
import { FaSort } from "react-icons/fa";

const Program = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name"); // default sort field
  const [sortDirection, setSortDirection] = useState("asc"); // default sort direction
  const [users] = useState([
    {
      id: 1,
      name: "Neil Sims",
      email: "neil.sims@flowbite.com",
      position: "React Developer",
      status: "Active",
      min_price: 20000,
      max_price: 5000,
      start_date: "2024-02-23",
      end_date: "2024-12-20",
    },
    {
      id: 2,
      name: "Bonnie Green",
      email: "bonnie@flowbite.com",
      position: "Designer",
      status: "Inactive",
      min_price: 40000,
      max_price: 10000,
      start_date: "2024-02-23",
      end_date: "2024-12-20",
    },
    {
      id: 3,
      name: "Jese Leos",
      email: "jese@flowbite.com",
      position: "Vue JS Developer",
      status: "Active",
      min_price: 60000,
      max_price: 5000,
      start_date: "2024-08-23",
      end_date: "2024-10-20",
    },
    {
      id: 4,
      name: "Thomas Lean",
      email: "thomes@flowbite.com",
      position: "UI/UX Engineer",
      status: "Inactive",
      min_price: 30000,
      max_price: 5000,
      start_date: "2024-02-23",
      end_date: "2024-12-20",
    },
  ]);

  const handleSort = (field) => {
    const direction =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortField === "min_price" || sortField === "max_price") {
      return sortDirection === "asc"
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    } else if (sortField === "start_date" || sortField === "end_date") {
      return sortDirection === "asc"
        ? new Date(a[sortField]) - new Date(b[sortField])
        : new Date(b[sortField]) - new Date(a[sortField]);
    } else {
      return sortDirection === "asc"
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    }
  });

  return (
    <Box m="20px">
      <Header title="Programs" subtitle="List of Programs" />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
          <div className="relative flex justify-between flex-grow items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block p-3 text-sm border rounded-lg w-full md:w-80 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for programs"
            />
            <div className="mr-4">
              <button className="py-2 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                Add Program
              </button>
            </div>
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-md uppercase bg-gray-700 text-gray-400">
            <tr>
              <th
                scope="col"
                className="flex items-center px-6 py-3 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
              >
                S.N.
              </th>

              <th
                scope="col"
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
                scope="col"
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
                scope="col"
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
              <th
                scope="col"
                className="px-6 py-3"
                onClick={() => handleSort("status")}
              >
                <div className="flex">
                  Status
                  <i className="ml-2 mt-1 text-gray-300">
                    <FaSort />
                  </i>
                </div>
              </th>
              <th
                scope="col"
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
                scope="col"
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

              <th
                scope="col"
                className="px-6 py-3 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers
              .filter((user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                >
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {index + 1}
                  </td>
                  <td className="flex items-center px-6 py-4  whitespace-nowrap text-white">
                    <div className="">
                      <div className="text-base font-semibold">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">Rs. {user.min_price}</td>
                  <td className="px-6 py-4">Rs. {user.max_price}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full mr-2 ${
                          user.status.toLowerCase() === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      {user.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.start_date}</td>
                  <td className="px-6 py-4">{user.end_date}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="py-2.5 px-3 rounded-lg text-sm font-medium text-white bg-green-700 hover:bg-green-900 transition-colors duration-200">
                      Update
                    </button>
                    <button className="py-2.5 px-3 rounded-lg text-sm font-medium text-white bg-red-700 hover:bg-red-900 transition-colors duration-200">
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
