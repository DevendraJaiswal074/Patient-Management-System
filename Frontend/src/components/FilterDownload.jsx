import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";
import * as XLSX from "xlsx";

function FilterDownload() {
  const [allPatients, setAllPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [notesExist, setNotesExist] = useState({});
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/patients/all`);
        const data = await response.json();
        setAllPatients(data);
        // build notes existence map
        const map = {};
        data.forEach((p) => {
          try {
            map[p._id] = !!localStorage.getItem(`patient_notes_${p._id}`);
          } catch (e) {
            map[p._id] = false;
          }
        });
        setNotesExist(map);
      } catch (error) {
        console.error("Error fetching all patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPatients();
  }, []);

  // Helper function to check if a date falls within the selected range
  const isDateInRange = (patientDate, from, to) => {
    const pDate = new Date(patientDate);
    const fromDateObj = from ? new Date(from) : null;
    const toDateObj = to ? new Date(to) : null;

    if (fromDateObj) {
      fromDateObj.setHours(0, 0, 0, 0);
      if (pDate < fromDateObj) return false;
    }

    if (toDateObj) {
      toDateObj.setHours(23, 59, 59, 999);
      if (pDate > toDateObj) return false;
    }

    return true;
  };

  // Clear date filters
  const handleClearDateFilter = () => {
    setFromDate("");
    setToDate("");
  };

  // Helper function to safely format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "N/A";
      }
      return date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch (error) {
      return "N/A";
    }
  };

  // Helper function to convert HTML date input to DD-MM-YYYY format
  const formatDateForFilename = (htmlDate) => {
    if (!htmlDate) return "";
    const [year, month, day] = htmlDate.split("-");
    return `${day}-${month}-${year}`;
  };

  // Helper to get patient status label
  const getStatusLabel = (p) => {
    if (p.status === "CheckedOut") return "Checked Out";
    return "Checked In";
  };

  // Download filtered patients as Excel
  const handleDownloadFilteredList = () => {
    if (filteredPatients.length === 0) {
      alert("No patients to download. Please select a date range.");
      return;
    }

    const excelData = filteredPatients.map((p, index) => ({
      "S.No": index + 1,
      "Patient Name": p.name,
      Age: p.age,
      "Phone Number": p.phone,
      "Appointment Date": formatDate(p.appointmentDate || p.createdAt),
      Type: p.type === "emergency" ? "Emergency" : "Normal",
      Status: getStatusLabel(p),
      Notes: localStorage.getItem(`patient_notes_${p._id}`) || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    // formatting
    try {
      worksheet["!cols"] = [
        { wch: 6 },
        { wch: 28 },
        { wch: 6 },
        { wch: 16 },
        { wch: 12 },
        { wch: 12 },
        { wch: 36 },
      ];
      const range = XLSX.utils.decode_range(worksheet['!ref']);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_ref = XLSX.utils.encode_cell({ c: C, r: range.s.r });
        if (!worksheet[cell_ref]) continue;
        worksheet[cell_ref].s = Object.assign({}, worksheet[cell_ref].s, { font: { bold: true }, alignment: { horizontal: "center" } });
      }
    } catch (e) {}

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All Patients");

    const fromDateFormatted = formatDateForFilename(fromDate);
    const toDateFormatted = formatDateForFilename(toDate);
    const dateRange = `D-${fromDateFormatted} to ${toDateFormatted}`;
    XLSX.writeFile(workbook, `${dateRange}.xlsx`);
  };

  // Filter all patients by date range
  const filteredPatients = allPatients.filter((p) =>
    isDateInRange(p.appointmentDate || p.createdAt, fromDate, toDate),
  );

  // apply search filter (name or phone)
  const searchedPatients = filteredPatients.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.phone && String(p.phone).toLowerCase().includes(q))
    );
  });

  if (loading) {
    return (
      <div className="bg-white shadow border border-black/30 rounded p-8 text-center">
        <p className="text-gray-500">Loading patients...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow border border-black/30 rounded">
      <div className="flex items-center justify-between flex-wrap gap-4 px-4 py-3 border-b border-black/30">
        <h2 className="font-bold text-xl text-gray-700">Filter and Download</h2>
        <input
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none w-64"
        />
        <button
          onClick={() => setShowDateFilter(!showDateFilter)}
          className="text-xs px-3 py-1.5 rounded bg-purple-600 text-white hover:bg-purple-700 transition-all"
        >
          📅 {showDateFilter ? "Hide" : "Filter Date"}
        </button>
      </div>

      {/* Date Filter Section */}
      {showDateFilter && (
        <div className="px-4 py-4 border-b border-black/30 bg-gray-50 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">
              From Date:
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">
              To Date:
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            onClick={handleClearDateFilter}
            className="text-xs px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-all"
          >
            Clear Dates
          </button>

          {(fromDate || toDate) && (
            <>
              <button
                onClick={handleDownloadFilteredList}
                className="text-xs px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition-all"
              >
                📥 Download
              </button>
              <span className="text-sm text-gray-600 font-medium">
                Showing {filteredPatients.length} of {allPatients.length}{" "}
                patients
              </span>
            </>
          )}
        </div>
      )}

      {searchedPatients.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          {filteredPatients.length === 0 ? "Download Date-Wise Patient List." : "No patients found."}
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
        <table className="w-full min-w-200 text-sm">
          <thead className="bg-gray-50 border-b border-black/30">
            <tr>
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Patient Name</th>
              <th className="px-4 py-2 text-left">Age</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Appointment Date</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Note</th>
            </tr>
          </thead>

          <tbody className="divide-y">
                {searchedPatients.map((p, i) => (
                  <React.Fragment key={p._id}>
                    <tr>
                <td className="px-4 py-3">{i + 1}.</td>

                <td className="px-4 py-2 flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full ${
                      p.type === "emergency" ? "bg-red-500" : "bg-sky-500"
                    }`}
                  ></div>
                  {p.name}
                </td>

                <td className="px-4 py-2">{p.age}</td>
                <td className="px-4 py-2">{p.phone}</td>

                <td className="px-4 py-2 text-sm text-gray-600">
                  {formatDate(p.appointmentDate || p.createdAt)}
                </td>

                <td className="px-4 py-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      p.type === "emergency"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {p.type === "emergency" ? "Emergency" : "Normal"}
                  </span>
                </td>

                <td className="px-4 py-2">
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    p.status === "CheckedOut"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {getStatusLabel(p)}
                  </span>
                </td>

                <td className="px-4 py-2">
                  <button
                    onClick={() => setOpenId(openId === p._id ? null : p._id)}
                    title="Patient notes"
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    {notesExist[p._id] ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7l-4-4H5z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.464.263l-4 1a1 1 0 01-1.213-1.213l1-4a1 1 0 01.263-.464l9.9-9.9a2 2 0 012.828 0z" />
                      </svg>
                    )}
                  </button>
                </td>
                </tr>

                {openId === p._id && (
                  <tr>
                    <td colSpan={8} className="p-0 border-b">
                      <div className="p-3 bg-gray-50">
                        <textarea
                          value={localStorage.getItem(`patient_notes_${p._id}`) || ""}
                          readOnly
                          className="w-full p-2 border border-gray-200 rounded text-sm bg-white"
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default FilterDownload;
