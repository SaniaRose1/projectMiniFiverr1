import express from  'express';
import bcrypt from "bcryptjs";
import User from  '../../models/Users.js';
import Task from '../../models/Tasks.js';
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, skill, rating, role } = req.body;

  try {
   
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists!" });
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

   
    const newUser = new User({
      name,
      email,
      password: hashedpassword,
      role   
    });

    if(role === "freelancer"){
      newUser.skill = skill;
      newUser.rating=rating;
    }

   const user =  await User.create(newUser);

    res.status(201).json({
      msg: "registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async(req,res)=>{
   const { email, password ,role} = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

   
    if (user.role !== role) {
      return res.status(403).json({ msg: "Wrong role selected" });
    }

   
    res.status(200).json({
        message:"Login successful",
        role: user.role,
       user
      }
    );

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post("/posts",async(req,res)=>{
  try{
    const newposts = new Task(req.body);
   await newposts.save();
   res.json(newposts);
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
  
})




router.get("/posts",async(req,res)=>{
  try{
    const posts = await Task.find();
    res.json(posts);
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
})

router.delete("/posts/:id",async(req,res)=>{
  try{
  
    await Task.findByIdAndDelete(req.params.id);
    res.json({message: "Deleted Successfully", id:req.params.id});
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
})





 export default router;