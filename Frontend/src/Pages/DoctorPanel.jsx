import React, { useState, useEffect } from "react";
import PatientList from '../components/PatientList'
import Navbar from '../components/Navbar'

const API_URL = "http://localhost:5000/api";

function DoctorPanel() {
    const [patients, setPatients] = useState([]);
      const [checkedOut, setCheckedOut] = useState([]);
      const [loading, setLoading] = useState(true);
    
      // Fetch patients from backend
      const fetchPatients = async () => {
        try {
          const response = await fetch(`${API_URL}/patients`);
          const data = await response.json();
          setPatients(data);
    
          const checkOutResponse = await fetch(`${API_URL}/checked-in`);
          const checkOutdata = await checkOutResponse.json();
          setCheckedOut(checkOutdata);
    
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
    //   const handleAddPatient = async (patientData) => {
    //     try {
    //       const response = await fetch(`${API_URL}/patients`, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(patientData),
    //       });
    
    //       if (response.ok) {
    //         const newPatient = await response.json();
    //         setPatients((prev) => [...prev, newPatient]);
    //         return { success: true };
    //       } else {
    //         const error = await response.json();
    //         return { success: false, error: error.error };
    //       }
    //     } catch (error) {
    //       console.error("Error adding patient:", error);
    //       return { success: false, error: "Failed to add patient" };
    //     }
    //   };
    
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
        <div className='w-full h-screen'>
            
            <Navbar
                patients={patients}
                checkedOut={checkedOut}
            />

            <PatientList
                patients={patients}
                onCheckIn={handleCheckIn}
                loading={loading}
            />

        </div>
    )
}

export default DoctorPanel