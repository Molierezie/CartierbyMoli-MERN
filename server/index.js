
// Package
import path from "path";
import express from "express";


import {v2 as cloudinary} from "cloudinary";
import cookieParser from "cookie-parser";

// import formidableMiddleware from 'express-formidable';


// -------------- Routes -----------------
import userRoute from "./routes/userRoutes.js";
import categoryRoute from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoutes.js";


// Connection DB
import connectDB from "./config/db.js";

//utils
// import dotenv from "dotenv";
import morgan from "morgan";

// we store all the sensitive variablec(.env) in this
import { ENV_VARS } from "./config/envVar.js";




morgan("dev")


const port = ENV_VARS.PORT || 5500;


// we config cloudinary here for connect with our account 

cloudinary.config({

  cloud_name: ENV_VARS.CLOUDINARY_NAME,
  api_key: ENV_VARS.CLOUDINARY_API_KEY,
  api_secret: ENV_VARS.CLOUDINARY_API_SECRET

})


const app = express();


app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())

// app.use(formidableMiddleware());

app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);





const __dirname = path.resolve();


if(ENV_VARS.NODE_ENV === "production"){

  app.use(express.static(path.join(__dirname, "/client/dist")))


  app.get("*", (req, res)=>res.sendFile(path.resolve(__dirname, "client", "dist", "index.html")))
}


app.listen(port, ()=>{

  console.log(`server is running on port ${port}`)
  connectDB()
})
