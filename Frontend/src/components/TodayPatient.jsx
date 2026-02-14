import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";

function TodayPatient() {
  const [todayPatients, setTodayPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTodayPatients = async () => {
      try {
        const [patientsRes, checkedOutRes] = await Promise.all([
          fetch(`${backendUrl}/api/patients`),
          fetch(`${backendUrl}/api/checked-out`),
        ]);

        const patients = await patientsRes.json();
        const checkedOut = await checkedOutRes.json();

        const today = new Date().toDateString();

        const todayCheckedIn = patients
          .filter((p) => new Date(p.addedAt).toDateString() === today)
          .map((p) => ({ ...p, status: "Checked In" }));

        const todayCheckedOut = checkedOut
          .filter((p) => new Date(p.addedAt).toDateString() === today)
          .map((p) => ({ ...p, status: "Checked Out" }));

        setTodayPatients([...todayCheckedIn, ...todayCheckedOut]);
      } catch (error) {
        console.error("Error fetching today's patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayPatients();
  }, []);

  const filteredPatients =
    filter === "all"
      ? todayPatients
      : todayPatients.filter((p) =>
          filter === "checked-in" ? p.status === "Checked In" : p.status === "Checked Out"
        );

  if (loading) {
    return (
      <div className="bg-white shadow border border-black/30 rounded p-8 text-center">
        <p className="text-gray-500">Loading today's patients...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow border border-black/30 rounded">
      <div className="flex items-center justify-between px-4 py-2 border-b border-black/30">
        <h2 className="font-bold text-xl text-gray-700">Today's Patients</h2>
        <div className="flex gap-2">
          {["all", "checked-in", "checked-out"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded transition-all ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f === "all" ? "All" : f === "checked-in" ? "Checked In" : "Checked Out"}
            </button>
          ))}
        </div>
      </div>

      {filteredPatients.length === 0 ? (
        <div className="p-8 text-center text-gray-500">No patients added today.</div>
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
            {filteredPatients.map((p, i) => (
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
                  <span
                    className={`text-xs px-2 py-1 rounded font-medium ${
                      p.status === "Checked In"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {p.status}
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

export default TodayPatient;
