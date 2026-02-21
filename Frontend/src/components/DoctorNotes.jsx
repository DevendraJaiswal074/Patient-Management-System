import React, { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "doctor_notes";
const COLLAPSED_KEY = "doctor_notes_collapsed";

export default function DoctorNotes() {
  const [notes, setNotes] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [saving, setSaving] = useState(false);
  const saveTimer = useRef(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) setNotes(s);
      const c = localStorage.getItem(COLLAPSED_KEY);
      if (c === "true") setCollapsed(true);
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  // Debounced autosave to localStorage
  useEffect(() => {
    setSaving(true);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, notes);
      } catch (e) {}
      setSaving(false);
    }, 700);
    return () => clearTimeout(saveTimer.current);
  }, [notes]);

  // Ensure save on unload
  useEffect(() => {
    const onUnload = () => {
      try {
        localStorage.setItem(STORAGE_KEY, notes);
      } catch (e) {}
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [notes]);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem(COLLAPSED_KEY, String(next));
    } catch (e) {}
  };

  if (collapsed) {
    return (
      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={toggle}
          title="Open Notes"
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-full p-3 shadow hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.464.263l-4 1a1 1 0 01-1.213-1.213l1-4a1 1 0 01.263-.464l9.9-9.9a2 2 0 012.828 0z" />
          </svg>
          <span className="text-sm text-gray-700 font-medium">Notes</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-gray-100 to-white">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.464.263l-4 1a1 1 0 01-1.213-1.213l1-4a1 1 0 01.263-.464l9.9-9.9a2 2 0 012.828 0z" />
          </svg>
          <h4 className="text-sm font-bold text-gray-800">Doctor Notes</h4>
          <span className="text-xs text-gray-500">(Auto-save)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">{saving ? "Saving..." : "Saved"}</span>
          <button
            onClick={toggle}
            title="Collapse notes"
            className="text-gray-600 hover:text-gray-800 p-1 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414L8.586 12l-2.293 2.293a1 1 0 101.414 1.414L9 13.414l2.293 2.293a1 1 0 001.414-1.414L10.414 12l2.293-2.293z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-3">
        <textarea
          aria-label="Doctor notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write any notes or reminders here. They will be saved automatically."
          className="w-full min-h-[140px] resize-y p-3 border border-gray-100 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
        />
        <div className="mt-2 text-right text-xs text-gray-400">Tip: close to fold into icon</div>
      </div>
    </div>
  );
}
