const LoginCredential = require("../models/LoginCredential");
const crypto = require("crypto");

// Generate a unique login ID with prefix
const generateLoginId = (role) => {
  const prefix = role === "doctor" ? "DOC" : "STF";
  const unique = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `${prefix}-${unique}`;
};

// Generate a random password
const generatePassword = () => {
  return crypto.randomBytes(4).toString("hex").toUpperCase();
};

// POST - Generate new credential
exports.generateCredential = async (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: "Name and role are required" });
  }

  if (!["doctor", "staff"].includes(role)) {
    return res.status(400).json({ error: "Role must be 'doctor' or 'staff'" });
  }

  try {
    let loginId = generateLoginId(role);

    // Ensure uniqueness
    let exists = await LoginCredential.findOne({ loginId });
    while (exists) {
      loginId = generateLoginId(role);
      exists = await LoginCredential.findOne({ loginId });
    }

    const password = generatePassword();

    const credential = await LoginCredential.create({
      name,
      role,
      loginId,
      password,
    });

    res.status(201).json(credential);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate credential" });
  }
};

// GET - Get all credentials
exports.getAllCredentials = async (req, res) => {
  try {
    const credentials = await LoginCredential.find().sort({ createdAt: -1 });
    res.json(credentials);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch credentials" });
  }
};

// POST - Validate login credential
exports.validateCredential = async (req, res) => {
  const { loginId, password, role } = req.body;

  if (!loginId || !password || !role) {
    return res.status(400).json({ error: "Login ID, password, and role are required" });
  }

  try {
    const credential = await LoginCredential.findOne({
      loginId,
      password,
      role,
      status: "active",
    });

    if (!credential) {
      return res.status(401).json({ error: "Invalid credentials or access revoked" });
    }

    res.json({ success: true, name: credential.name, role: credential.role });
  } catch (err) {
    res.status(500).json({ error: "Login validation failed" });
  }
};

// DELETE - Revoke/delete credential
exports.deleteCredential = async (req, res) => {
  try {
    const credential = await LoginCredential.findByIdAndDelete(req.params.id);
    if (!credential) {
      return res.status(404).json({ error: "Credential not found" });
    }
    res.json({ message: "Credential deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete credential" });
  }
};

// PATCH - Toggle credential status (active/revoked)
exports.toggleCredentialStatus = async (req, res) => {
  try {
    const credential = await LoginCredential.findById(req.params.id);
    if (!credential) {
      return res.status(404).json({ error: "Credential not found" });
    }

    credential.status = credential.status === "active" ? "revoked" : "active";
    await credential.save();

    res.json(credential);
  } catch (err) {
    res.status(500).json({ error: "Failed to update credential status" });
  }
};
