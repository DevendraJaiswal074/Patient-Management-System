import React, { useEffect, useRef, useState } from "react";

export default function PatientNotes({ patientId, patientName, onClose }) {
  const STORAGE_KEY = `patient_notes_${patientId}`;
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) setNotes(s);
    } catch (e) {}
  }, [STORAGE_KEY]);

  useEffect(() => {
    setSaving(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, notes);
      } catch (e) {}
      setSaving(false);
    }, 600);
    return () => clearTimeout(timer.current);
  }, [notes, STORAGE_KEY]);

  useEffect(() => {
    const onUnload = () => {
      try {
        localStorage.setItem(STORAGE_KEY, notes);
      } catch (e) {}
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [notes, STORAGE_KEY]);

  return (
    <div className="p-3 bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-sm font-medium">Notes for {patientName}</div>
          <div className="text-xs text-gray-500">Autosaved — {saving ? "Saving..." : "Saved"}</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="text-sm px-3 py-1 bg-white border rounded text-gray-700 hover:bg-gray-100"
          >
            Done
          </button>
        </div>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write medicine, reminders or medical notes here..."
        className="w-full min-h-[120px] p-2 border border-gray-200 rounded resize-y"
      />
    </div>
  );
}
