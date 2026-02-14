const fs = require("fs");
const path = require("path");

const patientsFile = path.join(__dirname, "../data/patients.json");
const checkedOutFile = path.join(__dirname, "../data/checkedOutPatients.json");

const readJSON = (filePath) => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const writeJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = {
  patientsFile,
  checkedOutFile,
  readJSON,
  writeJSON
};