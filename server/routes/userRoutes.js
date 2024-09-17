import express from "express";

// import Function for the user
import {
createUser,
loginUser,
logoutCurrentlyUser,
getAllUser,
updateProfile,
deleteUser,
getOneUser,
AdminEditUser} from "../controllers/userController.js";

// MIDDLEWARE

import {authentication, adminOnly} from "../middlewares/auth.js";

const router = express.Router();

//---------------------------------------------------------
// -------------- REGISTER - LOGIN - LOGOUT ---------------
//---------------------------------------------------------

// CREATE USER
router.post("/create-user", createUser) 

// LOGIN USER
router.post("/login-user", loginUser) 

// LOGOUT CURRENTLY USER
router.post("/logout-user", logoutCurrentlyUser)

//---------------------------------------------------------
// ---------------------- USER TASK -----------------------
//---------------------------------------------------------


// UPDATE USER PROFILE
router.put("/update-profile", authentication, updateProfile )

//---------------------------------------------------------
// --------------------- ADMIN TASK -----------------------
//---------------------------------------------------------


// CREATE ALL USERS
router.get("/all-users",authentication, adminOnly, getAllUser)

//GET AN USER 
router.get("/get-user/:id", authentication, adminOnly, getOneUser)

//DELETE USER 
router.delete("/delete-user/:id", authentication, adminOnly, deleteUser)

//UPDATE USER 
router.put("/update-user/:id", authentication, adminOnly, AdminEditUser)




export default router