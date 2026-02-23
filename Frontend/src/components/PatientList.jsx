import React, { useState } from "react";

const PatientList = ({ patients, onCheckOut, onEdit, loading }) => {
  const [checkingOut, setCheckingOut] = useState(null);
  const [search, setSearch] = useState("");

  // apply search filter (name or phone)
  const searchedPatients = patients.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.phone && String(p.phone).toLowerCase().includes(q))
    );
  });

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
      <div className="flex items-center justify-between flex-wrap gap-4 px-4 py-2 border-b border-black/30">
        <h2 className="font-bold text-xl text-gray-700">Remaining Patient List</h2>
        <input
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none w-64"
        />
      </div>

      {searchedPatients.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          {patients.length === 0 ? "No patients in the list. Add a new patient to get started." : "No patients found."}
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
              <th className="px-4 py-2 text-left">Appointment Date</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {searchedPatients.map((p, i) => (
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

                <td className="px-4 py-2 text-sm text-gray-600">
                  {p.appointmentDate
                    ? new Date(p.appointmentDate).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : "N/A"}
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
