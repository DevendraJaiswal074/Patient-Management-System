const Patient = require("../models/Patient");
const { sendAppointmentConfirmation } = require("../services/messagingService");

const DAILY_PATIENT_LIMIT = 70;

// Helper: count patients for a given date (YYYY-MM-DD string)
const countPatientsForDate = async (dateStr) => {
  const startOfDay = new Date(dateStr);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date(dateStr);
  endOfDay.setUTCHours(23, 59, 59, 999);
  return Patient.countDocuments({
    appointmentDate: { $gte: startOfDay, $lte: endOfDay },
  });
};

// GET availability for a date (or find next available date)
exports.getDateAvailability = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: "Date query parameter is required" });
    }

    const count = await countPatientsForDate(date);
    const available = count < DAILY_PATIENT_LIMIT;
    const remaining = Math.max(0, DAILY_PATIENT_LIMIT - count);

    // If requested date is full, find the next available date
    let nextAvailableDate = null;
    if (!available) {
      let checkDate = new Date(date);
      for (let i = 0; i < 90; i++) {
        checkDate.setDate(checkDate.getDate() + 1);
        const dateStr = checkDate.toISOString().split("T")[0];
        const dayCount = await countPatientsForDate(dateStr);
        if (dayCount < DAILY_PATIENT_LIMIT) {
          nextAvailableDate = dateStr;
          break;
        }
      }
    }

    res.json({ date, count, limit: DAILY_PATIENT_LIMIT, remaining, available, nextAvailableDate });
  } catch (err) {
    res.status(500).json({ error: "Failed to check date availability" });
  }
};

// GET patients (checked-in)
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ status: "CheckedIn" }).sort({ appointmentDate: 1, createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};

// ADD patient
exports.addPatient = async (req, res) => {
  const { name, age, phone, type, appointmentDate } = req.body;

  if (!name || !age || !phone || !type || !appointmentDate) {
    return res.status(400).json({ error: "All fields required" });
  }

  if (Number(age) <= 0 || Number(age) >= 110) {
    return res.status(400).json({ error: "Age must be between 1 and 109" });
  }

  try {
    // Check daily patient limit
    const dateStr = new Date(appointmentDate).toISOString().split("T")[0];
    const count = await countPatientsForDate(dateStr);
    if (count >= DAILY_PATIENT_LIMIT) {
      return res.status(400).json({
        error: `Daily patient limit of ${DAILY_PATIENT_LIMIT} reached for ${dateStr}. Please choose another date.`,
        limitReached: true,
      });
    }

    const newPatient = await Patient.create({
      name,
      age: Number(age),
      phone,
      type,
      appointmentDate: new Date(appointmentDate),
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

// UPDATE patient information
exports.updatePatient = async (req, res) => {
  try {
    const { name, age, phone, type, appointmentDate } = req.body;
    const patientId = req.params.id;

    // Validate required fields
    if (!name || !age || !phone || !type || !appointmentDate) {
      return res.status(400).json({ error: "All fields required" });
    }

    // Validate age
    if (Number(age) <= 0 || Number(age) >= 110) {
      return res.status(400).json({ error: "Age must be between 1 and 109" });
    }

    // Validate phone
    if (String(phone).length !== 10) {
      return res.status(400).json({ error: "Phone number must be 10 digits" });
    }

    const patient = await Patient.findByIdAndUpdate(
      patientId,
      {
        name,
        age: Number(age),
        phone,
        type,
        appointmentDate: new Date(appointmentDate),
      },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: "Failed to update patient" });
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

// GET all patients (both CheckedIn and CheckedOut)
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ appointmentDate: 1, createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};

// DELETE a single patient by ID (any status)
exports.deletePatientById = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json({ message: "Patient deleted successfully", patient });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete patient" });
  }
};

// DELETE patients by date (all patients created on a specific date)
exports.deletePatientsByDate = async (req, res) => {
  try {
    const { date } = req.body;
    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const result = await Patient.deleteMany({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    res.json({
      message: `${result.deletedCount} patients deleted for ${date}`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete patients by date" });
  }
};

// DELETE patients by date range
exports.deletePatientsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Start date and end date are required" });
    }

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const result = await Patient.deleteMany({
      createdAt: { $gte: start, $lte: end },
    });

    res.json({
      message: `${result.deletedCount} patients deleted from ${startDate} to ${endDate}`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete patients by date range" });
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

// GET patients for a specific appointment date (YYYY-MM-DD)
exports.getPatientsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: "Date query parameter is required" });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const patients = await Patient.find({
      appointmentDate: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ appointmentDate: 1, createdAt: -1 });

    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patients by date" });
  }
};