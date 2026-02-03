const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    type: { type: String, enum: ["normal", "emergency"], required: true },
    status: { type: String, default: "CheckedIn" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
