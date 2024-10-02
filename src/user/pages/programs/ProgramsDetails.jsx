import React, { useState } from "react";
import profile1 from "../../../assets/profile1.jpg";
import { TbReportSearch } from "react-icons/tb";
import { FaMedal } from "react-icons/fa";
import { FaBug } from "react-icons/fa";

const ProgramsDetails = () => {
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
          <div className="mt-4 text-right mb-2 flex justify-between items-center">
            <span>20th Semptember, 2024</span>
            <span className="text-primary font-bold text-xl text-indigo-400">
              Rs 125 - Rs 2,500 <p className="text-sm">per vulnerability</p>
            </span>{" "}
          </div>
          <hr />
          <button className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded">
            Submit Report
          </button>
          <hr className="mt-4" />
          <div className="mt-3">
            <span className="mt-2 text-2xl font-bold font-grotesk text-indigo-400">
              Information Stats
            </span>
            <div className="mt-2 flex flex-col space-y-4">
              <span className="flex items-center text-xl">
                <i className="mr-2 text-blue-500 text-xl">
                  <TbReportSearch />
                </i>
                <span className="flex">Total reports</span>
                <strong className="text-white text-xl ml-15">50</strong>
              </span>
              <span className="flex items-center text-xl">
                <i className="mr-2 text-green-500 text-xl">
                  <FaMedal />
                </i>
                <span className="flex">Reports resolved</span>
                <strong className="text-white text-xl ml-6">50</strong>
              </span>
              <span className="flex items-center text-xl">
                <i className="mr-2 text-red-700 text-xl">
                  <FaBug />
                </i>
                <span className="flex">Total bounty paid</span>
                <strong className="text-white text-xl ml-4">50</strong>
              </span>
            </div>
          </div>
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
          <span className="text-indigo-500 underline">Program Details</span>
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

          <div className="font-sans mt-10">
            <h1 className="font-bold text-indigo-400 text-xl mb-4">
              Eligibility
            </h1>
            <p className="text-gray-300 text-base leading-relaxed">
              As a researcher, you are only considered eligible for a reward if
              you’re the first person reporting it to Programiz. We commit to
              responding to the report within 48 business hours and implementing
              a fix within 30 days based on the severity of the report. Note
              that posting details or conversations about this report before it
              has been approved for disclosure, or posting details that reflect
              poorly on this program or the Programiz brand, will result in
              forfeiture of any award and/or immediate removal from the program.
            </p>
            <p className="text-gray-300 text-base leading-relaxed mt-2">
              DO NOT use the output from automated scanners and tools as your
              entire vulnerability report. DO provide a description of the
              nature and impact of the issue in your vulnerability report.
            </p>
          </div>
          <div className="font-sans mt-10">
            <h1 className="font-bold text-indigo-400 text-xl mb-4">Rewards</h1>
            <p className="text-gray-300 text-base leading-relaxed">
              Qualifying bugs will be rewarded via cash reward severity, to be
              determined by Programiz security team. Awards are granted entirely
              at the discretion of Programiz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsDetails;
