import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { backendUrl } from "../App";

function AdminDeletePatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteMode, setDeleteMode] = useState("specific"); // 'specific' | 'date' | 'range'
  const [singleDate, setSingleDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Fetch all patients
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/patients/all`);
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error("Failed to fetch patients");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Show toast message
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Delete single patient
  const handleDeleteSingle = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete patient "${name}"?`))
      return;

    setActionLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/patients/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        showToast(`Patient "${name}" deleted successfully`);
        setSelectedIds((prev) => prev.filter((sid) => sid !== id));
        fetchPatients();
      } else {
        showToast(data.error || "Failed to delete patient", "error");
      }
    } catch (err) {
      showToast("Failed to delete patient", "error");
    }
    setActionLoading(false);
  };

  // Delete selected patients (batch)
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedIds.length} selected patient(s)?`
      )
    )
      return;

    setActionLoading(true);
    try {
      // Split by status and delete from respective endpoints
      const checkedInIds = patients
        .filter((p) => selectedIds.includes(p._id) && p.status === "CheckedIn")
        .map((p) => p._id);
      const checkedOutIds = patients
        .filter(
          (p) => selectedIds.includes(p._id) && p.status === "CheckedOut"
        )
        .map((p) => p._id);

      let totalDeleted = 0;

      if (checkedInIds.length > 0) {
        const res = await fetch(`${backendUrl}/api/patients/delete-batch`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: checkedInIds }),
        });
        const data = await res.json();
        totalDeleted += data.deletedCount || 0;
      }

      if (checkedOutIds.length > 0) {
        const res = await fetch(`${backendUrl}/api/checked-out/delete-batch`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: checkedOutIds }),
        });
        const data = await res.json();
        totalDeleted += data.deletedCount || 0;
      }

      showToast(`${totalDeleted} patient(s) deleted successfully`);
      setSelectedIds([]);
      fetchPatients();
    } catch (err) {
      showToast("Failed to delete selected patients", "error");
    }
    setActionLoading(false);
  };

  // Delete by single date
  const handleDeleteByDate = async () => {
    if (!singleDate) return;
    if (
      !window.confirm(
        `Are you sure you want to delete ALL patients from ${singleDate}?`
      )
    )
      return;

    setActionLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/patients/delete-by-date`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: singleDate }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message);
        setSingleDate("");
        setSelectedIds([]);
        fetchPatients();
      } else {
        showToast(data.error || "Failed to delete", "error");
      }
    } catch (err) {
      showToast("Failed to delete patients by date", "error");
    }
    setActionLoading(false);
  };

  // Delete by date range
  const handleDeleteByRange = async () => {
    if (!startDate || !endDate) return;
    if (new Date(startDate) > new Date(endDate)) {
      showToast("Start date must be before end date", "error");
      return;
    }
    if (
      !window.confirm(
        `Are you sure you want to delete ALL patients from ${startDate} to ${endDate}?`
      )
    )
      return;

    setActionLoading(true);
    try {
      const res = await fetch(
        `${backendUrl}/api/patients/delete-by-date-range`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ startDate, endDate }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        showToast(data.message);
        setStartDate("");
        setEndDate("");
        setSelectedIds([]);
        fetchPatients();
      } else {
        showToast(data.error || "Failed to delete", "error");
      }
    } catch (err) {
      showToast("Failed to delete patients by date range", "error");
    }
    setActionLoading(false);
  };

  // Toggle select
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Select all visible
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredPatients.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredPatients.map((p) => p._id));
    }
  };

  // Filtered patients
  const filteredPatients = patients.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm);
    const matchStatus =
      filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Format date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div
            className={`px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium ${
              toast.type === "error"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {toast.type === "error" ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            {toast.message}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 pb-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Delete Patient Data
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Remove specific patients or bulk delete by date
            </p>
          </div>
          <Link
            to="/admin-dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-2xl font-bold text-gray-800">
              {patients.length}
            </p>
            <p className="text-xs text-gray-500">Total Patients</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-2xl font-bold text-green-600">
              {patients.filter((p) => p.status === "CheckedIn").length}
            </p>
            <p className="text-xs text-gray-500">Checked In</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-2xl font-bold text-orange-600">
              {patients.filter((p) => p.status === "CheckedOut").length}
            </p>
            <p className="text-xs text-gray-500">Checked Out</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-2xl font-bold text-red-600">
              {selectedIds.length}
            </p>
            <p className="text-xs text-gray-500">Selected</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Delete Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Delete Mode Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Method
              </h3>

              <div className="flex flex-col gap-2">
                {[
                  {
                    key: "specific",
                    label: "Select & Delete",
                    desc: "Pick individual patients",
                  },
                  {
                    key: "date",
                    label: "Delete by Date",
                    desc: "Remove all patients of a date",
                  },
                  {
                    key: "range",
                    label: "Delete by Range",
                    desc: "Remove patients in date range",
                  },
                ].map((mode) => (
                  <button
                    key={mode.key}
                    onClick={() => setDeleteMode(mode.key)}
                    className={`text-left p-3 rounded-lg border transition-all ${
                      deleteMode === mode.key
                        ? "border-red-300 bg-red-50"
                        : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <p
                      className={`text-sm font-semibold ${
                        deleteMode === mode.key
                          ? "text-red-700"
                          : "text-gray-700"
                      }`}
                    >
                      {mode.label}
                    </p>
                    <p className="text-xs text-gray-500">{mode.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Controls */}
            {deleteMode === "date" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-bold text-gray-800 mb-3">
                  Select Date
                </h3>
                <input
                  type="date"
                  value={singleDate}
                  onChange={(e) => setSingleDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
                <button
                  onClick={handleDeleteByDate}
                  disabled={!singleDate || actionLoading}
                  className="mt-3 w-full py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading
                    ? "Deleting..."
                    : `Delete All Patients of ${singleDate || "..."}`}
                </button>
              </div>
            )}

            {deleteMode === "range" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-bold text-gray-800 mb-3">
                  Date Range
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      From
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      To
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={handleDeleteByRange}
                  disabled={!startDate || !endDate || actionLoading}
                  className="mt-3 w-full py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? "Deleting..." : "Delete Patients in Range"}
                </button>
              </div>
            )}

            {deleteMode === "specific" && selectedIds.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-800">
                    Batch Delete
                  </h3>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                    {selectedIds.length} selected
                  </span>
                </div>
                <button
                  onClick={handleDeleteSelected}
                  disabled={actionLoading}
                  className="w-full py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {actionLoading ? (
                    "Deleting..."
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete {selectedIds.length} Patient(s)
                    </>
                  )}
                </button>
                <button
                  onClick={() => setSelectedIds([])}
                  className="mt-2 w-full py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            )}

            {/* Warning */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-amber-600 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-amber-800">
                    Warning
                  </p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Deleted patient records cannot be recovered. Please verify
                    before deleting.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Patient List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {/* Search & Filter Bar */}
              <div className="p-4 sm:p-5 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Search */}
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search by name or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="flex gap-2">
                    {["all", "CheckedIn", "CheckedOut"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setFilterStatus(s)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          filterStatus === s
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {s === "all"
                          ? "All"
                          : s === "CheckedIn"
                          ? "Checked In"
                          : "Checked Out"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Select All (only in specific mode) */}
                {deleteMode === "specific" && filteredPatients.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={toggleSelectAll}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                    >
                      {selectedIds.length === filteredPatients.length
                        ? "Deselect All"
                        : "Select All"}
                    </button>
                    <span className="text-xs text-gray-400">
                      ({filteredPatients.length} patients)
                    </span>
                  </div>
                )}
              </div>

              {/* Patient List */}
              <div className="divide-y divide-gray-50 max-h-[550px] overflow-y-auto">
                {loading ? (
                  <div className="p-10 text-center">
                    <svg
                      className="animate-spin h-8 w-8 text-gray-300 mx-auto mb-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <p className="text-gray-400 text-sm">Loading patients...</p>
                  </div>
                ) : filteredPatients.length === 0 ? (
                  <div className="p-10 text-center">
                    <svg
                      className="w-12 h-12 text-gray-300 mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p className="text-gray-400 text-sm">No patients found</p>
                  </div>
                ) : (
                  filteredPatients.map((patient) => (
                    <div
                      key={patient._id}
                      className={`p-4 sm:px-5 hover:bg-gray-50 transition-colors ${
                        selectedIds.includes(patient._id)
                          ? "bg-red-50/50"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Checkbox (specific mode) */}
                        {deleteMode === "specific" && (
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(patient._id)}
                            onChange={() => toggleSelect(patient._id)}
                            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 shrink-0 cursor-pointer"
                          />
                        )}

                        {/* Patient Avatar */}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${
                            patient.type === "emergency"
                              ? "bg-red-500"
                              : "bg-blue-500"
                          }`}
                        >
                          {patient.name.charAt(0).toUpperCase()}
                        </div>

                        {/* Patient Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {patient.name}
                            </p>
                            {patient.type === "emergency" && (
                              <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-[10px] font-bold shrink-0">
                                EMERGENCY
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-xs text-gray-500">
                              Age: {patient.age}
                            </span>
                            <span className="text-xs text-gray-500">
                              {patient.phone}
                            </span>
                            <span className="text-xs text-gray-400">
                              {formatDate(patient.createdAt)},{" "}
                              {formatTime(patient.createdAt)}
                            </span>
                          </div>
                        </div>

                        {/* Status & Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                              patient.status === "CheckedIn"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {patient.status === "CheckedIn"
                              ? "Checked In"
                              : "Checked Out"}
                          </span>

                          {/* Individual delete button */}
                          <button
                            onClick={() =>
                              handleDeleteSingle(patient._id, patient.name)
                            }
                            disabled={actionLoading}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                            title="Delete this patient"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDeletePatients;
