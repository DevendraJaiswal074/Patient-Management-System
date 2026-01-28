import React from "react";

function AddPatient() {
  return (
    <div className="bg-white w-max px-5 py-6 border border-black/30 rounded">
      <h2 className="font-bold text-lg">Add New Paitent</h2>

      <form className="flex flex-col gap-2 mt-4 min-w-60">
        <input
          type="text"
          name=""
          id=""
          placeholder="Patient name"
          className="rounded border border-black/20 p-2"
        />
        <input
          type="number"
          name=""
          id=""
          placeholder="Patient age"
          className="rounded border border-black/20 p-2"
        />
        <input
          type="number"
          name=""
          id=""
          placeholder="Phone number"
          className="rounded border border-black/20 p-2"
        />

        <div className="flex gap-5 mt-2">
          <label htmlFor="normal" className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="patientType" id="normal" />
            <span>Normal</span>
          </label>

          <label htmlFor="emergency" className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="patientType" id="emergency" />
            <span>Emergency</span>
          </label>
        </div>

        <button className="bg-[#3475b9] hover:bg-blue-400 transition-all ease-in text-white font-bold py-1.5 px-5 rounded mt-2">
          Add Patient
        </button>
      </form>
    </div>
  );
}

export default AddPatient;
