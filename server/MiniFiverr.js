import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";

import  authRoutes from './Routes/Api.js';
const app = express();
const port =5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/auth",authRoutes);

mongoose.connect("mongodb+srv://saniaRose:sania78609@cluster0.f4bf7ej.mongodb.net/miniFiverdb?retryWrites=true&w=majority",{family:4})
.then(()=>{console.log("Mongodb Atlas Connected Succesfully");
    app.listen(port,()=>{console.log(`Server is running on port ${port}`)});
})
.catch(error=> console.log(error));
