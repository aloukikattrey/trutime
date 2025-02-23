import React, { useState } from 'react';

const Dropdown = ({valFunc}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const options = [
    { value: 'AM', label: 'AM' },
    { value: 'PM', label: 'PM' },
  ];

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
    valFunc(event.target.value)
  };

  return (
    <div className="relative inline-block w-30">
      <select
        className="block w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={selectedOption}
        onChange={handleSelect}
      >

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

      </select>

    </div>
  );
};

export default Dropdown;
