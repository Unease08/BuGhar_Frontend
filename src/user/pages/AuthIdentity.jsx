import React from "react";
import { Link } from "react-router-dom";
import { GoOrganization } from "react-icons/go";
import { FaMask } from "react-icons/fa";

const AuthIdentity = () => {
  return (
    <div className="h-screen bg-gray-900">
      <div className="bg-gray-100 flex justify-center gap-28 items-center h-screen w-full dark:bg-gray-900">
        <div className="w-full max-w-md px-8 py-10 rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-200 cursor-pointer">
          <i className="flex justify-center text-8xl">
            <GoOrganization />
          </i>
          <h1 className="text-5xl mt-10 font-semibold text-center mb-6">
            I'm a Company
          </h1>
        </div>
        <Link to="/auth/researcher/login">
          <div className="w-full max-w-md px-8 py-10 rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-200 cursor-pointer">
            <i className="flex justify-center text-8xl">
              <FaMask />
            </i>
            <h1 className="text-5xl mt-10 font-semibold text-center mb-6">
              I'm a Researcher
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AuthIdentity;
