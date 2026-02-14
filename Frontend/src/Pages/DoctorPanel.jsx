import React, { useState, useEffect } from "react";
import PatientList from "../components/PatientList";
import Navbar from "../components/Navbar";
import * as XLSX from "xlsx";

// const API_URL = "http://localhost:5000/api";
import { backendUrl } from "../App";
import AllPatientList from "../components/AllPatientList";
import CheckedOutList from "../components/CheckedOutList";

function DoctorPanel() {
  const [patients, setPatients] = useState([]);
  const [checkedOut, setCheckedOut] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch patients
  const fetchPatients = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/patients`);
      const data = await response.json();
      setPatients(data);

    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch checkedOut from backend
  const fetchCheckedOut = async () => {
    try {
      const checkOutResponse = await fetch(`${backendUrl}/api/checked-out`);
      const checkOutdata = await checkOutResponse.json();
      setCheckedOut(checkOutdata);

    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchCheckedOut();
  }, []);

  // Check-out patient
  const handleCheckOut = async (patientId) => {
    try {
      const response = await fetch(`${backendUrl}/api/patients/${patientId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPatients((prev) => prev.filter((p) => p.id !== patientId));
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      console.error("Error checking in patient:", error);
      return { success: false, error: "Failed to check in patient" };
    }
  };

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
      <Navbar patients={patients} checkedOut={checkedOut} />

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

        <AllPatientList />
        {/* <CheckedOutList /> */}

      </div>
    </div>
  );
}

export default DoctorPanel;
