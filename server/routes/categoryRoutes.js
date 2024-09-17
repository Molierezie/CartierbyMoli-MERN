import express from "express";



// the routes for the function related to the ctegory

import {
createCategory, 
updateCategory,
deleteCategory,
getAllCategory,
getOneCategory } from "../controllers/categoryController.js";


// we add in the path beween the route and the function the specific middleware
import { authentication, adminOnly } from "../middlewares/auth.js";

const router = express.Router();



//---------------------------------------------------------
// --------------------- GET CATEGORY--- ------------------
//---------------------------------------------------------

// GET ALL CATEGORIES
router.get('/all-categories', getAllCategory)

// GET ONE CATEGORY
router.get('/get-category/:id' , getOneCategory)


//---------------------------------------------------------
// --------------------- CRUD ADMIN TASK ------------------
//---------------------------------------------------------


// CREATE CATEGORY
router.post('/create-category', authentication, adminOnly,  createCategory)

// UPDATE CATEGORY

router.put('/update-category/:id', authentication, adminOnly, updateCategory)

// DELETE CATEGORY
router.delete('/delete-category/:id', authentication, adminOnly, deleteCategory)


export default router