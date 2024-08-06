import React, { useState } from "react";
import profile1 from "../../../assets/profile1.jpg";

const ProgramsDetails = () => {
  const [activeTab, setActiveTab] = useState("Program Details");
  const tabs = ["Program Details", "Announcements", "Hall of Fame"];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="flex justify-start ml-32 gap-40">
        <div className="bg-card mt-10 bg-gray-700 text-card-foreground p-4 rounded-lg max-w-6xl">
          <h1 className="mt-2 text-3xl font-bold font-grotesk text-indigo-400">
            Under Armour’s vision
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Under Armour’s vision is to inspire you with performance solutions
            you never knew you needed and can’t imagine living without.
          </p>
          <div className="mt-4 text-right mb-2 flex justify-end gap-2 items-center">
            <span className="text-primary font-bold text-xl text-indigo-400">
              Rs 125 - Rs 2,500
            </span>{" "}
            <span className="font-semibold font-grotesk">
              per vulnerability
            </span>
          </div>
          <hr />
          <button className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded">
            Submit Report
          </button>
        </div>
        <div className="h-52 w-52 mt-10 mr-5 border-4 border-white rounded-full overflow-hidden shadow-lg">
          <img
            src={profile1}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="bg-card mt-2 ml-32 h-14 bg-gray-700 text-card-foreground p-4 rounded-xl w-[970px]">
        <div className="flex gap-10 mb-2 font-bold text-lg ml-4 text-gray-400 cursor-pointer">
          {tabs.map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? "text-indigo-500 underline"
                  : "text-gray-400"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-card mt-5 ml-32 h-auto bg-gray-700 text-card-foreground p-4 rounded-md w-[970px] mx-auto shadow-lg">
        <div className="w-full mt-2">
          <div className="font-sans">
            <h1 className="font-bold text-indigo-400 text-xl mb-4">
              Information
            </h1>
            <p className="text-sm leading-6 text-gray-300">
              We are Programiz and we are ready to work with the talented cyber
              security experts/ethical hackers from all over the world. If you
              found or believe you found a security vulnerability in any of our
              systems, we will happily accept your report and reward you
              according to the impact of your report. See the rewards tab to see
              how we pay your reports.
            </p>
            <hr className="mt-10" />
          </div>
          <div className="font-sans mt-10">
            <h1 className="font-bold text-indigo-400 text-xl mb-4">Target</h1>
            <span className="text-black font-extrabold ml-1">In Scope</span>
            <div className="block w-full overflow-x-auto border mt-5">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 bg-gray-50 text-gray-700  align-middle py-3 text-md font-bold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                      Targets
                    </th>
                    <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-md font-bold text-left uppercase border-l-0 border-r-0 whitespace-nowrap"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="text-white">
                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left cursor-pointer">
                      Https://programiz.com/python-programming/online-compiler
                    </th>
                    <td className="border-t-0 px-4 align-middle text-sm font-medium text-white whitespace-nowrap p-4 cursor-pointer">
                      Website
                    </td>
                  </tr>
                  <tr className="text-white">
                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left cursor-pointer">
                      Https://programiz.com/python-programming/online-compiler
                    </th>
                    <td className="border-t-0 px-4 align-middle text-sm font-medium text-white whitespace-nowrap p-4 cursor-pointer">
                      Website
                    </td>
                  </tr>
                  <tr className="text-white">
                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left cursor-pointer">
                      Https://programiz.com/python-programming/online-compiler
                    </th>
                    <td className="border-t-0 px-4 align-middle text-sm font-medium text-white whitespace-nowrap p-4 cursor-pointer">
                      Website
                    </td>
                  </tr>
                  <tr className="text-white">
                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left cursor-pointer">
                      Https://programiz.com/python-programming/online-compiler
                    </th>
                    <td className="border-t-0 px-4 align-middle text-sm font-medium text-white whitespace-nowrap p-4 cursor-pointer">
                      Website
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr className="mt-10" />
          </div>
          <div className="font-sans mt-10">
            <h1 className="font-bold text-indigo-400 text-xl mb-4">Reward</h1>
            <div className="block w-full overflow-x-auto border mt-5">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-md font-bold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                      Severity
                    </th>
                    <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-sm font-bold text-right uppercase border-l-0 border-r-0 whitespace-nowrap">
                      Reward Range
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="text-white">
                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left cursor-pointer">
                      <button className="bg-red-500 text-white font-bold py-2 px-4 rounded w-32">
                        Critical
                      </button>
                    </th>
                    <td className="border-t-0 px-4 align-middle text-sm font-medium text-white whitespace-nowrap p-4 text-right cursor-pointer">
                      Rs 10000 - RS 20000
                    </td>
                  </tr>
                  <tr className="text-white">
                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left cursor-pointer">
                      <button className="bg-red-400 text-red-700 font-bold py-2 px-4 rounded w-32">
                        High
                      </button>
                    </th>
                    <td className="border-t-0 px-4 align-middle text-sm font-medium text-white whitespace-nowrap p-4 text-right cursor-pointer">
                      Rs 10000 - RS 20000
                    </td>
                  </tr>
                  <tr className="text-white">
                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left cursor-pointer">
                      <button className="bg-red-200 text-red-600 font-bold py-2 px-4 rounded w-32">
                        Moderate
                      </button>
                    </th>
                    <td className="border-t-0 px-4 align-middle text-sm font-medium text-white whitespace-nowrap p-4 text-right cursor-pointer">
                      Rs 10000 - RS 20000
                    </td>
                  </tr>
                  <tr className="text-white">
                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left cursor-pointer">
                      <button className="bg-yellow-300 text-black font-bold py-2 px-4 rounded w-32">
                        Low
                      </button>
                    </th>
                    <td className="border-t-0 px-4 align-middle text-sm font-medium text-white whitespace-nowrap p-4 text-right cursor-pointer">
                      Rs 10000 - RS 20000
                    </td>
                  </tr>
                  <tr className="text-white">
                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left cursor-pointer">
                      <button className="bg-blue-300 text-blue-700 font-bold py-2 px-4 rounded w-32">
                        Informational
                      </button>
                    </th>
                    <td className="border-t-0 px-4 align-middle text-sm font-medium text-white whitespace-nowrap p-4 text-right cursor-pointer">
                      Rs 10000 - RS 20000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr className="mt-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsDetails;
