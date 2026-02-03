import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AddPatient from "../components/AddPatient";
import PatientList from "../components/PatientList";

const API_URL = "http://localhost:5000/api";

function HomePage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch patients from backend
  const fetchPatients = async () => {
    try {
      const response = await fetch(`${API_URL}/patients`);
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Add new patient
  const handleAddPatient = async (patientData) => {
    try {
      const response = await fetch(`${API_URL}/patients`, {
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

  // Check-in patient (remove from list and store in separate file)
  const handleCheckIn = async (patientId) => {
    try {
      const response = await fetch(`${API_URL}/patients/${patientId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPatients((prev) => prev.filter((p) => p.id !== patientId));
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      console.error("Error checking in patient:", error);
      return { success: false, error: "Failed to check in patient" };
    }
  };

  return (
    <div className="h-screen w-full bg-blue-50">
      <div className="top-0 relative">
        <Navbar
          patients={patients}
          onCheckIn={handleCheckIn}
        />
      </div>

      <div className="flex items-start gap-4 mt-5 mx-3">
        <AddPatient onAddPatient={handleAddPatient} />
        <div className="w-full">
          <PatientList
            patients={patients}
            onCheckIn={handleCheckIn}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;





