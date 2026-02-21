import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import AllPatientList from "../components/AllPatientList";

import * as XLSX from "xlsx";

function AdminAllPatients() {

  const [patients, setPatients] = useState([]);
    const [checkedOut, setCheckedOut] = useState([]);

  // Download All Patients Report
  const handleDownloadAll = () => {
    if (patients.length === 0 && checkedOut.length === 0) {
      alert("No data available");
      return;
    }

    const allData = [
      ...patients.map((p, i) => ({
        "S.No": i + 1,
        "Patient Name": p.name,
        Age: p.age,
        "Phone Number": p.phone,
        Type: p.type,
        Status: "Checked In",
      })),
      ...checkedOut.map((p, i) => ({
        "S.No": patients.length + i + 1,
        "Patient Name": p.name,
        Age: p.age,
        "Phone Number": p.phone,
        Type: p.type,
        Status: "Checked Out",
      })),
    ];

    const worksheet = XLSX.utils.json_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All Patients");
    XLSX.writeFile(workbook, "All_Patients_Report.xlsx");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 mt-6">

        {/* Download Button */}
        <div className="flex justify-end gap-3 mb-4">
          <button
            onClick={handleDownloadAll}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Download All Report
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

        <AllPatientList onDataLoaded={(checkedIn, checkedOutData) => {
          setPatients(checkedIn);
          setCheckedOut(checkedOutData);
        }} />
      </div>
    </div>
  );
}

export default AdminAllPatients;
