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
  const [responseCode, setResponseCode] = useState("");

  const fetchLogs = async (limit) => {
    try {
      const response = await api.get(`/logs`, {
        params: { limit },
      });
      const logsString = response.data.logs;
      const parsedLogs = parseLogs(logsString);
      setAllLogs(parsedLogs);
      applyFilters(parsedLogs, requestMethod, limit, responseCode);
    } catch (error) {
      console.error("Error fetching logs:", error);
      toast.error("Failed to fetch logs");
    }
  };

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

  const applyFilters = (logs, method, limit, responseCode) => {
    const methodFilteredLogs = method
      ? logs.filter((log) => log.action.startsWith(method))
      : logs;

    const responseFilteredLogs = responseCode
      ? methodFilteredLogs.filter((log) =>
          log.response.startsWith(responseCode)
        )
      : methodFilteredLogs;

    const limitedLogs = responseFilteredLogs.slice(0, limit);
    setFilteredLogs(limitedLogs);
  };

  useEffect(() => {
    fetchLogs(logLimit);
  }, [logLimit]);

  const handleLimitChange = (event) => {
    setLogLimit(Number(event.target.value));
  };

  const handleRequestMethodChange = (event) => {
    setRequestMethod(event.target.value);
    applyFilters(allLogs, event.target.value, logLimit, responseCode);
  };

  const handleResponseCodeChange = (event) => {
    setResponseCode(event.target.value);
    applyFilters(allLogs, requestMethod, logLimit, event.target.value);
  };

  return (
    <Box m="20px">
      <Header title="Logs" subtitle="View Logs" />
      <div className="bg-gray-900 text-white min-h-screen mt-4">
        <div className="container mx-auto py-4 px-4">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-3">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-gray-800 shadow rounded-lg p-6 h-[640px]">
                <div className="flex flex-col">
                  <h1 className="flex justify-center text-xl text-indigo-400 font-bold">
                    Log Filter
                  </h1>
                  <div className="mt-8">
                    <label
                      htmlFor="logLimit"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Log Limit
                    </label>
                    <select
                      id="logLimit"
                      value={logLimit}
                      onChange={handleLimitChange}
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      HTTP Request Method
                    </label>
                    <select
                      id="requestMethod"
                      value={requestMethod}
                      onChange={handleRequestMethodChange}
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">ALL</option>
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                      <option value="OPTIONS">OPTIONS</option>
                    </select>
                  </div>

                  <div className="mt-8">
                    <label
                      htmlFor="responseCode"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Search for Response Code
                    </label>
                    <input
                      type="text"
                      id="responseCode"
                      value={responseCode}
                      onChange={handleResponseCodeChange}
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="200"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-4 sm:col-span-9">
              <div className="bg-gray-800 h-[650px] shadow rounded-lg p-4">
                <h2 className="text-lg font-bold text-indigo-400 mb-4">
                  Server Log ({filteredLogs.length})
                </h2>
                <div className="p-4 border overflow-y-auto overflow-x-hidden font-mono text-sm bg-black text-green-500 h-[580px]">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log, index) => (
                      <div key={index} className="mb-1">
                        <span className="text-blue-400">[{log.timestamp}]</span>
                        <span className="text-yellow-400"> {log.action}</span>
                        <span className="text-green-400">
                          {" "}
                          - Response: {log.response}
                        </span>
                        <span className="text-purple-400"> - IP: {log.ip}</span>
                        <span className="text-pink-400">
                          {" "}
                          - User-Agent: {log.userAgent}
                        </span>
                        <span className="text-cyan-400">
                          {" "}
                          - User ID: {log.userId}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p>No logs available.</p>
                  )}
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
