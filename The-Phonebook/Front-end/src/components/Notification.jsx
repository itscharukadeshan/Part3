/** @format */

import React, { useEffect } from "react";

function Notification({ message }) {
  if (!message) {
    {
      return null;
    }
  }
  {
    return (
      <div className='text-green-700 font-serif font-bold text-3xl mt-3 bg-slate-400 p-8 border-solid border-4 border-green-700 rounded-md'>
        {message}
      </div>
    );
  }
}

export default Notification;
