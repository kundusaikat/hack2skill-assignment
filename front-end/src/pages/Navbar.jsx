import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="flex items-center justify-center p-1 gap-2 bg-blue-600 text-white">
        <Link to="/assignment-1">
          <p className="hover:bg-gray-700 rounded-lg p-2">Assignment 1</p>
        </Link>
        <Link to="/assignment-2">
          <p className="hover:bg-gray-700 rounded-lg p-2">Assignment 2</p>
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
