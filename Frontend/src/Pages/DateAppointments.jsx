import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backendUrl } from "../App";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function DateAppointments() {
  const query = useQuery();
  const date = query.get("date");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverCount, setServerCount] = useState(null);
  const [clientCount, setClientCount] = useState(null);
  const navigate = useNavigate();

  const formatDateDDMMYYYY = (isoDate) => {
    try {
      const d = new Date(isoDate);
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    } catch (e) {
      return isoDate;
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/patients/by-date?date=${date}`);
        const list = await res.json();
        // If server returned empty, fallback to client-side filter for debugging/timezone issues
          setServerCount(Array.isArray(list) ? list.length : 0);
          // If server returned empty, fallback to client-side filter for debugging/timezone issues
          if (!list || list.length === 0) {
            const allRes = await fetch(`${backendUrl}/api/patients/all`);
            const all = await allRes.json();
            const clientList = all.filter((p) => {
              try {
                const pDate = new Date(p.appointmentDate).toISOString().split("T")[0];
                return pDate === date;
              } catch (e) {
                return false;
              }
            });
            setClientCount(clientList.length);
            console.debug("by-date result:", list, "client-filter result:", clientList);
            setPatients(clientList);
          } else {
            setClientCount(list.length);
            setPatients(list);
        }
      } catch (e) {
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };
    if (!date) {
      navigate(-1);
      return;
    }
    fetch();
  }, [date]);

  return (
    <div className="min-h-screen w-full bg-blue-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border border-black/30 rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold">Appointments for {formatDateDDMMYYYY(date)}</h2>
            <button onClick={() => window.close()} className="text-sm px-2 py-1 border rounded">Close</button>
          </div>

        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-black/30 rounded p-8 text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : patients.length === 0 ? (
        <div className="bg-white border border-black/30 rounded p-8 text-center">
          <p className="text-gray-600">No appointments for this date.</p>
        </div>
      ) : (
        <div className="bg-white border border-black/30 rounded overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-200 text-sm">
              <thead className="bg-gray-50 border-b border-black/30">
                <tr>
                  <th className="px-4 py-2 text-left">No</th>
                  <th className="px-4 py-2 text-left">Patient Name</th>
                  <th className="px-4 py-2 text-left">Age</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {patients.map((p, i) => (
                  <tr key={p._id}>
                    <td className="px-4 py-2">{i + 1}.</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full ${p.type === "emergency" ? "bg-red-500" : "bg-sky-500"}`}></div>
                      {p.name}
                    </td>
                    <td className="px-4 py-2">{p.age}</td>
                    <td className="px-4 py-2">{p.phone}</td>
                    <td className="px-4 py-2">
                      <span className={`text-xs px-2 py-1 rounded ${p.type === "emergency" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                        {p.type === "emergency" ? "Emergency" : "Normal"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default DateAppointments;
