import React, { useState } from "react";

function AddPatient({ onAddPatient }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    type: "normal",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.age || !formData.phone) {
      setMessage({ text: "Please fill all fields", type: "error" });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    const result = await onAddPatient(formData);

    if (result.success) {
      setMessage({ text: "Patient added successfully!", type: "success" });
      // Reset form
      setFormData({
        name: "",
        age: "",
        phone: "",
        type: "normal",
      });
    } else {
      setMessage({ text: result.error || "Failed to add patient", type: "error" });
    }

    setIsSubmitting(false);

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  return (
    <div className="bg-white w-max px-5 py-6 border border-black/30 rounded">
      <h2 className="font-bold text-lg">Add New Patient</h2>

      {message.text && (
        <div
          className={`mt-2 p-2 rounded text-sm ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4 min-w-60">
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
          className="rounded border border-black/20 p-2"
        />
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone number"
          className="rounded border border-black/20 p-2"
        />

        <div className="flex gap-5 mt-2">
          <label htmlFor="normal" className="flex items-center gap-2 cursor-pointer">
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

          <label htmlFor="emergency" className="flex items-center gap-2 cursor-pointer">
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
          disabled={isSubmitting}
          className={`bg-[#3475b9] hover:bg-blue-400 transition-all ease-in text-white font-bold py-1.5 px-5 rounded mt-2 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Patient"}
        </button>
      </form>
    </div>
  );
}

export default AddPatient;
