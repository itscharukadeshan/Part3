/** @format */

import React, { useEffect } from "react";

function ErrNotification({ errMessage }) {
  if (!errMessage) {
    {
      return null;
    }
  }
  {
    return (
      <div className='text-orange-700 font-serif font-bold text-3xl mt-3 bg-slate-400 p-8 border-solid border-4 border-orange-700 rounded-md'>
        {errMessage}
      </div>
    );
  }
}

export default ErrNotification;
