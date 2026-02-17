import React, { useState, useEffect } from "react";
import PatientList from "../components/PatientList";
import Navbar from "../components/Navbar";
import * as XLSX from "xlsx";

import { backendUrl } from "../App";
import AllPatientList from "../components/AllPatientList";
import CheckedOutList from "../components/CheckedOutList";
import TodayPatient from "../components/TodayPatient";

function DoctorPanel() {
  const [patients, setPatients] = useState([]);
  const [checkedOut, setCheckedOut] = useState([]);
  // const [loading, setLoading] = useState(true);

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

  // Download Checked-In Patients Report
  const handleDownloadCheckedIn = () => {
    if (patients.length === 0) {
      alert("No checked-in data available");
      return;
    }

    const excelData = patients.map((p, index) => ({
      "S.No": index + 1,
      "Patient Name": p.name,
      Age: p.age,
      "Phone Number": p.phone,
      Type: p.type,
      Status: "Checked In",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Checked In");
    XLSX.writeFile(workbook, "CheckedIn_Report.xlsx");
  };

  // Download Checked-Out Patients Report
  const handleDownloadCheckedOut = () => {
    if (checkedOut.length === 0) {
      alert("No checked-out data available");
      return;
    }

    const excelData = checkedOut.map((p, index) => ({
      "S.No": index + 1,
      "Patient Name": p.name,
      Age: p.age,
      "Phone Number": p.phone,
      Type: p.type,
      Status: "Checked Out",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Checked Out");
    XLSX.writeFile(workbook, "CheckedOut_Report.xlsx");
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
          <button
            onClick={handleDownloadCheckedIn}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Download Checked In
          </button>
          <button
            onClick={handleDownloadCheckedOut}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Download Checked Out
          </button>
        </div>

        {/* <AllPatientList /> */}
        {/* <CheckedOutList /> */}
        <TodayPatient />

      </div>
    </div>
  );
}

export default DoctorPanel;
