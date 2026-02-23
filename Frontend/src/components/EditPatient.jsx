import React, { useState, useEffect } from "react";

function EditPatient({ patient, onEditPatient, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    type: "normal",
    appointmentDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Initialize form with patient data
  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || "",
        age: patient.age || "",
        phone: patient.phone || "",
        type: patient.type || "normal",
        appointmentDate: patient.appointmentDate
          ? new Date(patient.appointmentDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const age = Number(formData.age);

    if (!formData.name || !formData.phone || !formData.age || !formData.appointmentDate) {
      setMessage({ text: "Please fill all fields", type: "error" });
      return;
    }

    if (age <= 0 || age >= 110) {
      setMessage({
        text: "Age must be between 1 and 109",
        type: "error",
      });
      return;
    }

    if (formData.phone.length !== 10) {
      setMessage({
        text: "Phone number must be 10 digits",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });
    const result = await onEditPatient(patient._id, formData);

    if (result.success) {
      setMessage({ text: "Patient updated successfully!", type: "success" });
      setTimeout(() => {
        onCancel();
      }, 1500);
    } else {
      setMessage({
        text: result.error || "Failed to update patient",
        type: "error",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="font-bold text-lg mb-4">Edit Patient Information</h2>

        {message.text && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter patient name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10 digit phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Date
            </label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="normal">Normal</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-all ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-md transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPatient;
