import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TodayPatient from "../components/TodayPatient";

function AdminTodayPatients() {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar patients={[]} checkedOut={[]} />

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="mb-4">
          <Link
            to="/admin-dashboard"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-4 fill-current">
              <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
            Back to Admin Dashboard
          </Link>
        </div>

        <TodayPatient />
      </div>
    </div>
  );
}

export default AdminTodayPatients;
