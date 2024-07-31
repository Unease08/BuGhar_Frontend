import React, { useState } from "react";

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

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

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onClick={() => setIsOpen(!isOpen)}
        className="block w-full border border-border rounded-md p-2 focus:ring focus:ring-ring"
        placeholder="Select Country"
      />
      {isOpen && (
        <ul className="absolute z-10 w-full bottom-full mb-1 bg-white border border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="p-2 cursor-pointer hover:bg-gray-200"
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
