import React, { useState, useEffect } from "react";
import PatientList from "../components/PatientList";
import Navbar from "../components/Navbar";
import * as XLSX from "xlsx";

const API_URL = "http://localhost:5000/api";

function DoctorPanel() {
  const [checkedInPatients, setCheckedInPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCheckedInPatients = async () => {
    try {
      const response = await fetch(`${API_URL}/checked-in`);
      const data = await response.json();
      console.log("Checked-in patients:", data); // debug
      setCheckedInPatients(data || []);
    } catch (error) {
      console.error("Error fetching checked-in patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckedInPatients();
  }, []);

  const handleDownloadReport = () => {
    if (!checkedInPatients || checkedInPatients.length === 0) {
      alert("No data available");
      return;
    }

    const excelData = checkedInPatients.map((p, index) => ({
      "S.No": index + 1,
      "Patient Name": p.name || "-",
      "Phone Number": p.phone || "-",
      "Checked In Date": p.checkedInAt
        ? new Date(p.checkedInAt).toLocaleString()
        : "-",
      Status: "Checked In",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CheckedInPatients");

    XLSX.writeFile(workbook, "CheckedIn_Patients_Report.xlsx");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar patients={[]} checkedOut={checkedInPatients} />

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleDownloadReport}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Download Excel Report
          </button>
        </div>

        <PatientList
          patients={checkedInPatients}
          loading={loading}
          hideCheckInButton={true}
        />
      </div>
    </div>
  );
}

export default DoctorPanel;
