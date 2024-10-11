import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { FaSort } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../../library/Api";
import config from "../../../config";
import "../../../styles.css"

const parseDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString();
};

const Programs = () => {
  const [programs, setPrograms] = useState([]); // State to hold programs data
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("price");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch programs data from the API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await api.get("/programs/");
        console.log("API response", response.data);
        // Replace with your API endpoint
        setPrograms(response.data); // Assuming the data is an array of programs
        setFilteredData(response.data); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  // Remaining part of the component remains unchanged...
  const parsePrice = (priceStr) => {
    const match = priceStr.match(/Rs (\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const parseDate = (dateStr) => {
    return new Date(dateStr);
  };

  const sortData = (data) => {
    const sortedData = [...data].sort((a, b) => {
      if (sortBy === "price") {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
      } else if (sortBy === "date") {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
    setFilteredData(sortedData);
  };

  const handleSortToggle = (type) => {
    if (sortBy !== type) {
      setSortBy(type);
      setSortOrder("asc");
    } else {
      const newOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newOrder);
    }
    sortData(filteredData);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const newData = programs.filter((item) =>
      item.companyName.toLowerCase().includes(searchValue.toLowerCase())
    );
    sortData(newData);
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

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="flex items-center justify-start ml-10 p-6">
        <div className="w-full max-w-lg">
          <form className="mt-10 sm:flex sm:items-center relative">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="search"
              name="Search"
              className="inline w-full rounded-sm border text-white border-gray-300 bg-gray-700 py-2 pl-10 pr-3 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search by Company Name"
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4">
            <button
              onClick={() => handleSortToggle("price")}
              className="flex items-center text-white border border-gray-300 bg-gray-800 py-2 px-4 rounded-md"
            >
              Rewards
              <FaSort className="ml-2" />
            </button>
            <button
              onClick={() => handleSortToggle("date")}
              className="flex items-center text-white border border-gray-300 bg-gray-800 py-2 px-4 rounded-md"
            >
              Date
              <FaSort className="ml-2" />
            </button>
          </div>
        </div>
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <Link to={`/program-details/${item.id}`} key={item.id}>
                <div
                  key={item.id}
                  className="bg-gray-800 border mt-5 border-gray-700 rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={`${config.BASE_URL}/${item.program_logo}`}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 cursor-pointer">
                    <h2 className="text-xl font-semibold text-indigo-400 hover:underline">
                      {item.title}
                    </h2>

                    <div className="flex justify-between mt-4 text-gray-400 text-sm">
                      <span>Start Date: {formatDate(item.start_date)}</span>
                      <span>End Date: {formatDate(item.end_date)}</span>
                    </div>
                    <p className="text-gray-400 mt-2">
                      <div
                        className="text-gray-400 mt-2"
                        dangerouslySetInnerHTML={{
                          __html:
                            item.description.length > 50
                              ? `${item.description.substring(0, 50)}...`
                              : item.description,
                        }}
                      />
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full ${
                          item.is_active ? "bg-green-600" : "bg-red-600"
                        } text-white`}
                      >
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                      <span className="ml-4 text-indigo-400 text-lg">
                        Rs. {item.min_price} - Rs. {item.max_price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64 text-5xl text-white">
            No data to show
          </div>
        )}
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 bg-gray-800 text-white rounded-md disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 border border-gray-300 rounded-md ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 bg-gray-800 text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Programs;
