import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold mb-4">
        <Link to="/" className="text-black hover:underline">
          Task Manager
        </Link>
      </h1>

      <nav className="mb-4 text-xl">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-blue-500 hover:underline">
              Calendar
            </Link>
          </li>
          <li>
            <Link to="/priority" className="text-blue-500 hover:underline">
              All Tasks
            </Link>
          </li>
          <li>
            <Link to="/sticky-notes" className="text-blue-500 hover:underline">
              Sticky Notes
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
