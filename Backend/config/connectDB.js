const mongoose = require("mongoose");
const dns = require("dns");

// Local ISP resolvers often fail the SRV lookup for mongodb+srv URIs.
// Vercel's runtime resolves it fine, so don't override DNS there.
if (!process.env.VERCEL) {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

// A serverless instance is reused across requests, so cache the connection
// promise instead of dialing MongoDB on every invocation.
let cached = global.__mongooseConn;
if (!cached) {
  cached = global.__mongooseConn = { promise: null };
}

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(`${process.env.MONGODB_URI}/patientData`)
      .then((conn) => {
        console.log("MongoDB connected ✅");
        return conn;
      })
      .catch((error) => {
        cached.promise = null;
        console.error("MongoDB connection failed ❌", error.message);
        throw error;
      });
  }

  return cached.promise;
};

module.exports = connectDB;
