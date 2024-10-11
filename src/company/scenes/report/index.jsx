import { Box } from "@mui/material";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { FaSort } from "react-icons/fa";

const Report = () => {
  return (
    <Box m="20px">
      <Header title="Reports" subtitle="List of Reports" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
          <div className="flex space-x-2">
            <button className="py-2.5 px-3 rounded-lg text-white font-medium bg-red-600 hover:bg-red-700 transition-colors duration-200">
              Critical
            </button>
            <button className="py-2.5 px-3 rounded-lg text-white font-medium bg-orange-500 hover:bg-orange-600 transition-colors duration-200">
              High
            </button>
            <button className="py-2.5 px-3 rounded-lg text-white font-medium bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200">
              Moderate
            </button>
            <button className="py-2.5 px-3 rounded-lg text-white font-medium bg-green-500 hover:bg-green-600 transition-colors duration-200">
              Low
            </button>
            <button className="py-2.5 px-3 rounded-lg text-white font-medium bg-blue-500 hover:bg-blue-600 transition-colors duration-200">
              Informational
            </button>
            <button className="py-2.5 px-3 rounded-lg text-white font-medium bg-gray-500 hover:bg-gray-600 transition-colors duration-200">
              All
            </button>
          </div>

          <div className="relative flex justify-end flex-grow items-center">
            <input
              type="text"
              className="block p-3 text-sm border rounded-lg w-full md:w-80 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for programs"
            />
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-md uppercase bg-gray-700 text-gray-400">
            <tr>
              <th className="flex items-center px-6 py-3 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200">
                S.N.
              </th>
              <th className="px-6 py-3 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200">
                <div className="flex">
                  Program
                  <i className="ml-2 mt-1 text-gray-300">
                    <FaSort />
                  </i>
                </div>
              </th>
              <th className="px-6 py-3 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200">
                <div className="flex">
                  Min Price
                  <i className="ml-2 mt-1 text-gray-300">
                    <FaSort />
                  </i>
                </div>
              </th>
              <th className="px-6 py-3 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200">
                <div className="flex">
                  Max Price
                  <i className="ml-2 mt-1 text-gray-300">
                    <FaSort />
                  </i>
                </div>
              </th>
              <th className="px-6 py-3">
                <div className="flex">
                  Status
                  <i className="ml-2 mt-1 text-gray-300">
                    <FaSort />
                  </i>
                </div>
              </th>
              <th className="px-6 py-3">
                <div className="flex">
                  Start Date
                  <i className="ml-2 mt-1 text-gray-300">
                    <FaSort />
                  </i>
                </div>
              </th>
              <th className="px-6 py-3 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200">
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
            {/* Static Data */}
            <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
              <td className="px-6 py-4 text-gray-900 dark:text-white">1</td>
              <td className="flex items-center px-6 py-6 whitespace-nowrap text-white">
                <div className="text-base font-semibold">Sample Program 1</div>
              </td>
              <td className="px-6 py-4">Rs. 1000</td>
              <td className="px-6 py-4">Rs. 5000</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div
                    className="h-2.5 w-2.5 rounded-full mr-2 bg-green-500"
                    aria-label="Active"
                    role="status"
                  ></div>
                  Active
                </div>
              </td>
              <td className="px-6 py-4">2024-01-01</td>
              <td className="px-6 py-4">2024-12-31</td>
              <td className="px-6 py-4 space-x-2">
                <Link to={`/update-program/1`}>
                  <button className="py-2.5 px-3 rounded-lg text-sm font-medium text-white bg-green-700 hover:bg-green-900 transition-colors duration-200">
                    Update
                  </button>
                </Link>
                <button className="py-2.5 px-3 rounded-lg text-sm font-medium text-white bg-red-700 hover:bg-red-900 transition-colors duration-200">
                  Delete
                </button>
              </td>
            </tr>

            <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
              <td className="px-6 py-4 text-gray-900 dark:text-white">2</td>
              <td className="flex items-center px-6 py-6 whitespace-nowrap text-white">
                <div className="text-base font-semibold">Sample Program 2</div>
              </td>
              <td className="px-6 py-4">Rs. 2000</td>
              <td className="px-6 py-4">Rs. 6000</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div
                    className="h-2.5 w-2.5 rounded-full mr-2 bg-red-500"
                    aria-label="Inactive"
                    role="status"
                  ></div>
                  Inactive
                </div>
              </td>
              <td className="px-6 py-4">2024-02-01</td>
              <td className="px-6 py-4">2024-11-30</td>
              <td className="px-6 py-4 space-x-2">
                <Link to={`/update-program/2`}>
                  <button className="py-2.5 px-3 rounded-lg text-sm font-medium text-white bg-green-700 hover:bg-green-900 transition-colors duration-200">
                    Update
                  </button>
                </Link>
                <button className="py-2.5 px-3 rounded-lg text-sm font-medium text-white bg-red-700 hover:bg-red-900 transition-colors duration-200">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default Report;
