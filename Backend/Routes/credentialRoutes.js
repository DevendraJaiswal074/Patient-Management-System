const express = require("express");
const router = express.Router();
const controller = require("../Controllers/credentialController");

router.post("/credentials/generate", controller.generateCredential);
router.get("/credentials", controller.getAllCredentials);
router.post("/credentials/validate", controller.validateCredential);
router.delete("/credentials/:id", controller.deleteCredential);
router.patch("/credentials/:id/toggle", controller.toggleCredentialStatus);

module.exports = router;
