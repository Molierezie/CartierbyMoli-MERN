import express from "express";
import formidable from "express-formidable";


// the routes for the function related to the product

import { 
createProduct,
updateProduct,
deleteProduct,
fetchOneProduct,
getProducts,
addProductReview,
fetchTopProduct,
fetchNewProduct,
fetchBrandLove,
getProductByCollection,
getProductByBrand} from "../controllers/productController.js";


// we add in the path beween the route and the function the specific middleware

import { authentication, adminOnly } from "../middlewares/auth.js";
import { checkId } from "../middlewares/checkId.js";


const router = express.Router()



//---------------------------------------------------------
// --------------------- CRUD ADMIN TASK ------------------
//---------------------------------------------------------


// CREATE PRODUCT
router.post('/create-product', authentication, adminOnly, formidable(), createProduct)

// UPDATE PRODUCT
router.put('/update-product/:id', authentication, adminOnly, formidable(),  updateProduct)

// DELETE PRODUCT
router.delete('/delete-product/:id', authentication, adminOnly, deleteProduct)


//---------------------------------------------------------
// ---------------------- GET PRODUCTS ---------------------
//---------------------------------------------------------

// GET ONE PRODUCT
router.get('/fetch-product/:id',  fetchOneProduct)

// GET ALL PRODUCTS
router.get('/all-products',  getProducts)

// GET TOP PRODUCTS
router.get('/top-products',  fetchTopProduct)

// GET NEWEST PRODUCTS
router.get('/new-products',  fetchNewProduct)



//---------------------------------------------------------
// ------------------------ REVIEWS -----------------------
//---------------------------------------------------------


// ADD REVIEW
router.post('/add-review/:id', authentication, checkId, addProductReview)



//---------------------------------------------------------
// --------- GET PRODUCT BY SPECIFIC FILTER ---------------
//---------------------------------------------------------


// GET PRODUCT WITH BRAND : LOVE
router.get('/fetch-love', fetchBrandLove)

// GET PRODUCT BY FILTER WITH SPECIFIC CATEGORY / COLLECTION
router.get('/get-collection-product/:idCat', getProductByCollection)

// GET PRODUCT BY FILTER WITH SPECIFIC BRAND
router.get('/get-brand-product', getProductByBrand)


export default router


