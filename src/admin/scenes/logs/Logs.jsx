import {
  Box,
  Grid,
  Dialog,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Header } from "../../components";
import api from "../../../library/Api"; // Ensure this is your API instance
import { toast } from "react-hot-toast";
import config from "../../../config"; // Ensure this import path is correct for your project

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [logLimit, setLogLimit] = useState(100); // State for the selected log limit

  // Function to fetch logs with the selected limit
  const fetchLogs = async () => {
    try {
      const response = await api.get(`/logs?limit=${logLimit}`);
      console.log("API Response:", response.data); // Log the response to the console
      const logsString = response.data.logs; // Get the log string
      const parsedLogs = parseLogs(logsString); // Parse the logs into a more readable format
      setLogs(parsedLogs); // Store the parsed logs in the state
    } catch (error) {
      console.error("Error fetching logs:", error);
      toast.error("Failed to fetch logs");
    }
  };

  // UseEffect to fetch logs when the component mounts or when logLimit changes
  useEffect(() => {
    fetchLogs(); // Call the function to fetch logs with the current logLimit
  }, [logLimit]); // Dependency array ensures this runs whenever the logLimit changes

  // Function to parse the log string into an array of log entries
  const parseLogs = (logsString) => {
    const logEntries = logsString.split("\n"); // Split the string by new lines
    return logEntries
      .filter((entry) => entry.trim() !== "") // Filter out empty entries
      .map((entry) => {
        // Extract different parts of the log for better readability
        const timestamp = entry.split(" - ")[0]; // Timestamp
        const action = entry.split("Request: ")[1]?.split(" - ")[0] || ""; // Action (GET/POST)
        const response = entry.split("Response: ")[1]?.split(" - ")[0] || ""; // Response status code
        const ip = entry.split("IP: ")[1]?.split(" - ")[0] || ""; // IP address
        const userAgent = entry.split("User-Agent: ")[1]?.split(" - ")[0] || ""; // User Agent
        const userId = entry.split("user_id: ")[1]?.split(" - ")[0] || ""; // User ID

        return { timestamp, action, response, ip, userAgent, userId }; // Return structured log entry
      });
  };

  // Function to handle the change event of the log limit dropdown
  const handleLimitChange = (event) => {
    const selectedLimit = event.target.value; // Get the selected limit
    setLogLimit(selectedLimit); // Update the logLimit state
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
                  <div class="">
                    <label
                      htmlFor="logLimit"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Log Limit
                    </label>
                    <select
                      id="logLimit"
                      value={logLimit} // Set the current selected limit as the value
                      onChange={handleLimitChange} // Call the handler when value changes
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="500">500</option>
                      <option value="1000">1000</option>
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
                      <h2 className="text-lg font-bold">
                        Server Log ({logs.length}){" "}
                        {/* Dynamically display log count */}
                      </h2>
                      <div className="p-4 mt-2 border h-full overflow-y-auto">
                        {logs.length > 0 ? (
                          <div className="font-mono">
                            {logs.map((log, index) => (
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
