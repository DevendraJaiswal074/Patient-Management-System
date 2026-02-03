const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File paths for storing data
const patientsFile = path.join(__dirname, "patients.json");
const checkedInFile = path.join(__dirname, "checkedInPatients.json");

// Initialize files if they don't exist
const initializeFiles = () => {
  if (!fs.existsSync(patientsFile)) {
    const initialPatients = [
      { id: 1, name: "Chandan Chaudhary", phone: "012-248-53798", age: 25, type: "normal" },
      { id: 2, name: "Deepanshu Yadav", phone: "012-245-53789", age: 30, type: "normal" },
      { id: 3, name: "Devendra Jaiswal", phone: "012-245-63789", age: 28, type: "emergency" },
      { id: 4, name: "Divyansh Chakravarty", phone: "012-245-53789", age: 35, type: "normal" },
      { id: 5, name: "Suresh Agarwal", phone: "012-245-63789", age: 45, type: "normal" },
    ];
    fs.writeFileSync(patientsFile, JSON.stringify(initialPatients, null, 2));
  }
  if (!fs.existsSync(checkedInFile)) {
    fs.writeFileSync(checkedInFile, JSON.stringify([], null, 2));
  }
};

initializeFiles();

// Helper functions to read/write JSON files
const readPatients = () => {
  const data = fs.readFileSync(patientsFile, "utf-8");
  return JSON.parse(data);
};

const writePatients = (patients) => {
  fs.writeFileSync(patientsFile, JSON.stringify(patients, null, 2));
};

const readCheckedIn = () => {
  const data = fs.readFileSync(checkedInFile, "utf-8");
  return JSON.parse(data);
};

const writeCheckedIn = (patients) => {
  fs.writeFileSync(checkedInFile, JSON.stringify(patients, null, 2));
};

// GET all patients
app.get("/api/patients", (req, res) => {
  try {
    const patients = readPatients();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
});

// POST add new patient
app.post("/api/patients", (req, res) => {
  try {
    const { name, age, phone, type } = req.body;
    
    if (!name || !age || !phone || !type) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const patients = readPatients();
    const newId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
    
    const newPatient = {
      id: newId,
      name,
      age: parseInt(age),
      phone,
      type,
      addedAt: new Date().toISOString()
    };

    patients.push(newPatient);
    writePatients(patients);
    
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: "Failed to add patient" });
  }
});

// DELETE patient (check-in) - moves patient to checkedInPatients.json
app.delete("/api/patients/:id", (req, res) => {
  try {
    const patientId = parseInt(req.params.id);
    const patients = readPatients();
    
    const patientIndex = patients.findIndex(p => p.id === patientId);
    
    if (patientIndex === -1) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Remove patient from active list
    const [checkedInPatient] = patients.splice(patientIndex, 1);
    
    // Add check-in timestamp
    checkedInPatient.checkedInAt = new Date().toISOString();
    
    // Add to checked-in patients file
    const checkedInPatients = readCheckedIn();
    checkedInPatients.push(checkedInPatient);
    
    // Save both files
    writePatients(patients);
    writeCheckedIn(checkedInPatients);
    
    res.json({ message: "Patient checked in successfully", patient: checkedInPatient });
  } catch (error) {
    res.status(500).json({ error: "Failed to check in patient" });
  }
});

// GET all checked-in patients
app.get("/api/checked-in", (req, res) => {
  try {
    const checkedInPatients = readCheckedIn();
    res.json(checkedInPatients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch checked-in patients" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
