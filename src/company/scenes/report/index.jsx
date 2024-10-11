import { Box } from "@mui/material";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { FaSort } from "react-icons/fa";

// Sample JSON data (you can also import this from a separate JSON file)
const reportData = [
  {
    id: 1,
    program: "Sample Program 1",
    minPrice: 1000,
    maxPrice: 5000,
    status: "Critical",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: 2,
    program: "Sample Program 2",
    minPrice: 2000,
    maxPrice: 6000,
    status: "High",
    startDate: "2024-02-01",
    endDate: "2024-11-30",
  },
  {
    id: 3,
    program: "Sample Program 3",
    minPrice: 1500,
    maxPrice: 4500,
    status: "Moderate",
    startDate: "2024-03-01",
    endDate: "2024-09-30",
  },
  {
    id: 4,
    program: "Sample Program 4",
    minPrice: 3000,
    maxPrice: 8000,
    status: "Low",
    startDate: "2024-04-01",
    endDate: "2024-10-30",
  },
  {
    id: 5,
    program: "Sample Program 5",
    minPrice: 2500,
    maxPrice: 7000,
    status: "Informational",
    startDate: "2024-05-01",
    endDate: "2024-08-31",
  },
];

const Report = () => {
  return (
    <Box m="20px">
      <Header title="Reports" subtitle="List of Reports" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
          <div className="relative flex justify-start flex-grow items-center">
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
            {reportData.map((report, index) => (
              <tr
                key={report.id}
                className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
              >
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  {index + 1}
                </td>
                <td className="flex items-center px-6 py-6 whitespace-nowrap text-white">
                  <div className="text-base font-semibold">
                    {report.program}
                  </div>
                </td>
                <td className="px-6 py-4">Rs. {report.minPrice}</td>
                <td className="px-6 py-4">Rs. {report.maxPrice}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">{report.status}</div>
                </td>
                <td className="px-6 py-4">{report.startDate}</td>
                <td className="px-6 py-4">{report.endDate}</td>
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
      </div>
    </Box>
  );
};

export default Report;
