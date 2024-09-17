import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import asyncHandler from "express-async-handler";

// we import the sensitive variable from envVar
// we don't need to use dotenv.config() here because here we use enNVAR.JS
import { ENV_VARS } from "../config/envVar.js";


export const authentication = asyncHandler(async (req, res, next) => {
  
  // Read JWT from the 'jwt' cookie
  
  // we search in the header to the front-end if there is a cookie, we write cookies with 's' because 
  // in the header this is write with 's'

  let token;
  token = req.cookies.jwt;

  // we get the secret from envVar.js
  let secret =  ENV_VARS.JWT_SECRET;


  // We check if there is a cookie in the header or not
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }

    const decoded = jwt.verify(token, secret);
    // console.log('Decoded token:', decoded);
    // console.log('User ID from token:', decoded.userId);


  // check if the user exist in the database, we use 'userId' because in the token we have 'userId' in the frist parameter
  // in another words we store the token in the 'userId'

    req.user = await User.findById(decoded.userId).select("_id username email isAdmin"); 
    // console.log('User set in authenticate middleware:', req.user);
    // console.log('The user is admin ?' , req.user.isAdmin)


    // If the user doesn't exist in the database we send an error
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, user not found.");
    }

    // otherwise we continue and now the reqq.user is available in the entire app
    next();

  }
);



// we create another middlewar for the admin

export const adminOnly = asyncHandler(async (req, res, next) => {


  // now as I say in the previous middleware req.user is available in the entire app
  // So first of all we check if there an user ( user or admin) connected in the app

    if (!req.user || !req.user._id) {
        res.status(401);
        throw new Error("Authentication required");
    }

    // if there is someone connected, now we check if he is an admin or not
    
    if (!req.user.isAdmin){
      res.status(403);
      throw new Error("Not authorized as an admin");
    }

    // If the user is an admin we continue in the function inside the controller
    next();
});



