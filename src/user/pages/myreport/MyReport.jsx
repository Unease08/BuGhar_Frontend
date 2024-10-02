import React from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const MyReport = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="w-full max-w-screen-sm px-4 ml-8">
        <div className="relative">
          <IoSearch className="absolute left-3 mt-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            id="search"
            name="Search"
            className="w-full mt-10 rounded-sm border text-white border-gray-300 bg-gray-700 py-2 pl-10 pr-3 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search by report title or program name"
            type="search"
          />
        </div>
      </div>
      <div className="bg-card mt-10 ml-10 bg-gray-700 text-card-foreground p-4 rounded-lg max-w-7xl">
        <div className="text-muted-foreground">
          <h1 className="text-indigo-400 text-2xl">My Reports</h1>
          <p className="text-gray-50 mt-2">
            Your reports till now is listed below
          </p>
        </div>
        <div class="p-4 mt-5 border border-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-2xl text-indigo-400">Programiz</span>
            <span className="text-white text-lg">20th September, 2024</span>
          </div>
          <div className="flex flex-col mt-4 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-white">Title: </span>
              <p className="text-lg text-gray-400">Programiz</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white">Date of Submission: </span>
              <p className="text-gray-400">20 September, 2024</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white">Bounty Received: </span>
              <p className="text-gray-400">Rs. 30,000</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Link to="/myreport/view">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                View Report
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReport;
