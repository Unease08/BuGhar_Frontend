import React, { useState, useEffect } from "react";
import { TbReportSearch } from "react-icons/tb";
import { FaMedal, FaBug } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import api from "../../../library/Api";
import config from "../../../config";

const ProgramsDetails = () => {
  const [program, setProgram] = useState(null);
  const [bounties, setBounties] = useState(null); // State to hold the bounty data
  const { id } = useParams();

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await api.get(`/programs/${id}`); // Fetching program details
        console.log("API response", response.data);
        setProgram(response.data); // Assuming the response contains program details

        // Fetching bounty calculation data
        const bountyResponse = await api.get(
          `/programs/${id}/calculate_bounties`
        );
        console.log("Bounty Calculation Response:", bountyResponse.data);

        // Convert the bounties object to an array of key-value pairs
        const bountyArray = Object.entries(bountyResponse.data.bounties);
        setBounties(bountyArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchProgram();
    }
  }, [id]);

  if (!program) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }

  // Convert the in_scope string into an array of targets
  const inScopeTargets = program.in_scope
    .split(",")
    .map((target) => target.trim());

  const outScopeTargets = program.out_of_scope
    .split(",")
    .map((target) => target.trim());

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Program details section */}
      <div className="flex justify-start ml-48 gap-40">
        <div className="bg-gray-700 text-card-foreground p-4 rounded-lg w-[1080px] relative overflow-visible transform mt-24">
          <div className="relative">
            <div className="h-32 w-32 mt-10 mr-5 border-4 border-white rounded-full overflow-hidden shadow-lg absolute -top-48 left-1/2 transform -translate-x-1/2">
              <img
                src={`${config.BASE_URL}/${program.program_logo}`}
                alt="Program Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="mt-20 text-3xl font-bold font-grotesk text-indigo-400 text-center">
              {program.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground text-center">
              <div
                className="text-gray-400 mt-2"
                dangerouslySetInnerHTML={{ __html: program.description }}
              />
            </p>
            <div className="mt-4 text-right mb-2 flex justify-between items-center">
              <span></span>
              <span className="text-primary font-bold text-xl text-indigo-400">
                Rs. {program.min_price} - Rs. {program.max_price}{" "}
                <p className="text-md">per vulnerability</p>
              </span>
            </div>
            <hr />
            <Link to={`/program-details/${program.id}/program-report`}>
              <button className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded">
                Submit Report
              </button>
            </Link>
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
        </div>
      </div>

      {/* Program Scope and Rewards Section */}
      <div className="bg-card mt-2 ml-48 h-14 bg-gray-700 text-card-foreground p-4 rounded-xl w-[1080px]">
        <div className="flex gap-10 mb-2 font-bold text-lg ml-4 text-gray-400 cursor-pointer">
          <span className="text-indigo-500 underline">Program Details</span>
        </div>
      </div>
      <div className="bg-card mt-5 ml-48 h-auto bg-gray-700 text-card-foreground p-4 rounded-md w-[1080px] mx-auto shadow-lg">
        <div className="w-full mt-2">
          {/* In Scope and Out of Scope Section */}
          <div className="font-sans mt-10">
            <span className="text-black font-extrabold ml-1">In Scope</span>
            <div className="block w-full overflow-x-auto border mt-5">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-md font-bold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                      Targets
                    </th>
                    <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-md font-bold text-left uppercase border-l-0 border-r-0 whitespace-nowrap"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inScopeTargets.map((target, index) => (
                    <tr className="text-white" key={index}>
                      <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left cursor-pointer">
                        {target}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Out of Scope Section */}
          <div className="font-sans mt-10">
            <span className="text-black font-extrabold ml-1">Out Scope</span>
            <div className="block w-full overflow-x-auto border mt-5">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-md font-bold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                      Targets
                    </th>
                    <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-md font-bold text-left uppercase border-l-0 border-r-0 whitespace-nowrap"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {outScopeTargets.map((target, index) => (
                    <tr className="text-white" key={index}>
                      <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left cursor-pointer">
                        {target}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <hr className="mt-10" />
          </div>

          {/* Reward Section */}
          <div className="font-sans mt-10">
            <h1 className="font-bold text-indigo-400 text-xl mb-4">Reward</h1>
            <div className="block w-full overflow-x-auto border mt-5">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-md font-bold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                      Severity
                    </th>
                    <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-md font-bold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                      Bounty Range
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {Array.isArray(bounties) && bounties.length > 0 ? (
                    bounties.map(
                      ([severity, { range, bounty_value }], index) => (
                        <tr className="text-white" key={index}>
                          <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left cursor-pointer">
                            {severity}{" "}
                            {/* This is the key (e.g., Informational, Low, etc.) */}
                          </th>
                          <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left cursor-pointer">
                            {range[0]} - {range[1]} {/* This is the range */}
                          </th>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center text-white">
                        No bounties available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsDetails;
