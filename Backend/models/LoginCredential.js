const mongoose = require("mongoose");

const loginCredentialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ["doctor", "staff"], required: true },
    loginId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "revoked"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LoginCredential", loginCredentialSchema);
