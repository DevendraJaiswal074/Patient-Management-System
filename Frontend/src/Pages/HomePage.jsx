import React from "react";
import Navbar from "../components/Navbar";
import AddPatient from "../components/AddPatient";
import PatientList from "../components/PatientList";

function HomePage() {
  return (
    <div className="h-screen w-full bg-blue-50">
      <div className="top-0 relative">
        <Navbar />
      </div>

      <div className="flex items-start gap-4 mt-5 mx-3">
        <AddPatient />
        <div className="w-full">
          <PatientList />
        </div>
      </div>



    </div>
  );
}

export default HomePage;   





