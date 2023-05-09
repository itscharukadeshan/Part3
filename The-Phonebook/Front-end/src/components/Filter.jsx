/** @format */

import React from "react";

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div className='flex flex-col'>
      <label className='text-3xl pt-5 '>Search </label>
      <input
        className='my-4 border-gray-500 border-2 rounded-sm w-1/4 '
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder=' Search for a name...'
      />
    </div>
  );
};

export default Filter;
