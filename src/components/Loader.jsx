import React, { useState } from "react";
import "../assests/styles/Loader.css";

const Loader = () => { 
  const [noData, setnoData] = useState(false)
  setTimeout(() => {
    setnoData(true)
  }, 6000);
  return (
    <div>
     {noData?<>No Data</>: <div class="progress-loader">
        <div class="progress"></div>
      </div>}
    </div>
  );
};

export default Loader;
  