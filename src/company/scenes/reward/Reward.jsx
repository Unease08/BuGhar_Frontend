import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import api from "../../../library/Api";
import { toast } from "react-hot-toast";

const Reward = () => {
  const [rewards, setRewards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rewardsPerPage = 8;

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await api.get("/reward/all");
        setRewards(response.data);
      } catch (error) {
        console.error("Error fetching rewards:", error);
        toast.error("Failed to load rewards data.");
      }
    };

    fetchRewards();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(rewards.length / rewardsPerPage);

  // Get the rewards for the current page
  const currentRewards = rewards.slice(
    (currentPage - 1) * rewardsPerPage,
    currentPage * rewardsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
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
      <Header title="Rewards" subtitle="List of Rewards" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-end flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-gray-900">
          <Link to="/payable">
            <button className="px-6 py-2 mr-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300">
              To Pay
            </button>
          </Link>
        </div>
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-md uppercase bg-gray-700 text-gray-400">
            <tr>
              <th className="px-6 py-3">S.N.</th>
              <th className="px-6 py-3">Program</th>
              <th className="px-6 py-3">Reporter Email</th>
              <th className="px-6 py-3">Amount </th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentRewards.map((reward, index) => (
              <tr
                key={reward.id}
                className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white"
              >
                <td className="px-6 py-4">
                  {(currentPage - 1) * rewardsPerPage + index + 1}
                </td>
                <td className="px-6 py-4">{reward.program_name}</td>
                <td>
                  {" "}
                  {reward.reporter_email}{" "}
                  {reward.reporter_username
                    ? `[${reward.reporter_username}]`
                    : ""}
                </td>
                <td className="px-6 py-4">Rs. {reward.amount}</td>
                <td className="px-6 py-6 flex items-center space-x-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      reward.status === "paid"
                        ? "bg-green-600 text-white"
                        : "bg-yellow-600 text-white"
                    }`}
                  ></span>

                  <span>{reward.status === "paid" ? "Paid" : "Pending"}</span>
                </td>
                <td className="px-6 py-4">{formatDate(reward.rewarded_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      {rewards.length === 0 && (
        <div className="p-6 text-center text-white bg-gray-800 rounded-lg">
          No data to show.
        </div>
      )}
    </Box>
  );
};

export default Reward;
