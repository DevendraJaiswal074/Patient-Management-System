import React, { useState } from "react";

const PatientList = ({ patients, onCheckOut, onEdit, loading }) => {
  const [checkingOut, setCheckingOut] = useState(null);

  const handleCheckOut = async (patientId) => {
    setCheckingOut(patientId);
    await onCheckOut(patientId);
    setCheckingOut(null);
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
        Today's Patient List
      </div>

      {patients.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No patients in the list. Add a new patient to get started.
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
        <table className="w-full min-w-175 text-sm">
          <thead className="bg-gray-50 border-b border-black/30 rounded">
            <tr>
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Patient Name</th>
              <th className="px-4 py-2 text-left">Age</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {patients.map((p, i) => (
              <tr key={p._id} className={p.type === "emergency" ? "bg-white" : ""}>
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

                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleCheckOut(p._id)}
                    disabled={checkingOut === p._id}
                    className={`bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded transition-all ${
                      checkingOut === p._id ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {checkingOut === p._id ? "Checking..." : "Check out"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default PatientList;
