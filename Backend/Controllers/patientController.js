const {
  patientsFile,
  checkedInFile,
  readJSON,
  writeJSON,
} = require("../services/fileService");

// GET patients
exports.getPatients = (req, res) => {
  try {
    const patients = readJSON(patientsFile);
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};

// ADD patient
exports.addPatient = (req, res) => {
  const { name, age, phone, type } = req.body;

  if (!name || !age || !phone || !type) {
    return res.status(400).json({ error: "All fields required" });
  }

  if (Number(age) <= 0 || Number(age) >= 110) {
    return res.status(400).json({ error: "Age must be between 1 and 109" });
  }

  const patients = readJSON(patientsFile);

  const newPatient = {
    id: Date.now(),
    name,
    age: Number(age),
    phone,
    type,
    addedAt: new Date().toISOString(),
  };

  patients.push(newPatient);
  writeJSON(patientsFile, patients);

  res.status(201).json(newPatient);
};

// CHECK-IN patient (move from patients to checkedIn)
exports.checkInPatient = (req, res) => {
  const id = parseInt(req.params.id);

  const patients = readJSON(patientsFile);
  const checkedIn = readJSON(checkedInFile);

  const index = patients.findIndex((p) => p.id === id);
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

// GET checked-in patients
exports.getCheckedIn = (req, res) => {
  try {
    const checkedIn = readJSON(checkedInFile);
    res.json(checkedIn);
  } catch {
    res.status(500).json({ error: "Failed to fetch checked-in patients" });
  }
};