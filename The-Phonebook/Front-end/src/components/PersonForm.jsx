/** @format */

import React from "react";

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div className=' flex flex-col gap-2'>
        <label>Name </label>
        <input
          className=' pl-2 py-1 border-gray-500 border-2 rounded-sm w-1/4 '
          value={newName}
          placeholder='Enter a name'
          onChange={handleNameChange}
          required
        />
      </div>
      <div className=' flex flex-col gap-2'>
        <label className='mt-2'> Number</label>
        <input
          className=' pl-2 py-1 border-gray-500 border-2 rounded-sm w-1/4 '
          value={newNumber}
          placeholder='e.g. 123-4567890'
          pattern='\d{3}-\d{7}'
          title='Ensure number has minimum 8 digits and (-) after region code.'
          onChange={handleNumberChange}
          required
        />
      </div>
      <div>
        <button
          type='submit'
          className=' mt-4 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-4 border border-gray-500 hover:border-transparent rounded'>
          Add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
