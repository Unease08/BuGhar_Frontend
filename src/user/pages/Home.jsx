import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import toast from "react-hot-toast";
import { IoStatsChartSharp } from "react-icons/io5";
import DashboardSidebar from "../components/dashboardsidebar/DashboardSidebar";
import api from "../../library/Api";

function Dashboard() {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    profile_picture: "",
  });
  const [dashboardData, setDashboardData] = useState({
    total_reports_submitted: 0,
    total_rewards_received: 0,
    status_summary: {
      new: 0,
      triaged: 0,
      pending: 0,
      in_progress: 0,
      not_applicable: 0,
      resolve: 0,
      duplicate: 0,
      informative: 0,
      closed: 0,
    },
  });

  useEffect(() => {
    const message = sessionStorage.getItem("toastMessage");
    if (message) {
      toast.success(message);
      sessionStorage.removeItem("toastMessage");
    }
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/user/details/");
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/user/dashboard/");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchUserDetails();
    fetchDashboardData();
  }, []);

  const imageUrl = userData.profile_picture
    ? `${config.BASE_URL}/${userData.profile_picture}`
    : "https://saugat-nepal.com.np/assets/img/profile-img.png";

  const { total_reports_submitted, total_rewards_received, status_summary } =
    dashboardData;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <DashboardSidebar />
          </div>

          <div className="col-span-4 sm:col-span-9">
            <div className="bg-gray-800 shadow rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-900 shadow rounded-lg p-6">
                  <h3 className="text-md font-semibold text-gray-400">
                    Total Submission
                  </h3>
                  <p className="text-indigo-400 text-lg font-bold">
                    {total_reports_submitted}
                  </p>
                </div>

                <div className="bg-gray-900 shadow rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-200">
                    Received Reward
                  </h3>
                  <p className="text-green-600 text-lg font-bold">
                    Rs.{total_rewards_received}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                  <div className="bg-gray-900 shadow rounded-lg p-6">
                    <div className="text-xl flex gap-2 font-bold text-indigo-400">
                      <i>
                        <IoStatsChartSharp />
                      </i>
                      Submission Status
                    </div>
                    <div className="flex justify-between mt-3">
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          New
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          {status_summary.new || 0}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          Triaged
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          {status_summary.triaged || 0}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          Pending
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          {status_summary.pending || 0}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          In Progress
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          {status_summary.in_progress || 0}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          Not Applicable
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          {status_summary.not_applicable || 0}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          Resolve
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          {status_summary.resolve || 0}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          Duplicate
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          {status_summary.duplicate || 0}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          Informative
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          {status_summary.informative || 0}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          Closed
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          {status_summary.closed || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
