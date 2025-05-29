const express = require("express");
const router = express.Router();
const Person = require("../models/person");
const { generateToken:jwtToken, jwtAuthMeddleware } = require("../Auth/jwtToken");
const multer = require("multer");


//this is for file upload in server folder uploads
{/*}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
*/}



const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage }); // Use memory storage for file uploads
router.post("/register", upload.single('photo'), async (req, res) => {
  try {
    const data = req.body;
    data.photo = req.file ? req.file.buffer.toString("base64") : null; // Get the file path if uploaded
    const newPerson = new Person(data);
    const responce = await newPerson.save(data);
    const token = jwtToken({_id: responce._id, username: responce.username });
    res.status(200).json({ responce, token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const person = await Person.findOne({ username });
    if (!person) {              
      return res.status(404).json({ error: "User not found" });
    }   
    const isMatch = await person.comparePassword(password);   
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }
    const token = jwtToken(person);
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ error: "Internal Server Error" });
  }
});

router.get("/getData", jwtAuthMeddleware, async (req, res) => {
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
