import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import api from "../../../library/Api";
import { toast } from "react-hot-toast";

const Payable = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await api.get("/reward/company/reward");
        setRewards(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch rewards");
        console.error("Error fetching rewards:", error);
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box m="20px">
      <Header title="Payable" subtitle="List of Rewards To Be Paid" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-gray-900">
          <div className="flex gap-5 ml-2">
            <div>
              <select className="border text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 text-white">
                <option value="All Impact">All Impact</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="informational">Informational</option>
              </select>
            </div>
          </div>
        </div>
        <>
          {loading ? (
            <div className="text-center text-white py-10">Loading...</div>
          ) : (
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-md uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th className="px-6 py-3">S.N.</th>
                  <th className="px-6 py-3">Program</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Impact</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {rewards.map((reward, index) => (
                  <tr
                    key={reward.id}
                    className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{reward.program_name}</td>
                    <td>
                      {" "}
                      {reward.email}{" "}
                      {reward.username ? `[${reward.username}]` : ""}
                    </td>
                    <td className="px-6 py-4">{reward.impact}</td>

                    <td className="px-6 py-6 flex items-center space-x-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          reward.status === "new"
                            ? "bg-blue-600 text-white"
                            : reward.status === "triaged"
                            ? "bg-yellow-500 text-white"
                            : reward.status === "pending"
                            ? "bg-orange-500 text-white"
                            : reward.status === "in_progress"
                            ? "bg-indigo-600 text-white"
                            : reward.status === "resolved"
                            ? "bg-green-600 text-white"
                            : reward.status === "not_applicable"
                            ? "bg-gray-500 text-white"
                            : reward.status === "duplicate"
                            ? "bg-gray-400 text-white"
                            : reward.status === "wont_fix"
                            ? "bg-red-600 text-white"
                            : reward.status === "informative"
                            ? "bg-teal-500 text-white"
                            : reward.status === "closed"
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      ></span>
                      <span>
                        {reward.status === "new"
                          ? "New"
                          : reward.status === "triaged"
                          ? "Triaged"
                          : reward.status === "pending"
                          ? "Pending"
                          : reward.status === "in_progress"
                          ? "In Progress"
                          : reward.status === "resolved"
                          ? "Resolved"
                          : reward.status === "not_applicable"
                          ? "Not Applicable"
                          : reward.status === "duplicate"
                          ? "Duplicate"
                          : reward.status === "wont_fix"
                          ? "Won't Fix"
                          : reward.status === "informative"
                          ? "Informative"
                          : reward.status === "closed"
                          ? "Closed"
                          : reward.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(reward.created_at)}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <Link to={`/payment/${reward.id}`}>
                        <button className="py-2 px-3 text-white bg-blue-700 rounded-lg hover:bg-blue-900">
                          Pay Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      </div>
    </Box>
  );
};

export default Payable;
