import React, { useState } from 'react';

const DropdownTime = ({valFunc}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const options = [
    { value: 4, label: '4 hours' },
    { value: 5, label: '5 hours' },
    { value: 6, label: '6 hours' },
    { value: 7, label: '7 hours' },
    { value: 8, label: '8 hours' },
    { value: 9, label: '9 hours' },
    { value: 10, label: '10 hours' },
    { value: 11, label: '11 hours' },
    { value: 12, label: '12 hours' },
    { value: 13, label: '13 hours' },
    { value: 14, label: '14 hours' },
    { value: 15, label: '15 hours' },

  ];
  const[isDefault,setDefault]= useState(true);

  const handleSelect = (event) => {
    setDefault(false)
    setSelectedOption(event.target.value);
    valFunc(event.target.value)
  };

  return (
    <div className="relative inline-block w-30">
      <select
        className="block w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        // value={selectedOption}
        value={isDefault?10:selectedOption}
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

export default DropdownTime;
