import React, { useState, useEffect } from "react";
import PatientList from "../components/PatientList";
import Navbar from "../components/Navbar";
import * as XLSX from "xlsx";

import { backendUrl } from "../App";
import AllPatientList from "../components/AllPatientList";
import CheckedOutList from "../components/FilteredData";
import TodayPatient from "../components/TodayPatient";
import DoctorNotes from "../components/DoctorNotes";

function DoctorPanel() {

  const [todayPatients, setTodayPatients] = useState([]);
  const [latestCheckout, setLatestCheckout] = useState(null);
  const [loadingLatest, setLoadingLatest] = useState(true);

  // Fetch latest checked-out patient
  const fetchLatestCheckout = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/checked-out`);
      const data = await res.json();
      if (data.length > 0) {
        // Sort by checkedOutAt or updatedAt descending to get the latest
        const sorted = data.sort(
          (a, b) =>
            new Date(b.checkedOutAt || b.updatedAt) -
            new Date(a.checkedOutAt || a.updatedAt)
        );
        setLatestCheckout(sorted[0]);
      }
    } catch (err) {
      console.error("Error fetching latest checkout:", err);
    } finally {
      setLoadingLatest(false);
    }
  };

  useEffect(() => {
    fetchLatestCheckout();
    // Refresh every 30 seconds
    const interval = setInterval(fetchLatestCheckout, 30000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to get current date in DD/MM/YYYY format
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
      Notes: localStorage.getItem(`patient_notes_${p._id}`) || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    // Apply column widths and header style
    const applyFormatting = (ws) => {
      ws["!cols"] = [
        { wch: 6 }, // S.No
        { wch: 28 }, // Patient Name
        { wch: 6 }, // Age
        { wch: 16 }, // Phone Number
        { wch: 12 }, // Type
        { wch: 14 }, // Status
        { wch: 36 }, // Notes
      ];
      try {
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cell_address = { c: C, r: range.s.r };
          const cell_ref = XLSX.utils.encode_cell(cell_address);
          if (!ws[cell_ref]) continue;
          ws[cell_ref].s = Object.assign({}, ws[cell_ref].s, { font: { bold: true }, alignment: { horizontal: "center" } });
        }
      } catch (e) {
        // ignore formatting errors
      }
    };

    applyFormatting(worksheet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Today Patients");
    XLSX.writeFile(workbook, `D-${getCurrentDate()}.xlsx`);
  };

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
        Notes: localStorage.getItem(`patient_notes_${p._id}`) || "",
      })),
      ...checkedOut.map((p, i) => ({
        "S.No": patients.length + i + 1,
        "Patient Name": p.name,
        Age: p.age,
        "Phone Number": p.phone,
        Type: p.type,
        Status: "Checked Out",
        Notes: localStorage.getItem(`patient_notes_${p._id}`) || "",
      })),
    ];

    const worksheet = XLSX.utils.json_to_sheet(allData);
    const applyFormatting = (ws) => {
      ws["!cols"] = [
        { wch: 6 },
        { wch: 28 },
        { wch: 6 },
        { wch: 16 },
        { wch: 12 },
        { wch: 14 },
        { wch: 36 },
      ];
      try {
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cell_ref = XLSX.utils.encode_cell({ c: C, r: range.s.r });
          if (!ws[cell_ref]) continue;
          ws[cell_ref].s = Object.assign({}, ws[cell_ref].s, { font: { bold: true }, alignment: { horizontal: "center" } });
        }
      } catch (e) {}
    };

    applyFormatting(worksheet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All Patients");
    XLSX.writeFile(workbook, `A-${getCurrentDate()}.xlsx`);
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
      Notes: localStorage.getItem(`patient_notes_${p._id}`) || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const applyFormatting = (ws) => {
      ws["!cols"] = [
        { wch: 6 },
        { wch: 28 },
        { wch: 6 },
        { wch: 16 },
        { wch: 12 },
        { wch: 14 },
        { wch: 36 },
      ];
      try {
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cell_ref = XLSX.utils.encode_cell({ c: C, r: range.s.r });
          if (!ws[cell_ref]) continue;
          ws[cell_ref].s = Object.assign({}, ws[cell_ref].s, { font: { bold: true }, alignment: { horizontal: "center" } });
        }
      } catch (e) {}
    };

    applyFormatting(worksheet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Checked In");
    XLSX.writeFile(workbook, `CI-${getCurrentDate()}.xlsx`);
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
      Notes: localStorage.getItem(`patient_notes_${p._id}`) || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const applyFormatting = (ws) => {
      ws["!cols"] = [
        { wch: 6 },
        { wch: 28 },
        { wch: 6 },
        { wch: 16 },
        { wch: 12 },
        { wch: 14 },
      ];
      try {
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cell_ref = XLSX.utils.encode_cell({ c: C, r: range.s.r });
          if (!ws[cell_ref]) continue;
          ws[cell_ref].s = Object.assign({}, ws[cell_ref].s, { font: { bold: true }, alignment: { horizontal: "center" } });
        }
      } catch (e) {}
    };

    applyFormatting(worksheet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Checked Out");
    XLSX.writeFile(workbook, `CO-${getCurrentDate()}.xlsx`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-[95vw] mx-auto px-3 md:px-6 mt-6 md:mt-8">

        {/* Header: title centered, download button aligned right */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4 mt-2">
          <div className="hidden md:block md:w-1/4" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 mb-0 text-center">
            Doctor Dashboard
          </h2>
          <div className="w-full md:w-1/4 flex justify-center md:justify-end">
            <button
              onClick={handleDownloadToday}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm md:text-base"
            >
              Download Today's Report
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-4 md:gap-5">
          {/* Latest Checked-Out Patient Card */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-3">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <h3 className="text-white font-bold text-sm">Latest Checked-Out Patient</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                {loadingLatest ? (
                  <div className="flex items-center justify-center py-8">
                    <svg className="animate-spin h-6 w-6 text-orange-400" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </div>
                ) : latestCheckout ? (
                  <div>
                    {/* Avatar + Name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${
                        latestCheckout.type === "emergency" ? "bg-red-500" : "bg-blue-500"
                      }`}>
                        {latestCheckout.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-base font-bold text-gray-800">{latestCheckout.name}</p>
                        {latestCheckout.type === "emergency" && (
                          <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-[10px] font-bold">
                            EMERGENCY
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-xs text-gray-500 font-medium">Age</span>
                        <span className="text-sm font-semibold text-gray-800">{latestCheckout.age} yrs</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-xs text-gray-500 font-medium">Phone</span>
                        <span className="text-sm font-semibold text-gray-800">{latestCheckout.phone}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-xs text-gray-500 font-medium">Type</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          latestCheckout.type === "emergency"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {latestCheckout.type === "emergency" ? "Emergency" : "Normal"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-xs text-gray-500 font-medium">Status</span>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                          Checked Out
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-xs text-gray-500 font-medium">Checked Out At</span>
                        <span className="text-xs font-semibold text-gray-700">
                          {new Date(latestCheckout.checkedOutAt || latestCheckout.updatedAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <p className="text-sm text-gray-400">No check-outs yet</p>
                  </div>
                )}
              </div>
            </div>
            {/* Doctor Notes component (autosave & collapsible) */}
            <DoctorNotes />
          </div>

          {/* Today's Patient List */}
          <div className="flex-1 min-w-0 w-full">
            <TodayPatient onDataLoaded={(data) => setTodayPatients(data)} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default DoctorPanel;
