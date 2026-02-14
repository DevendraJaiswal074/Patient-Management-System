import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";

function CheckedOutList() {
  const [checkedOutPatients, setCheckedOutPatients] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="bg-white shadow border border-black/30 rounded p-8 text-center">
        <p className="text-gray-500">Loading checked-out patients...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow border border-black/30 rounded">
      <div className="text-center px-4 py-2 border-b border-black/30 rounded font-bold text-xl text-gray-700">
        Checked Out Patients
      </div>

      {checkedOutPatients.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No checked-out patients found.
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-black/30">
            <tr>
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Patient Name</th>
              <th className="px-4 py-2 text-left">Age</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {checkedOutPatients.map((p, i) => (
              <tr key={p.id}>
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
