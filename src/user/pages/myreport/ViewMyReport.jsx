import React from "react";

const ViewMyReport = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="mt-10 ml-32 bg-gray-700 text-card-foreground p-4 rounded-lg max-w-7xl">
        <div className="font-sans">
          <h1 className="font-bold text-indigo-400 text-2xl">Information</h1>
          <div className="mt-4">
            <label className="text-lg">Summary/Title</label>
            <input
              type="text"
              name="summary"
              className="w-full mt-2 py-2 px-4 rounded border border-gray-400 text-black"
            />
          </div>
        </div>
        <div className="font-sans mt-8">
          <h1 className="font-bold text-indigo-400 text-2xl mb-4">Target</h1>
          <div className="flex space-x-4">
            <div className="w-1/3">
              <label className="text-lg">Select target</label>
              <input
                name="target"
                className="w-full mt-2 py-2 px-4 rounded border border-gray-400 bg-gray-50 text-black"
              />
            </div>
            <div className="w-2/3">
              <label className="text-lg">Select scope</label>
              <input
                name="scope"
                className="w-full mt-2 py-2 px-4 rounded border border-gray-400 bg-gray-50 text-black"
              />
            </div>
          </div>
        </div>

        <div className="font-sans mt-8">
          <h1 className="font-bold text-indigo-400 text-2xl mb-4">
            Technical Severity
          </h1>
          <label className="text-lg">Selected severity</label>
          <input
            name="severity"
            className="w-full mt-2 py-2 px-4 rounded border border-gray-400 bg-gray-50 text-black"
          />
        </div>

        <div className="font-sans mt-8">
          <h1 className="font-bold text-indigo-400 text-2xl mb-4">
            Vulnerability Details
          </h1>
          <label className="text-lg">Vulnerability type</label>
          <input
            name="vulnerability-type"
            className="w-full mt-2 py-2 px-4 rounded border border-gray-400 bg-gray-50 text-black"
          />

          <div className="mt-8">
            <label className="text-lg">URL/Location of the vulnerability</label>
            <input
              type="text"
              name="location"
              className="w-full mt-2 py-2 px-4 rounded border border-gray-400 bg-gray-50 text-black"
            />
          </div>

          <div className="mt-8">
            <label className="text-lg">Description</label>
            <textarea
              name="description"
              rows="6"
              className="w-full mt-2 p-4 rounded border border-gray-400 bg-gray-50 text-black"
            />
          </div>

          <div className="mt-8">
            <label className="text-lg">Trace Dump/HTTP Request</label>
            <textarea
              name="trace"
              rows="6"
              className="w-full mt-2 p-4 rounded border border-gray-400 bg-gray-50 text-black"
            />
          </div>

          <div className="mt-8">
            <h1 className="font-bold text-indigo-400 text-2xl">Attachments</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyReport;
