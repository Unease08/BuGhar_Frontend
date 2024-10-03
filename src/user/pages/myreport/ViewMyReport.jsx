import React from "react";

const ViewMyReport = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4"> {/* Reduced padding */}
      <div className="mt-8 ml-16 bg-gray-700 text-card-foreground p-4 rounded-lg max-w-6xl"> {/* Adjusted margins */}
        <div className="font-sans">
          <h1 className="font-bold text-indigo-400 text-xl">Information</h1> {/* Reduced font size */}
          <div className="mt-2"> {/* Reduced margin */}
            <label className="text-lg">Summary/Title</label>
            <input
              type="text"
              name="summary"
              className="w-full mt-1 py-1 px-2 rounded border border-gray-400 text-black" 
            />
          </div>
        </div>
        <div className="font-sans mt-6"> {/* Reduced margin */}
          <h1 className="font-bold text-indigo-400 text-xl mb-2">Target</h1> {/* Reduced font size */}
          <div className="flex space-x-2"> {/* Reduced spacing */}
            <div className="w-1/3">
              <label className="text-lg">Select target</label>
              <input
                name="target"
                className="w-full mt-1 py-1 px-2 rounded border border-gray-400 bg-gray-50 text-black"
              />
            </div>
            <div className="w-2/3">
              <label className="text-lg">Select scope</label>
              <input
                name="scope"
                className="w-full mt-1 py-1 px-2 rounded border border-gray-400 bg-gray-50 text-black"
              />
            </div>
          </div>
        </div>

        <div className="font-sans mt-6"> {/* Reduced margin */}
          <h1 className="font-bold text-indigo-400 text-xl mb-2">Technical Severity</h1>
          <label className="text-lg">Selected severity</label>
          <input
            name="severity"
            className="w-full mt-1 py-1 px-2 rounded border border-gray-400 bg-gray-50 text-black"
          />
        </div>

        <div className="font-sans mt-6"> {/* Reduced margin */}
          <h1 className="font-bold text-indigo-400 text-xl mb-2">Vulnerability Details</h1>
          <label className="text-lg">Vulnerability type</label>
          <input
            name="vulnerability-type"
            className="w-full mt-1 py-1 px-2 rounded border border-gray-400 bg-gray-50 text-black"
          />

          <div className="mt-6"> {/* Reduced margin */}
            <label className="text-lg">URL/Location of the vulnerability</label>
            <input
              type="text"
              name="location"
              className="w-full mt-1 py-1 px-2 rounded border border-gray-400 bg-gray-50 text-black"
            />
          </div>

          <div className="mt-6">
            <label className="text-lg">Description</label>
            <textarea
              name="description"
              rows="5"
              className="w-full mt-1 p-2 rounded border border-gray-400 bg-gray-50 text-black"
            />
          </div>

          <div className="mt-6">
            <label className="text-lg">Trace Dump/HTTP Request</label>
            <textarea
              name="trace"
              rows="5"
              className="w-full mt-1 p-2 rounded border border-gray-400 bg-gray-50 text-black"
            />
          </div>

          <div className="mt-6">
            <h1 className="font-bold text-indigo-400 text-xl">Attachments</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyReport;
