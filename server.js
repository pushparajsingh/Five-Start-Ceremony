require('dotenv').config();  // add always at the top.
const express = require("express");
const app = express();
const db = require("./db");

const PORT = process.env.PORT || 3000; 
const bodyperser = require("body-parser");
const personRoutes = require("./routes/personRoutes");
const MenuRoutes = require("./routes/menuRoutes");
app.use(bodyperser.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/person", personRoutes);
app.use("/menu", MenuRoutes);

app.listen(PORT, () => {
  console.log("Listion on port 3000");
});
