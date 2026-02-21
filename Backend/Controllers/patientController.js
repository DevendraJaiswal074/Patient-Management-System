const Patient = require("../models/Patient");
const { sendAppointmentConfirmation } = require("../services/messagingService");

// GET patients (checked-in)
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ status: "CheckedIn" }).sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};

// ADD patient
exports.addPatient = async (req, res) => {
  const { name, age, phone, type } = req.body;

  if (!name || !age || !phone || !type) {
    return res.status(400).json({ error: "All fields required" });
  }

  if (Number(age) <= 0 || Number(age) >= 110) {
    return res.status(400).json({ error: "Age must be between 1 and 109" });
  }

  try {
    const newPatient = await Patient.create({
      name,
      age: Number(age),
      phone,
      type,
    });

    // Send confirmation message (non-blocking)
    sendAppointmentConfirmation(phone, name, type).catch((err) =>
      console.error("Failed to send confirmation:", err.message)
    );

    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ error: "Failed to add patient" });
  }
};

// CHECK-OUT patient (update status from CheckedIn to CheckedOut)
exports.checkOutPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    patient.status = "CheckedOut";
    patient.checkedOutAt = new Date();
    await patient.save();

    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: "Failed to check out patient" });
  }
};

// GET checked-out patients
exports.getCheckedOut = async (req, res) => {
  try {
    const checkedOut = await Patient.find({ status: "CheckedOut" }).sort({ checkedOutAt: -1 });
    res.json(checkedOut);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch checked-out patients" });
  }
};

// DELETE patients by batch (for checked-in)
exports.deletePatientsBatch = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Invalid or empty patient IDs" });
    }

    console.log("Deleting checked-in patients with IDs:", ids);

    // Delete from Patient collection where status is CheckedIn
    const result = await Patient.deleteMany({ 
      _id: { $in: ids },
      status: "CheckedIn"
    });

    console.log(`Deleted ${result.deletedCount} checked-in patients`);
    
    res.json({ 
      message: `${result.deletedCount} patients deleted successfully`, 
      deletedCount: result.deletedCount 
    });
  } catch (err) {
    console.error("Error deleting patients:", err);
    res.status(500).json({ error: "Failed to delete patients", details: err.message });
  }
};

// DELETE checked-out patients by batch
exports.deleteCheckedOutBatch = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Invalid or empty patient IDs" });
    }

    console.log("Deleting checked-out patients with IDs:", ids);

    // Delete from Patient collection where status is CheckedOut
    const result = await Patient.deleteMany({ 
      _id: { $in: ids }, 
      status: "CheckedOut" 
    });

    console.log(`Deleted ${result.deletedCount} checked-out patients`);
    
    res.json({ 
      message: `${result.deletedCount} checked-out patients deleted successfully`, 
      deletedCount: result.deletedCount 
    });
  } catch (err) {
    console.error("Error deleting checked-out patients:", err);
    res.status(500).json({ error: "Failed to delete checked-out patients", details: err.message });
  }
};