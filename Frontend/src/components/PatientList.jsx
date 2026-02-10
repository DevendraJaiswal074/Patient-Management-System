import React, { useState } from "react";

const PatientList = ({ patients = [], onCheckIn, loading, hideCheckInButton = false }) => {
  const [checkingIn, setCheckingIn] = useState(null);

  const handleCheckIn = async (patientId) => {
    if (!onCheckIn) return;
    setCheckingIn(patientId);
    await onCheckIn(patientId);
    setCheckingIn(null);
  };

  if (loading) {
    return (
      <div className="bg-white shadow border border-black/30 rounded p-8 text-center">
        <p className="text-gray-500">Loading patients...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow border border-black/30 rounded">
      <div className="text-center px-4 py-2 border-b border-black/30 rounded font-bold text-xl text-gray-700">
        Today's Checked-In Patients
      </div>

      {patients.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No checked-in patients right now.
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-black/30 rounded">
            <tr>
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Patient Name</th>
              <th className="px-4 py-2 text-left">Age</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Checked In At</th>

              {!hideCheckInButton && (
                <th className="px-4 py-2 text-left">Action</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y">
            {patients.map((p, i) => (
              <tr key={p.id || i}>
                <td className="px-4 py-3">{i + 1}.</td>

                <td className="px-4 py-2 flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full ${
                      p.type === "emergency" ? "bg-red-500" : "bg-sky-500"
                    }`}
                  ></div>
                  {p.name || "-"}
                </td>

                <td className="px-4 py-2">{p.age || "-"}</td>
                <td className="px-4 py-2">{p.phone || "-"}</td>

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
                  {p.checkedInAt
                    ? new Date(p.checkedInAt).toLocaleString()
                    : "-"}
                </td>

                {!hideCheckInButton && (
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleCheckIn(p.id)}
                      disabled={checkingIn === p.id}
                      className={`bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded transition-all ${
                        checkingIn === p.id ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {checkingIn === p.id ? "Checking..." : "Check In"}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientList;
