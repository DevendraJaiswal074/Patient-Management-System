import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TodayPatient from "../components/TodayPatient";
import * as XLSX from "xlsx";

function AdminTodayPatients() {
  const [todayPatients, setTodayPatients] = useState([]);

  // Helper function to get current date in DD-MM-YYYY format
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDownloadToday = () => {
    if (todayPatients.length === 0) {
      alert("No today's patient data available");
      return;
    }

    const excelData = todayPatients.map((p, index) => ({
      "S.No": index + 1,
      "Patient Name": p.name,
      Age: p.age,
      "Phone Number": p.phone,
      Type: p.type === "emergency" ? "Emergency" : "Normal",
      Status: p.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Today Patients");
    XLSX.writeFile(workbook, `D-${getCurrentDate()}.xlsx`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-3 md:px-6 mt-4 md:mt-6">

        {/* Download Button */}
        <div className="flex justify-center md:justify-end mb-4">
          <button
            onClick={handleDownloadToday}
            className="bg-blue-600 text-white px-3 md:px-4 py-2 rounded-md hover:bg-blue-700 text-sm md:text-base"
          >
            Download Today's Report
          </button>
        </div>

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

        <TodayPatient onDataLoaded={(data) => setTodayPatients(data)} />
      </div>
    </div>
  );
}

export default AdminTodayPatients;
