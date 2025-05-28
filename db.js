const mongoose = require("mongoose");
// const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB Server");
});

db.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

db.on("disonnected", (err) => {
  console.log("MongoDB Disconnected");
});

module.exports = db;
