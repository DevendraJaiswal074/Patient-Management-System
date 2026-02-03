const {
  patientsFile,
  checkedInFile,
  readJSON,
  writeJSON
} = require("../services/fileService");

exports.getPatients = (req, res) => {
  try {
    const patients = readJSON(patientsFile);
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};

exports.addPatient = (req, res) => {
  const { name, age, phone, type } = req.body;

  if (!name || !age || !phone || !type) {
    return res.status(400).json({ error: "All fields required" });
  }

  const patients = readJSON(patientsFile);

  const newPatient = {
    id: Date.now(),
    name,
    age,
    phone,
    type,
    addedAt: new Date().toISOString()
  };

  patients.push(newPatient);
  writeJSON(patientsFile, patients);

  res.status(201).json(newPatient);
};

exports.checkInPatient = (req, res) => {
  const id = parseInt(req.params.id);

  const patients = readJSON(patientsFile);
  const checkedIn = readJSON(checkedInFile);

  const index = patients.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Patient not found" });
  }

  const [patient] = patients.splice(index, 1);
  patient.checkedInAt = new Date().toISOString();

  checkedIn.push(patient);

  writeJSON(patientsFile, patients);
  writeJSON(checkedInFile, checkedIn);

  res.json(patient);
};

exports.getCheckedIn = (req, res) => {
  try {
    const checkedIn = readJSON(checkedInFile);
    res.json(checkedIn);
  } catch {
    res.status(500).json({ error: "Failed to fetch checked-in patients" });
  }
};

const Patient = require("../models/Patient");

// GET patients
exports.getPatients = async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
};

// ADD patient
exports.addPatient = async (req, res) => {
  const patient = await Patient.create(req.body);
  res.status(201).json(patient);
};

// CHECK-IN / CHECK-OUT
exports.checkInPatient = async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    { status: "CheckedOut" },
    { new: true }
  );

  if (!patient) return res.status(404).json({ error: "Not found" });

  res.json(patient);
};

// GET checked-in
exports.getCheckedIn = async (req, res) => {
  const patients = await Patient.find({ status: "CheckedIn" });
  res.json(patients);
};