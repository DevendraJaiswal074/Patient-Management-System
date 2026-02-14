import React, { useState, useEffect } from "react";
import PatientList from "../components/PatientList";
import Navbar from "../components/Navbar";
import * as XLSX from "xlsx";

// const API_URL = "http://localhost:5000/api";
import { backendUrl } from "../App";

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

      const checkOutResponse = await fetch(`${backendUrl}/api/checked-in`);
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
  }, []);

  // Check-in patient
  const handleCheckIn = async (patientId) => {
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

  // Download Excel Report
  const handleDownloadReport = () => {
    if (patients.length === 0) {
      alert("No data available");
      return;
    }

    const excelData = patients.map((p, index) => ({
      "S.No": index + 1,
      "Patient Name": p.name,
      "Phone Number": p.phone,
      "Status": "Checked In",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");

    XLSX.writeFile(workbook, "Patient_Report.xlsx");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar patients={patients} checkedOut={checkedOut} />

      <div className="max-w-7xl mx-auto px-6 mt-6">
        {/* Download Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleDownloadReport}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Download Excel Report
          </button>
        </div>

        <PatientList
          patients={patients}
          onCheckIn={handleCheckIn}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default DoctorPanel;
