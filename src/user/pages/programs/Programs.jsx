import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { FaSort } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Programs = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="flex items-center justify-start ml-10 p-6">
        <div className="w-full max-w-lg">
          <form className="mt-10 sm:flex sm:items-center relative">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="search"
              name="search"
              className="inline w-full rounded-sm border text-white border-gray-300 bg-gray-700 py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search"
              type="search"
              autoFocus
            />
          </form>
        </div>
      </div>
      <div className="flex ml-16 text-white font-grotesk gap-5">
        <div className="cursor-pointer items-center flex gap-1">
          <span className="font-bold">Rewards</span>
          <i>
            <FaSort />
          </i>
        </div>
        <div className="relative" ref={dropdownRef}>
          <div
            className="cursor-pointer items-center flex gap-1"
            onClick={toggleDropdown}
          >
            <span className="font-bold">Scope</span>
            <i>
              <FaChevronDown />
            </i>
          </div>
          {isDropdownOpen && (
            <div className="absolute top-8 left-12 w-52 bg-n-12 text-black rounded-md shadow-lg">
              <div className="flex justify-end mt-2 mr-2">
                <button onClick={closeDropdown}>
                  <IoClose className="text-red-700 hover:text-red-500" />
                </button>
              </div>
              <ul className="py-2 text-sm">
                <li className="px-4 py-2 mt-2 ml-2 cursor-pointer">
                  <span className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg">
                    Critical
                  </span>
                </li>
                <li className="px-4 py-2 mt-2 ml-2 cursor-pointer">
                  <span className="bg-red-400 text-red-700 font-bold py-2 px-4 rounded-lg">
                    High
                  </span>
                </li>
                <li className="px-4 py-2 mt-2 ml-2 cursor-pointer">
                  <span className="bg-red-200 text-red-600 font-bold py-2 px-4 rounded-lg">
                    Moderate
                  </span>
                </li>
                <li className="px-4 py-2 mt-2 ml-2 cursor-pointer">
                  <span className="bg-yellow-300 text-black font-bold py-2 px-4 rounded-lg">
                    Low
                  </span>
                </li>
                <li className="px-4 py-2 mt-2 ml-2 cursor-pointer">
                  <span className="bg-blue-300 text-blue-700 font-bold py-2 px-4 rounded-lg">
                    Informational
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="cursor-pointer items-center flex gap-1">
          <span className="font-bold">Date</span>
          <i>
            <FaSort />
          </i>
        </div>
      </div>
    </div>
  );
};

export default Programs;
