import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { backendUrl } from "../App";

function AdminCheckedIn() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/patients`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-100">
        <Navbar patients={[]} checkedOut={[]} />
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <div className="bg-white shadow border border-black/30 rounded p-8 text-center">
            <p className="text-gray-500">Loading checked-in patients...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar patients={[]} checkedOut={[]} />

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="mb-4">
          <Link
            to="/admin-dashboard"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-4 fill-current">
              <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
            Back to Admin Dashboard
          </Link>
        </div>

        <div className="bg-white shadow border border-black/30 rounded">
          <div className="text-center px-4 py-2 border-b border-black/30 rounded font-bold text-xl text-gray-700">
            Checked In Patients
          </div>

          {patients.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No checked-in patients found.
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
                {patients.map((p, i) => (
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
                      <span className="text-xs px-2 py-1 rounded font-medium bg-green-100 text-green-700">
                        Checked In
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminCheckedIn;
