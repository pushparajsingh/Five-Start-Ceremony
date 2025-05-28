const express = require("express");
const router = express.Router();
const Person = require("../models/person");

router.post("/create", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const responce = await newPerson.save(data);
    res.status(200).json(responce);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Internal Server Error" });
  }
});

router.get("/getData", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: "Internal Server Error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType == "Developer" ||
      workType == "Business" ||
      workType == "manager"
    ) {
      const result = await Person.find({ work:workType });
      res.status(200).json(result);
    } else {
      throw new Error("Invalid WorkType");
    }
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ error: "Internal Server Error" });
  }
});

router.put("/:id",async (req, res)=>{
    try{
        const id = req.params.id;
        const body = req.body
        const responce = await Person.findByIdAndUpdate(id, body,{ new: true, runValidators:true });
        if(!responce){
           return res.status(404).json({ error:"Person Not Found" });
        }
        res.status(200).json(responce);
    } catch(err){
       res.status(400).json({ error:"Internal Server Error" });
    }
});

router.delete("/:id",async (req,res)=>{
   try{
     const id = req.params.id;
     const responce = await Person.findByIdAndDelete(id);
     if(!responce){
      return responce.status(404).json({ error:"Person Not Found" });
     }
     res.status(200).json({ message:"person deleted successfully" });
   } catch(err){
     console.log("error", err);
     res.status(400).json({ error:"Internal Server Error" });
   }
});

module.exports = router;
