import React from "react";
import profile1 from "../../../assets/profile1.jpg";

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
          <div className="mt-4">
            <span className="text-primary font-semibold">
              Rs 125 - Rs 2,500
            </span>{" "}
            per vulnerability
          </div>
          <hr />
          <button class="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded">
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
    </div>
  );
};

export default ProgramsDetails;
