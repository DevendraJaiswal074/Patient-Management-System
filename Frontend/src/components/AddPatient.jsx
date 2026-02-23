import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";

const DAILY_PATIENT_LIMIT = 70;

function AddPatient({ onAddPatient }) {
  const todayStr = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    type: "normal",
    appointmentDate: todayStr,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [dateInfo, setDateInfo] = useState({ remaining: null, available: true, loading: false });
  const [datesWithAppointments, setDatesWithAppointments] = useState([]);
  const [lastAutoSwitchedFrom, setLastAutoSwitchedFrom] = useState(null);

  // Check date availability whenever appointmentDate changes
  useEffect(() => {
    const checkAvailability = async () => {
      if (!formData.appointmentDate) return;
      setDateInfo((prev) => ({ ...prev, loading: true }));
      try {
        const res = await fetch(
          `${backendUrl}/api/patients/date-availability?date=${formData.appointmentDate}`
        );
        const data = await res.json();
        setDateInfo({
          remaining: data.remaining,
          available: data.available,
          loading: false,
        });
        // If date is full, auto-switch to next available date
        if (!data.available && data.nextAvailableDate) {
          // avoid repeating the same auto-switch notification
          if (lastAutoSwitchedFrom !== formData.appointmentDate) {
            setMessage({
              text: `Limit reached for ${formData.appointmentDate}. Switched.`,
              type: "error",
            });
            setLastAutoSwitchedFrom(formData.appointmentDate);
            setFormData((prev) => ({ ...prev, appointmentDate: data.nextAvailableDate }));
            setTimeout(() => setMessage({ text: "", type: "" }), 3000);
            // clear the lock after a short delay so future legitimate switches can show again
            setTimeout(() => setLastAutoSwitchedFrom(null), 5000);
          }
        }
      } catch {
        setDateInfo({ remaining: null, available: true, loading: false });
      }
    };
    checkAvailability();
  }, [formData.appointmentDate]);

  // fetch patients and compute upcoming dates that have appointments
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/patients/all`);
        const all = await res.json();
        const map = {};
        const today = new Date();
        const todayStrLocal = today.toISOString().split("T")[0];

        all.forEach((p) => {
          if (!p.appointmentDate) return;
          const d = new Date(p.appointmentDate).toISOString().split("T")[0];
          if (d < todayStrLocal) return; // skip past
          map[d] = (map[d] || 0) + 1;
        });

        const dates = Object.keys(map).sort();
        // pick next 7 dates that have appointments
        setDatesWithAppointments(dates.slice(0, 7).map((d) => ({ date: d, count: map[d] })));
      } catch (e) {
        setDatesWithAppointments([]);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if the user manually changes the appointment date, allow auto-switch notifications again
    if (name === "appointmentDate") {
      setLastAutoSwitchedFrom(null);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const age = Number(formData.age);

    if (!formData.name || !formData.phone || !formData.age || !formData.appointmentDate) {
      setMessage({ text: "Please fill all fields", type: "error" });
      return;
    }

    if (age <= 0 || age >= 110) {
      setMessage({
        text: "Age must be between 1 and 109",
        type: "error",
      });
      return;
    }

    
    //function for phone no.
    if (formData.phone.length !== 10) {
      setMessage({
        text: "Phone number must be 10 digits",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });
    const result = await onAddPatient(formData);

    if (result.success) {
      setMessage({ text: "Patient added successfully!", type: "success" });
      // Refresh availability count
      setDateInfo((prev) => ({
        ...prev,
        remaining: prev.remaining !== null ? prev.remaining - 1 : null,
        available: prev.remaining !== null ? prev.remaining - 1 > 0 : true,
      }));
      // Reset form
      setFormData({
        name: "",
        age: "",
        phone: "",
        type: "normal",
        appointmentDate: todayStr,
      });
    } else {
      setMessage({
        text: result.error || "Failed to add patient",
        type: "error",
      });
    }

    setIsSubmitting(false);

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  return (
    <div className="relative bg-white w-full lg:w-max px-4 md:px-5 py-5 md:py-6 border border-black/30 rounded">
      <h2 className="font-bold text-base md:text-lg">Add New Patient</h2>

      {message.text && (
        <div
          className={`absolute z-50 top-4 left-4 right-4 p-2 rounded text-sm text-center mx-auto max-w-md ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mt-4 w-full md:min-w-60"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Patient name"
          className="rounded border border-black/20 p-2"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Patient age"
          min={1}
          max={109}
          className="rounded border border-black/20 p-2"
        />

        <input
          type="date"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          min={todayStr}
          className="rounded border border-black/20 p-2"
        />
        {dateInfo.loading ? (
          <p className="text-xs text-gray-400">Checking availability...</p>
        ) : dateInfo.remaining !== null && (
          <p className={`text-xs ${
            dateInfo.remaining <= 10 ? "text-red-600 font-semibold" : "text-gray-500"
          }`}>
            {dateInfo.remaining} / {DAILY_PATIENT_LIMIT} slots remaining for this date
          </p>
        )}

        {/* allow enter only number and 10 digitsSystem */}
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,10}$/.test(value)) {
              setFormData((prev) => ({
                ...prev,
                phone: value,
              }));
            }
          }}
          placeholder="Phone number"
          inputMode="numeric"
          className="rounded border border-black/20 p-2"
        />

        <div className="flex flex-wrap gap-4 md:gap-5 mt-2">
          <label
            htmlFor="normal"
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="type"
              id="normal"
              value="normal"
              checked={formData.type === "normal"}
              onChange={handleChange}
            />
            <span>Normal</span>
          </label>

          <label
            htmlFor="emergency"
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="type"
              id="emergency"
              value="emergency"
              checked={formData.type === "emergency"}
              onChange={handleChange}
            />
            <span>Emergency</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !dateInfo.available}
          className={`bg-[#3475b9] hover:bg-blue-400 transition-all ease-in text-white font-bold py-1.5 px-5 rounded mt-2 ${
            isSubmitting || !dateInfo.available ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Adding..." : !dateInfo.available ? "Date Full" : "Add Patient"}
        </button>
      </form>

      {/* Next-day dates card (shows dates that have appointments) */}
      <div className="mt-4 bg-white border border-black/10 rounded p-3 max-w-sm">
        <h3 className="font-semibold text-blue-700 mb-2">Next Day Appointments</h3>
        {datesWithAppointments.length === 0 ? (
          <p className="text-sm text-gray-500">No upcoming appointments</p>
        ) : (
          <ol className="list-decimal pl-5 text-sm">
              {datesWithAppointments.map((d, i) => (
                <li key={d.date} className="py-1">
                  <button
                    type="button"
                    onClick={() => window.open(`${window.location.origin}/date-appointments?date=${d.date}`, "_blank")}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span>
                      {new Date(d.date).toLocaleDateString("en-IN", { month: "2-digit", day: "2-digit", year: "numeric" })}
                    </span>
                    <span className="text-xs text-gray-500">{d.count}</span>
                  </button>
                </li>
              ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default AddPatient;
