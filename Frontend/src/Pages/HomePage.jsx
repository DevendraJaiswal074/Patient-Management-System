import React from "react";
import Navbar from "../components/Navbar";
import AddPatient from "../components/AddPatient";

function HomePage() {
  return (
    <div className="h-screen w-full bg-blue-50">
      <div className="top-0 relative">
        <Navbar />
      </div>

      <div className="w-max">
        <AddPatient />
      </div>
    </div>
  );
}

export default HomePage;
