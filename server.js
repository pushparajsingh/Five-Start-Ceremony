require('dotenv').config();  // add always at the top.
const express = require("express");
const app = express();
const db = require("./db");

const PORT = process.env.PORT || 3000; 
const bodyperser = require("body-parser");
const personRoutes = require("./routes/personRoutes");
const MenuRoutes = require("./routes/menuRoutes");
const passport = require("./Auth/usernamePasswordAuth");
app.use(bodyperser.json());

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{ session: false });
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/person", personRoutes);
app.use("/menu", MenuRoutes);

app.listen(PORT, () => {
  console.log("Listion on port 3000");
});
