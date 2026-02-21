import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { backendUrl } from "../App";

function AdminGenerateIDs() {
  const [credentials, setCredentials] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("doctor");
  const [loading, setLoading] = useState(false);
  const [generatedCred, setGeneratedCred] = useState(null);
  const [filterRole, setFilterRole] = useState("all");
  const [copied, setCopied] = useState("");

  // Fetch all credentials
  const fetchCredentials = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/credentials`);
      const data = await res.json();
      setCredentials(data);
    } catch (err) {
      console.error("Failed to fetch credentials");
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  // Generate new credential
  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/credentials/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), role }),
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedCred(data);
        setName("");
        fetchCredentials();
      } else {
        alert(data.error || "Failed to generate credential");
      }
    } catch (err) {
      alert("Failed to generate credential");
    }
    setLoading(false);
  };

  // Delete credential
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this credential?"))
      return;
    try {
      await fetch(`${backendUrl}/api/credentials/${id}`, {
        method: "DELETE",
      });
      fetchCredentials();
    } catch (err) {
      alert("Failed to delete credential");
    }
  };

  // Toggle status
  const handleToggleStatus = async (id) => {
    try {
      await fetch(`${backendUrl}/api/credentials/${id}/toggle`, {
        method: "PATCH",
      });
      fetchCredentials();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(""), 2000);
  };

  const filteredCredentials =
    filterRole === "all"
      ? credentials
      : credentials.filter((c) => c.role === filterRole);

  const doctorCount = credentials.filter(
    (c) => c.role === "doctor" && c.status === "active"
  ).length;
  const staffCount = credentials.filter(
    (c) => c.role === "staff" && c.status === "active"
  ).length;

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 pb-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Manage Login Credentials
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Generate and manage login IDs for doctors and staff
            </p>
          </div>
          <Link
            to="/admin-dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {credentials.length}
                </p>
                <p className="text-xs text-gray-500">Total Credentials</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {doctorCount}
                </p>
                <p className="text-xs text-gray-500">Active Doctors</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {staffCount}
                </p>
                <p className="text-xs text-gray-500">Active Staff</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Generate Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Generate New ID
              </h3>

              <form onSubmit={handleGenerate} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole("doctor")}
                      className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all border ${
                        role === "doctor"
                          ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Doctor
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("staff")}
                      className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all border ${
                        role === "staff"
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Staff
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
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
                      Generating...
                    </span>
                  ) : (
                    "Generate Credential"
                  )}
                </button>
              </form>

              {/* Generated Credential Display */}
              {generatedCred && (
                <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-bold text-green-800">
                      Credential Generated!
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
                      <div>
                        <p className="text-xs text-gray-500">Name</p>
                        <p className="text-sm font-medium text-gray-800">
                          {generatedCred.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
                      <div>
                        <p className="text-xs text-gray-500">Login ID</p>
                        <p className="text-sm font-mono font-bold text-indigo-600">
                          {generatedCred.loginId}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            generatedCred.loginId,
                            "gen-loginId"
                          )
                        }
                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                        title="Copy Login ID"
                      >
                        {copied === "gen-loginId" ? (
                          <svg
                            className="w-4 h-4 text-green-500"
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
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
                      <div>
                        <p className="text-xs text-gray-500">Password</p>
                        <p className="text-sm font-mono font-bold text-red-600">
                          {generatedCred.password}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            generatedCred.password,
                            "gen-password"
                          )
                        }
                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                        title="Copy Password"
                      >
                        {copied === "gen-password" ? (
                          <svg
                            className="w-4 h-4 text-green-500"
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
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
                      <div>
                        <p className="text-xs text-gray-500">Role</p>
                        <p className="text-sm font-medium capitalize text-gray-800">
                          {generatedCred.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-amber-700 mt-3 flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
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
                    Save these credentials securely. Password won't be shown
                    again after page refresh.
                  </p>

                  <button
                    onClick={() => setGeneratedCred(null)}
                    className="mt-3 w-full py-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Credentials List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {/* Filter & Header */}
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-gray-800">
                    All Credentials
                  </h3>
                  <div className="flex gap-2">
                    {["all", "doctor", "staff"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilterRole(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          filterRole === f
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {f === "all"
                          ? "All"
                          : f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* List */}
              <div className="divide-y divide-gray-50">
                {filteredCredentials.length === 0 ? (
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
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                    <p className="text-gray-400 text-sm">
                      No credentials found
                    </p>
                  </div>
                ) : (
                  filteredCredentials.map((cred) => (
                    <div
                      key={cred._id}
                      className="p-4 sm:px-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                              cred.role === "doctor"
                                ? "bg-emerald-500"
                                : "bg-blue-500"
                            }`}
                          >
                            {cred.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {cred.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-mono text-indigo-600">
                                {cred.loginId}
                              </span>
                              <button
                                onClick={() =>
                                  copyToClipboard(cred.loginId, cred._id)
                                }
                                className="text-gray-300 hover:text-indigo-500 transition-colors"
                                title="Copy Login ID"
                              >
                                {copied === cred._id ? (
                                  <svg
                                    className="w-3.5 h-3.5 text-green-500"
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
                                ) : (
                                  <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                  </svg>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                          {/* Role Badge */}
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                              cred.role === "doctor"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {cred.role}
                          </span>

                          {/* Status Badge */}
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                              cred.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {cred.status}
                          </span>

                          {/* Toggle Status */}
                          <button
                            onClick={() => handleToggleStatus(cred._id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              cred.status === "active"
                                ? "text-amber-500 hover:bg-amber-50"
                                : "text-green-500 hover:bg-green-50"
                            }`}
                            title={
                              cred.status === "active"
                                ? "Revoke access"
                                : "Restore access"
                            }
                          >
                            {cred.status === "active" ? (
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
                                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
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
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            )}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(cred._id)}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Delete credential"
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

export default AdminGenerateIDs;
