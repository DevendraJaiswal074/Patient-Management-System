import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AddPatient from "../components/AddPatient";
import EditPatient from "../components/EditPatient";
import PatientList from "../components/PatientList";

import { backendUrl } from "../App";

// const API_URL = backendUrl;

function StaffPanel() {
  const [patients, setPatients] = useState([]);
  const [checkedOut, setCheckedOut] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPatient, setEditingPatient] = useState(null);

  // Fetch patients from backend (all checked-in patients)
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

  // Fetch checkedOut from backend
  const fetchCheckedOut = async () => {
    try {
      const checkOutResponse = await fetch(`${backendUrl}/api/checked-out`);
      const checkOutdata = await checkOutResponse.json();
      setCheckedOut(checkOutdata);

    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients()
    fetchCheckedOut()
  }, []);

  // Add new patient
  const handleAddPatient = async (patientData) => {
    try {
      const response = await fetch(`${backendUrl}/api/patients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      if (response.ok) {
        const newPatient = await response.json();
        setPatients((prev) => [...prev, newPatient]);
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      console.error("Error adding patient:", error);
      return { success: false, error: "Failed to add patient" };
    }
  };

  // Edit patient
  const handleEditPatient = async (patientId, patientData) => {
    try {
      const response = await fetch(`${backendUrl}/api/patients/${patientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      if (response.ok) {
        const updatedPatient = await response.json();
        setPatients((prev) =>
          prev.map((p) => (p._id === patientId ? updatedPatient : p))
        );
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      console.error("Error editing patient:", error);
      return { success: false, error: "Failed to update patient" };
    }
  };

  // Check-out patient (update status from CheckedIn to CheckedOut)
  const handleCheckOut = async (patientId) => {
    try {
      const response = await fetch(`${backendUrl}/api/patients/${patientId}/checkout`, {
        method: "PATCH",
      });

      if (response.ok) {
        setPatients((prev) => prev.filter((p) => p._id !== patientId));
        fetchCheckedOut();
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      console.error("Error checking out patient:", error);
      return { success: false, error: "Failed to check out patient" };
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-50">
      <div className="top-0 relative">
        <Navbar />
      </div>

      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 mt-4 text-center px-2">
        Staff Dashboard
      </h2>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-4 mt-5 mx-2 md:mx-3 pb-10">
        <div className="w-full lg:w-auto">
          <AddPatient onAddPatient={handleAddPatient} />
        </div>
        <div className="w-full min-w-0">
          <PatientList
            patients={patients}
            onCheckOut={handleCheckOut}
            onEdit={setEditingPatient}
            loading={loading}
          />
        </div>
      </div>

      {editingPatient && (
        <EditPatient
          patient={editingPatient}
          onEditPatient={handleEditPatient}
          onCancel={() => setEditingPatient(null)}
        />
      )}
    </div>
  );
}

export default StaffPanel;
