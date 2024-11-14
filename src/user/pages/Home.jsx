import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { IoStatsChartSharp } from "react-icons/io5";
import DashboardSidebar from "../components/dashboardsidebar/DashboardSidebar";

function Dashboard() {
  useEffect(() => {
    const message = sessionStorage.getItem("toastMessage");
    if (message) {
      toast.success(message);
      sessionStorage.removeItem("toastMessage");
    }
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <DashboardSidebar />
          </div>

          <div className="col-span-4 sm:col-span-9">
            <div className="bg-gray-800 shadow rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Box 1 */}
                <div className="bg-gray-900 shadow rounded-lg p-6">
                  <h3 className="text-md font-semibold text-gray-400">
                    Total Submission
                  </h3>
                  <p className="text-indigo-400 text-lg font-bold">5</p>
                </div>

                {/* Box 2 */}
                <div className="bg-gray-900 shadow rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-200">
                    Received Reward
                  </h3>
                  <p className="text-green-600 text-lg font-bold">Rs.400</p>
                </div>

                {/* Box 3 */}
                <div className="bg-gray-900 shadow rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-200">
                    Pending Reward
                  </h3>
                  <p className="text-red-600 text-lg font-bold">Rs.345</p>
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
                          0
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          Triaged
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          0
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          Pending
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          0
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          In Progress
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          0
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          Not Applicable
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          0
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          Resolve
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          0
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          Duplicate
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          0
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          Informative
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          0
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md">
                          Closed
                        </span>
                        <span className="text-lg font-bold text-gray-300">
                          0
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
