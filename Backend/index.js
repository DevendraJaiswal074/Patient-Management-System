const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB.js");

dotenv.config();
connectDB().catch(() => {});

const patientRoutes = require("./Routes/patientRoutes");
const credentialRoutes = require("./Routes/credentialRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Patient Management System API" });
});

app.use("/api", patientRoutes);
app.use("/api", credentialRoutes);

// Vercel runs this file as a serverless function and handles the listening
// itself, so only bind a port when running locally.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
