import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { FaSort } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

// Scope data
const scopeData = [
  { name: "Critical", color: "bg-red-500", textColor: "text-white" },
  { name: "High", color: "bg-red-400", textColor: "text-red-700" },
  { name: "Moderate", color: "bg-red-200", textColor: "text-red-600" },
  { name: "Low", color: "bg-yellow-300", textColor: "text-black" },
  { name: "Info", color: "bg-blue-300", textColor: "text-blue-700" },
];

// Sample data with dates
const sampleData = [
  {
    id: 1,
    companyName: "InnovaTech Solutions",
    companyDesc:
      "Leading the way in innovative tech solutions and AI advancements.",
    scope: "High",
    price: "Rs 35000 - Rs 45000",
    imgSrc: "https://dummyimage.com/720x400/ff6347/fff",
    date: "2024-08-01",
  },
  {
    id: 2,
    companyName: "GreenFields Organic",
    companyDesc: "Organic farming and sustainable agriculture solutions.",
    scope: "Moderate",
    price: "Rs 20000 - Rs 30000",
    imgSrc: "https://dummyimage.com/720x400/32cd32/fff",
    date: "2024-07-15",
  },
  {
    id: 3,
    companyName: "CityLights Entertainment",
    companyDesc:
      "Bringing the best in live music and entertainment to your city.",
    scope: "Info",
    price: "Rs 10000 - Rs 20000",
    imgSrc: "https://dummyimage.com/720x400/1e90ff/fff",
    date: "2024-06-22",
  },
  {
    id: 4,
    companyName: "AeroDynamics Inc.",
    companyDesc:
      "Pioneering advancements in aerospace technology and research.",
    scope: "Critical",
    price: "Rs 50000 - Rs 70000",
    imgSrc: "https://dummyimage.com/720x400/ff4500/fff",
    date: "2024-08-10",
  },
  {
    id: 5,
    companyName: "EcoBreeze Energy",
    companyDesc: "Sustainable energy solutions and green technologies.",
    scope: "Low",
    price: "Rs 15000 - Rs 25000",
    imgSrc: "https://dummyimage.com/720x400/98fb98/fff",
    date: "2024-07-05",
  },
  {
    id: 6,
    companyName: "TechVision Labs",
    companyDesc:
      "Innovative solutions in virtual reality and augmented reality.",
    scope: "High",
    price: "Rs 40000 - Rs 60000",
    imgSrc: "https://dummyimage.com/720x400/ff69b4/fff",
    date: "2024-08-20",
  },
  {
    id: 7,
    companyName: "BioMed Research",
    companyDesc: "Cutting-edge research in biotechnology and medical sciences.",
    scope: "Moderate",
    price: "Rs 25000 - Rs 35000",
    imgSrc: "https://dummyimage.com/720x400/7fffd4/fff",
    date: "2024-07-28",
  },
  {
    id: 8,
    companyName: "UrbanCraft Design",
    companyDesc: "Modern and sustainable urban design solutions for the city.",
    scope: "Info",
    price: "Rs 30000 - Rs 40000",
    imgSrc: "https://dummyimage.com/720x400/dda0dd/fff",
    date: "2024-06-30",
  },
  {
    id: 9,
    companyName: "FutureWave Robotics",
    companyDesc: "Advanced robotics and automation for the future.",
    scope: "Critical",
    price: "Rs 55000 - Rs 75000",
    imgSrc: "https://dummyimage.com/720x400/ffb6c1/fff",
    date: "2024-08-15",
  },
  {
    id: 10,
    companyName: "PureVita Wellness",
    companyDesc: "Holistic wellness solutions and natural health products.",
    scope: "Low",
    price: "Rs 12000 - Rs 22000",
    imgSrc: "https://dummyimage.com/720x400/ff6347/fff",
    date: "2024-07-10",
  },
  {
    id: 11,
    companyName: "SmartGrid Technologies",
    companyDesc:
      "Advanced grid technologies for smart cities and energy efficiency.",
    scope: "High",
    price: "Rs 45000 - Rs 55000",
    imgSrc: "https://dummyimage.com/720x400/8a2be2/fff",
    date: "2024-08-25",
  },
];


const parsePrice = (priceStr) => {
  const match = priceStr.match(/Rs (\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

const parseDate = (dateStr) => {
  return new Date(dateStr);
};

const Programs = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedScope, setSelectedScope] = useState("Scope");
  const [filteredData, setFilteredData] = useState(sampleData);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("price");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleScopeSelect = (scope) => {
    setSelectedScope(scope.name);
    const newData = sampleData.filter(
      (item) => item.scope === scope.name || scope.name === "Scope"
    );
    sortData(newData);
    closeDropdown();
  };

  const handleClearFilter = () => {
    setSelectedScope("Scope");
    setFilteredData(sampleData);
    closeDropdown();
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
    const newData = sampleData.filter((item) =>
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
          <div className="relative">
            <button
              type="button"
              className="mt-4 w-48 text-white bg-gray-800 py-2 px-4 rounded-md"
              onClick={toggleDropdown}
            >
              {selectedScope} <FaChevronDown className="inline ml-2" />
            </button>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute mt-2 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg"
              >
                <ul className="py-1">
                  {scopeData.map((scope, index) => (
                    <li
                      key={index}
                      className="cursor-pointer px-4 py-2 text-white hover:bg-gray-700"
                      onClick={() => handleScopeSelect(scope)}
                    >
                      <span
                        className={`inline-block w-3 h-3 mr-2 rounded-full ${scope.color} ${scope.textColor}`}
                      ></span>
                      {scope.name}
                    </li>
                  ))}
                </ul>
                <div
                  className="cursor-pointer px-4 py-2 text-gray-400 hover:bg-gray-700"
                  onClick={handleClearFilter}
                >
                  Clear Filter
                </div>
              </div>
            )}
          </div>
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
            {currentItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={item.imgSrc}
                  alt={item.companyName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 cursor-pointer">
                  <Link to={`/programdetails/${item.id}`}>
                    <h2 className="text-xl font-semibold text-indigo-400 hover:underline">
                      {item.companyName}
                    </h2>
                  </Link>

                  <span className="flex justify-start mt-2 text-gray-400">
                    {item.date}
                  </span>
                  <p className="text-gray-400 mt-2">{item.companyDesc}</p>
                  <div className="flex items-center mt-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full ${
                        scopeData.find((scope) => scope.name === item.scope)
                          .color
                      } ${
                        scopeData.find((scope) => scope.name === item.scope)
                          .textColor
                      }`}
                    >
                      {item.scope}
                    </span>
                    <span className="ml-44 text-indigo-400 text-lg">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
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
