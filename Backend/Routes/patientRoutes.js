const express = require("express");
const router = express.Router();
const controller = require("../Controllers/patientController");

router.get("/patients", controller.getPatients);
router.post("/patients", controller.addPatient);
router.delete("/patients/:id", controller.checkOutPatient);
router.get("/checked-out", controller.getCheckedOut);

module.exports = router;