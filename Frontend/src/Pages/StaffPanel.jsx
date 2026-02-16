import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AddPatient from "../components/AddPatient";
import PatientList from "../components/PatientList";

import { backendUrl } from "../App";

// const API_URL = backendUrl;

function StaffPanel() {
  const [patients, setPatients] = useState([]);
  const [checkedOut, setCheckedOut] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch patients from backend
  // const fetchPatients = async () => {
  //   try {
  //     const response = await fetch(`${backendUrl}/api/patients`);
  //     const data = await response.json();
  //     setPatients(data);

  //   } catch (error) {
  //     console.error("Error fetching patients:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch checkedOut from backend
  // const fetchCheckedOut = async () => {
  //   try {
  //     const checkOutResponse = await fetch(`${backendUrl}/api/checked-out`);
  //     const checkOutdata = await checkOutResponse.json();
  //     setCheckedOut(checkOutdata);

  //   } catch (error) {
  //     console.error("Error fetching patients:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchPatients()
  //   fetchCheckedOut()
  // }, []);

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

  // Check-in patient (remove from list and store in separate file)
  const handleCheckOut = async (patientId) => {
    try {
      const response = await fetch(`${backendUrl}/api/patients/${patientId}`, {
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
        <Navbar />
      </div>

      <div className="flex items-start gap-4 mt-5 mx-3">
        <AddPatient onAddPatient={handleAddPatient} />
        <div className="w-full">
          <PatientList
            patients={patients}
            onCheckOut={handleCheckOut}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default StaffPanel;





