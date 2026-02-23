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

          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : patients.length === 0 ? (
            <p className="text-sm text-gray-600">No appointments for this date.</p>
          ) : (
              <>
                <div className="text-sm text-gray-600 mb-3">
                  <div>Server results: <strong>{serverCount ?? '-'}</strong></div>
                  <div>Client-filter results: <strong>{clientCount ?? '-'}</strong></div>
                </div>

                {patients.length === 0 ? (
                  <p className="text-sm text-gray-600">No appointments for this date.</p>
                ) : (
            <ol className="list-decimal pl-5 space-y-2">
              {patients.map((p) => (
                <li key={p._id} className="py-1 border-b">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-gray-500">Age: {p.age} • {p.phone} • {p.type}</div>
                </li>
              ))}
            </ol>
                )}
              </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DateAppointments;
