import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";
import PatientNotes from "./PatientNotes";

function TodayPatient({ onDataLoaded }) {
  const [todayPatients, setTodayPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState(null);
  const [notesExist, setNotesExist] = useState({});

  useEffect(() => {
    const fetchTodayPatients = async () => {
      try {
        const [patientsRes, checkedOutRes] = await Promise.all([
          fetch(`${backendUrl}/api/patients`),
          fetch(`${backendUrl}/api/checked-out`),
        ]);

        const patients = await patientsRes.json();
        const checkedOut = await checkedOutRes.json();

        // Compare using YYYY-MM-DD to avoid timezone issues
        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        // Helper: check if a patient belongs to today
        // Use appointmentDate if available, otherwise fall back to createdAt
        const isTodayPatient = (p) => {
          if (p.appointmentDate) {
            return p.appointmentDate.slice(0, 10) === todayStr;
          }
          return p.createdAt && p.createdAt.slice(0, 10) === todayStr;
        };

        const todayCheckedIn = patients
          .filter(isTodayPatient)
          .map((p) => ({ ...p, status: "Checked In" }));

        const todayCheckedOut = checkedOut
          .filter(isTodayPatient)
          .map((p) => ({ ...p, status: "Checked Out" }));

        // Show checked-out patients first, then checked-in
        const combined = [...todayCheckedOut, ...todayCheckedIn];
        setTodayPatients(combined);

        if (onDataLoaded) {
          onDataLoaded(combined);
        }
      } catch (error) {
        console.error("Error fetching today's patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayPatients();
  }, []);

  // update notes existence map when patients change
  useEffect(() => {
    const map = {};
    todayPatients.forEach((p) => {
      try {
        const key = `patient_notes_${p._id}`;
        map[p._id] = !!localStorage.getItem(key);
      } catch (e) {
        map[p._id] = false;
      }
    });
    setNotesExist(map);
  }, [todayPatients]);

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
        <div className="w-full overflow-x-auto">
        <table className="w-full min-w-175 text-sm">
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
            {filteredPatients.map((p, i) => (
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

                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <button
                        onClick={() => setOpenId(openId === p._id ? null : p._id)}
                        title="Patient notes"
                        className="ml-2 p-1 rounded hover:bg-gray-100"
                      >
                        {notesExist[p._id] ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7l-4-4H5z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.464.263l-4 1a1 1 0 01-1.213-1.213l1-4a1 1 0 01.263-.464l9.9-9.9a2 2 0 012.828 0z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>

                {openId === p._id && (
                  <tr>
                    <td colSpan={8} className="p-0 border-b">
                      <PatientNotes
                        patientId={p._id}
                        patientName={p.name}
                        onClose={() => {
                          try {
                            const key = `patient_notes_${p._id}`;
                            const v = localStorage.getItem(key);
                            setNotesExist((s) => ({ ...s, [p._id]: !!v }));
                          } catch (e) {}
                          setOpenId(null);
                        }}
                      />
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

export default TodayPatient;
