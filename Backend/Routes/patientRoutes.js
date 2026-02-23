const express = require("express");
const router = express.Router();
const controller = require("../Controllers/patientController");

// Delete routes (must come before specific ID routes)
router.post("/patients/delete-batch", controller.deletePatientsBatch);
router.post("/checked-out/delete-batch", controller.deleteCheckedOutBatch);
router.post("/patients/delete-by-date", controller.deletePatientsByDate);
router.post("/patients/delete-by-date-range", controller.deletePatientsByDateRange);

// Other routes
router.get("/patients/date-availability", controller.getDateAvailability);
router.get("/patients/all", controller.getAllPatients);
router.get("/patients", controller.getPatients);
router.post("/patients", controller.addPatient);
router.put("/patients/:id", controller.updatePatient);
router.delete("/patients/:id", controller.deletePatientById);
router.patch("/patients/:id/checkout", controller.checkOutPatient);
router.get("/checked-out", controller.getCheckedOut);

module.exports = router;