const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    type: { type: String, enum: ["normal", "emergency"], required: true },
    appointmentDate: { type: Date, required: true },
    status: { type: String, enum: ["CheckedIn", "CheckedOut"], default: "CheckedIn" },
    checkedOutAt: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
