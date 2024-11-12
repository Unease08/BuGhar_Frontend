import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Header } from "../../components";
import api from "../../../library/Api";
import { toast } from "react-hot-toast";

const Logs = () => {
  const [allLogs, setAllLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [logLimit, setLogLimit] = useState(100);
  const [requestMethod, setRequestMethod] = useState("");

  const fetchLogs = async (limit) => {
    try {
      const response = await api.get(`/logs`, {
        params: { limit },
      });
      const logsString = response.data.logs;
      const parsedLogs = parseLogs(logsString);
      setAllLogs(parsedLogs); // Store all logs in the state
      applyFilters(parsedLogs, requestMethod, limit); // Apply filters based on the current method and limit
    } catch (error) {
      console.error("Error fetching logs:", error);
      toast.error("Failed to fetch logs");
    }
  };

  // Function to parse the log string into an array of log entries
  const parseLogs = (logsString) => {
    const logEntries = logsString.split("\n");
    return logEntries
      .filter((entry) => entry.trim() !== "")
      .map((entry) => {
        const timestamp = entry.split(" - ")[0];
        const action = entry.split("Request: ")[1]?.split(" - ")[0] || "";
        const response = entry.split("Response: ")[1]?.split(" - ")[0] || "";
        const ip = entry.split("IP: ")[1]?.split(" - ")[0] || "";
        const userAgent = entry.split("User-Agent: ")[1]?.split(" - ")[0] || "";
        const userId = entry.split("user_id: ")[1]?.split(" - ")[0] || "";

        return { timestamp, action, response, ip, userAgent, userId };
      });
  };

  // Function to apply filters for request method and limit on the logs
  const applyFilters = (logs, method, limit) => {
    const methodFilteredLogs = method
      ? logs.filter((log) => log.action.startsWith(method))
      : logs;

    const limitedLogs = methodFilteredLogs.slice(0, limit); // Apply limit to the filtered logs
    setFilteredLogs(limitedLogs);
  };

  // UseEffect to fetch logs when the component mounts or when logLimit changes
  useEffect(() => {
    fetchLogs(logLimit); // Call fetchLogs with the selected logLimit
  }, [logLimit]); // Run whenever logLimit changes

  // Function to handle the change event of the log limit dropdown
  const handleLimitChange = (event) => {
    const selectedLimit = Number(event.target.value);
    setLogLimit(selectedLimit); // Update the logLimit state
  };

  // Function to handle the change event for the request method filter
  const handleRequestMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setRequestMethod(selectedMethod); // Update the requestMethod state
    applyFilters(allLogs, selectedMethod, logLimit); // Apply the new filter on the existing logs
  };

  return (
    <Box m="20px">
      <Header title="Logs" subtitle="View Logs" />
      <div className="bg-gray-900 text-white min-h-screen mt-4">
        <div className="container mx-auto py-4 px-4">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-3">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-gray-800 shadow rounded-lg p-6 h-[650px]">
                <div className="flex flex-col">
                  <h1 className="flex justify-center text-xl text-indigo-400 font-bold">
                    Log Filter
                  </h1>
                  <div className="mt-8">
                    <label
                      htmlFor="logLimit"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Log Limit
                    </label>
                    <select
                      id="logLimit"
                      value={logLimit}
                      onChange={handleLimitChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="500">500</option>
                      <option value="1000">1000</option>
                    </select>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="requestMethod"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      HTTP Request Method
                    </label>
                    <select
                      id="requestMethod"
                      value={requestMethod}
                      onChange={handleRequestMethodChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">ALL</option>
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                      <option value="OPTIONS">OPTIONS</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-4 sm:col-span-9">
              <div className="bg-gray-800 h-[650px] shadow rounded-lg p-4">
                <div>
                  <div className="mt-5 ml-4">
                    <div className="h-[550px] mr-2">
                      <h2 className="text-lg font-bold text-indigo-400">
                        Server Log ({filteredLogs.length})
                      </h2>
                      <div className="p-4 mt-2 border h-full overflow-y-auto">
                        {filteredLogs.length > 0 ? (
                          <div className="font-mono">
                            {filteredLogs.map((log, index) => (
                              <div key={index} className="mb-4">
                                <div>
                                  <strong>Timestamp:</strong> {log.timestamp}
                                </div>
                                <div>
                                  <strong>Action:</strong> {log.action}
                                </div>
                                <div>
                                  <strong>Response Code:</strong> {log.response}
                                </div>
                                <div>
                                  <strong>IP Address:</strong> {log.ip}
                                </div>
                                <div>
                                  <strong>User-Agent:</strong> {log.userAgent}
                                </div>
                                <div>
                                  <strong>User ID:</strong> {log.userId}
                                </div>
                                <hr />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p>No logs available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Logs;
