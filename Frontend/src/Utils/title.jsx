import React from "react";
import { Link } from "react-router-dom";
const Title = ({ title }) => {

  return (
    <div className="mb-8">
      <div className="fixed z-30 top-0 pl-8 w-full h-36 bg-white border-b-2 flex flex-col justify-center max-[1023px]:mt-[70px] max-[1023px]:h-16 max-[1024px]:h-32 max-[1024px]:mb-8">
          <div className='d-flex mt-2'>
              <h3>{title}</h3>
          </div>
      </div>
      
    </div>
  );
};

export default Title;
