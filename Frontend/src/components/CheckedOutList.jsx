import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";
import * as XLSX from "xlsx";

function CheckedOutList() {
  const [checkedOutPatients, setCheckedOutPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);

  useEffect(() => {
    const fetchCheckedOut = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/checked-out`);
        const data = await response.json();
        setCheckedOutPatients(data);
      } catch (error) {
        console.error("Error fetching checked-out patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckedOut();
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
      "Created Date": formatDate(p.createdAt),
      Type: p.type === "emergency" ? "Emergency" : "Normal",
      Status: "Checked Out",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Checked Out Patients");

    const fromDateFormatted = formatDateForFilename(fromDate);
    const toDateFormatted = formatDateForFilename(toDate);
    const dateRange = `D-${fromDateFormatted} to ${toDateFormatted}`;
    XLSX.writeFile(workbook, `${dateRange}.xlsx`);
  };

  // Filter checked-out patients by date range
  const filteredPatients = checkedOutPatients.filter((p) =>
    isDateInRange(p.createdAt, fromDate, toDate),
  );

  if (loading) {
    return (
      <div className="bg-white shadow border border-black/30 rounded p-8 text-center">
        <p className="text-gray-500">Loading checked-out patients...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow border border-black/30 rounded">
      <div className="flex items-center justify-between flex-wrap gap-4 px-4 py-3 border-b border-black/30">
        <h2 className="font-bold text-xl text-gray-700">Download & View</h2>
        <button
          onClick={() => setShowDateFilter(!showDateFilter)}
          className="text-xs px-3 py-1.5 rounded bg-purple-600 text-white hover:bg-purple-700 transition-all"
        >
          📅 {showDateFilter ? "Hide" : "Date Filter"}
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
                Showing {filteredPatients.length} of {checkedOutPatients.length}{" "}
                patients
              </span>
            </>
          )}
        </div>
      )}

      {filteredPatients.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          Download Date-Wise Patient List.
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-black/30">
            <tr>
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Patient Name</th>
              <th className="px-4 py-2 text-left">Age</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredPatients.map((p, i) => (
              <tr key={p._id}>
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
                  {formatDate(p.createdAt)}
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
                  <span className="text-xs px-2 py-1 rounded font-medium bg-orange-100 text-orange-700">
                    Checked Out
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CheckedOutList;
