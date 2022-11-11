import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className='page-wrapper'>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
