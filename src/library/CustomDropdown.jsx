import React, { useState, useEffect, useRef } from "react";

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
    onChange(e);
  };

  const handleSelect = (option) => {
    onChange({ target: { value: option } });
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFilteredOptions(options); // Reset options when dropdown is opened
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onClick={toggleDropdown}
        className="block mt-1 w-full border border-border rounded-md p-2 focus:ring focus:ring-ring bg-gray-900 text-white"
        placeholder="Select Country"
      />
      {isOpen && (
        <ul className="absolute z-10 w-full bottom-full mb-1 bg-gray-800 border border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="p-2 cursor-pointer hover:bg-gray-700"
              >
                {option}
              </li>
            ))
          ) : (
            <li className="p-2">No options available</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;