const express = require('express');
const bcrypt = require("bcryptjs");
const User = require('../models/Users');
const router = express.Router();

router.post('/register', async(req,res)=>{
    const {name , email , password , skill , rating , role} = req.body;
           
   try{
       
      if(role === ' poster '){
         const existingPoster = await  User.findOne({email});
         if(existingPoster){
            return res.statusCode(400).json({msg:"poster already existed!!"});
         }
         const salt = await bcrypt.genSalt(10);
      const hashedpassword =await bcrypt.hash(password,salt);

      const PosterUser = new User({
        name,
        email,
        password:hashedpassword,
        skill,
        rating:Number(rating)
      });
           
      await PosterUser.save();
      res.status(201).json({msg:"poster registered Succefully"});
    }
    else if(role === 'freelancer'){
         const existingFreelancer = await User.findOne({email});
         if(existingFreelancer){
            return res.status(400).json({msg:"freelancer already existed!!"});
         }
         const salt = await bcrypt.genSalt(10);
      const hashedpassword =await bcrypt.hash(password,salt);

      const FreelancerUser = new User({
        name,
        email,
        password:hashedpassword,
        skill,
        rating:Number(rating)
      });
           
      await FreelancerUser.save();
      res.status(201).json({msg:"freelancer registered Succefully"});
    }
  }
  catch(error){
     res.status(500).json({error: error.message});
  }

})

router.post("/login", async(req,res)=>{
   const {name , email, password , skill , rating} = req.body;
    try{
   if(role === 'poster'){
       const Poster = await User.findOne({email});
       if(!Poster)
        return res.status(400).json({msg:"Invalid poster Credential"});
    
    const isMatch = await bcrypt.compare(password,Poster.password);
    if(!isMatch)
        return res.status(400).json({msg:"Invalid poster password "});
  
    
    res.json({msg:`welcome poster  ${Poster.name} with skill ${Poster.skill} and with ratings ${Poster.rating}`});
}

 else if(role === 'freelancer'){
       const freelancer = await User.findOne({email});
       if(!freelancer)
        return res.status(400).json({msg:"Invalid freelancer Credential"});
    
    const isMatch = await bcrypt.compare(password,freelancer.password);
    if(!isMatch)
        return res.status(400).json({msg:"Invalid freelancer password"});
  
    
    res.json({msg:`welcome  freelancer ${freelancer.name} with skill ${freelancer.skill} and with ratings ${freelancer.rating}`});
}
   }
    catch(error){
      res.status(500).json({error: error.message});
    }
})

module.exports = router;