import React from "react";

const ReportView = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-gray-800 shadow rounded-lg p-4">
              <div className="mt-10 ml-10 flex gap-96">
                <div>
                  <div>
                    <span className="font-semibold text-lg">Title</span>
                    <p className="text-sm mt-1">Loading...</p>
                  </div>
                  <div className="mt-3">
                    <span className="font-semibold text-lg">
                      Steps To Reproduce
                    </span>
                    <p className="text-sm mt-1">Loading...</p>
                  </div>
                  <div className="mt-3">
                    <span className="font-semibold text-lg">Description</span>
                    <p className="text-sm mt-1">Loading...</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 ml-10">
                <h1 className="text-indigo-400 font-bold text-lg">
                  Attachments
                </h1>
                <p className="text-gray-400">
                  Personal details are visible on your profile page
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-gray-800 shadow rounded-lg p-6">
              <div className="flex flex-col">
                <h1>Submitted At: 2024-02-12</h1>
                <h4 className="mt-4">Reported by:</h4>
                <div className="mt-2 flex gap-5">
                  <img src="" alt="pp" />
                  <span>Anish Shrestha</span>
                </div>
                <div className="mt-4 flex flex-col">
                  Vulnerability Type:
                  <span>. Css cros site hacking</span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
