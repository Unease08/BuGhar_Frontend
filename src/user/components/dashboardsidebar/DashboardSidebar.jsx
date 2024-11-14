import React from "react";

const DashboardSidebar = () => {
  return (
    <div className="bg-gray-800 shadow rounded-lg p-6">
      <div className="flex flex-col">
        <div className="flex justify-center">
          <img
            src="https://saugat-nepal.com.np/assets/img/profile-img.png"
            alt=""
            className="rounded-full w-20 h-20"
          />
        </div>
        <div className="mt-3 flex flex-col items-center">
          <span className="text-xl font-semibold text-gray-200">
            Anish Shrestha
          </span>
          <span className="text-md text-gray-400 mt-1">Unease</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
