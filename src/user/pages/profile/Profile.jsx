import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import profile1 from "../../../assets/profile1.jpg";
import useCountries from "../../../customhooks/UseCountries"; // Ensure the path is correct
import CustomDropdown from "../../../library/CustomDropdown"; // Ensure the path is correct

const Profile = () => {
  const countries = useCountries().map((country) => country.name);
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-gray-800 shadow rounded-lg p-6">
              <div className="flex flex-col">
                <ul className="font-sans">
                  <li className="mb-6 flex items-center gap-3 cursor-pointer">
                    <i className="text-xl">
                      <CgProfile />
                    </i>
                    <span className="text-sm font-semibold">
                      <Link className="text-white">Profile</Link>
                    </span>
                  </li>
                  <li className="mb-2 flex items-center gap-3 cursor-pointer">
                    <i className="text-xl">
                      <RiLockPasswordFill />
                    </i>
                    <span className="text-sm font-semibold">
                      Change Password
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-gray-800 shadow rounded-lg p-4">
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 rounded-lg shadow-lg h-[180px]">
                <h2 className="text-white text-2xl font-bold mb-4">Profile</h2>
                <div className="flex justify-center absolute left-[55%] top-40">
                  <img
                    alt="Profile Picture"
                    src={profile1}
                    className="rounded-full w-40 h-40 border-2 border-black shadow-xl"
                  />
                </div>
              </div>
              <div className="mt-10 ml-10 flex gap-96">
                <div>
                  <span className="font-semibold text-xl">Username</span>
                  <p className="text-lg mt-1">Unease21</p>
                </div>
                <div>
                  <span className="font-semibold text-xl">Email</span>
                  <p className="text-lg mt-1">anisheyyy@gmail.com</p>
                </div>
              </div>
              <div className="mt-10 ml-10">
                <h1 className="text-indigo-400 font-bold text-lg">
                  Personal details
                </h1>
                <p className="text-gray-400">
                  Personal details are visible on your profile page
                </p>
                <div className="mt-5 space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label
                        className="block text-sm font-bold text-gray-400"
                        htmlFor="first-name"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        placeholder="Anish"
                        className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        className="block text-sm font-bold text-gray-400"
                        htmlFor="last-name"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        placeholder="Shrestha"
                        className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label
                        className="block text-sm font-bold text-gray-400"
                        htmlFor="gender"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                      >
                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label
                        className="block text-sm font-bold text-gray-400"
                        htmlFor="dob"
                      >
                        Date Of Birth
                      </label>
                      <input
                        type="date"
                        id="dob"
                        className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 ml-10">
                <h1 className="text-indigo-400 font-bold text-lg">
                  Contact details
                </h1>
                <p className="text-gray-400">
                  Contact details are visible on your profile page
                </p>
                <div className="mt-5">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label
                        className="block text-sm font-bold text-gray-400"
                        htmlFor="country"
                      >
                        Select Country
                      </label>
                      <CustomDropdown
                        options={countries}
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        className="block text-sm font-bold text-gray-400"
                        htmlFor="address"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        placeholder="Address"
                        className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-900 text-white focus:ring focus:ring-ring"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Work Experience Section */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
