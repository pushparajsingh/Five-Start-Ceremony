const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menuItem");

router.post("/createMenu", async (req, res) => {
  try {
    const data = req.body;
    const responce = new MenuItem(data);
    const result = await responce.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: "Internal Server Error" });
  }
});

router.get("/getMenu", async (req, res) => {
  try {
    const result = await MenuItem.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: "Internal Server Error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "sweet" || taste == "spicy" || taste == "sour") {
      const result = await MenuItem.find({ taste });
      res.status(200).json(result);
    } else {
        throw new Error("Internal Server Error");
    }
  } catch (err) {
     res.status(400).json({ error:"Internal Server Error" });
  }
});
module.exports = router;
