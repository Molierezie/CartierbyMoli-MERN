# <font color="#00b0f0">1️⃣ -  Back-end CRUD</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

### <font color="#95b3d7">1 - Code before</font>

🧩 in productModel

```js


```

### <font color="#95b3d7">1 - Task</font>

- a
- b
- c 

### <font color="#4f81bd">1  - Solution ✅ </font>

#### <font color="#b2a2c7">🧩 in productModel </font>

##### <font color="#a5a5a5">💻 - Code</font>

```js
import mongoose from "mongoose";
1️⃣ const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },  user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    2️⃣  ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: ObjectId, ref: "Category", required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `elementOfCode`

	- 

- 2️⃣ - `elementOfCode`

	- 


#### <font color="#b2a2c7">🧩 in productRoutes</font>

##### <font color="#a5a5a5">💻 - Code</font>

```js
import express from "express";

1️⃣ import formidable from "express-formidable";

import { createProduct, updateProduct, deleteProduct, getAllProduct, getOneProduct} from "../controllers/productController.js";
import { authentication, adminOnly } from "../middlewares/auth.js";


const router = express.Router()

// CREATE PRODUCT
router.post('/create-product', authentication, adminOnly, formidable(), createProduct)

// UPDATE PRODUCT
router.put('/update-product/:id', authentication, adminOnly, formidable(), updateProduct)

// DELETE PRODUCT
router.delete('/delete-product/:id', authentication, adminOnly, deleteProduct)

// GET ALL PRODUCTS
router.get('/get-products', authentication, adminOnly, getAllProduct)

// GET ONE PRODUCT
router.get('/get-product/:id', authentication, adminOnly, getOneProduct)


export default router
```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `formidable()`

	- 
--


#### <font color="#b2a2c7">🧩 in productController</font>

##### <font color="#a5a5a5">💻 - Code</font>

```js
import Product from "../models/productModels.js";
import asyncHandler from "express-async-handler";


export const createProduct = asyncHandler(

    async(req, res)=>{

        try {

            
        
            const { name, description, quantity, image, category, price, brand } = req.fields

            console.log(req.fields);

            switch (true) {
                case !name:
                  return res.json({ error: "Name is required" });
                case !brand:
                  return res.json({ error: "Brand is required" });
                case !description:
                  return res.json({ error: "Description is required" });
                case !price:
                  return res.json({ error: "Price is required" });
                case !category:
                  return res.json({ error: "Category is required" });
                case !quantity:
                  return res.json({ error: "Quantity is required" });
                  case !image:
                    return res.json({ error: "image is required" });
              }
          

            const addProduct = new Product({...req.fields})

            await addProduct.save()

            res.status(200).json(`${addProduct} is created`)



        } catch (error) {
            res.status(400)
            throw new Error(error)
            
        }
    }
)


export const updateProduct = asyncHandler(

    async(req, res)=>{

        try {

            
            const { id } = req.params
        
            const { name, description, quantity, image, category, price, brand } = req.fields

            console.log(req.fields);

            switch (true) {
                case !name:
                  return res.json({ error: "Name is required" });
                case !brand:
                  return res.json({ error: "Brand is required" });
                case !description:
                  return res.json({ error: "Description is required" });
                case !price:
                  return res.json({ error: "Price is required" });
                case !category:
                  return res.json({ error: "Category is required" });
                case !quantity:
                  return res.json({ error: "Quantity is required" });
                  case !image:
                    return res.json({ error: "image is required" });
              }
          

            const product = await Product.findByIdAndUpdate(

                id,
                { ...req.fields},
            1️⃣   { new: true }
            )

            await product.save()
            
            res.status(200).json(`${product} is updated`)


        } catch (error) {
            res.status(400)
            throw new Error(error)
            
        }
    }
)



export const deleteProduct = asyncHandler(

    async(req, res)=>{

        try {

            
            const { id } = req.params
        
            const displayRes = await Product.findById(id).select("name")

            await Product.findByIdAndDelete(id)

       
            res.status(200).json(`${displayRes} is deleted`)


        } catch (error) {
            res.status(400)
            throw new Error(error)
            
        }
    }
)


2️⃣ export const fetchProducts = asyncHandler(

    async(req, res)=>{

        try {

          

        const keywords = req.query.keyword ? {

          name : {
            $regex : req.query.keyword,
            $option : "i" 
          }

        }

        : {};

        const count = await Product.countDocuments({...keywords});
            const products = await Product.find({keyword}).limit(6);

            res.json({

                products,
                page : 1,
                pages : math.Ceil(count/6),
                hasMore : false
              
            })



        } catch (error) {
            res.status(500)
            throw new Error(error)
            
        }
    }
);


3️⃣ export const getProducts = asyncHandler(

  async(req, res)=>{

      try {

          const { id } = req.params

          const product = await Product.find({}).populate("categories").limite(10).sort({createdAt : -1})

          if(!product){

              res.status(404)
              throw new Error("Products not found")
          }
     
          return res.status(200).json(product)


      } catch (error) {
          res.status(400)
          throw new Error(error)
          
      }
  }
)


export const getOneProduct = asyncHandler(

    async(req, res)=>{

        try {

            const { id } = req.params

            const product = await Product.findById(id).select("name")

            if(!product){

                res.status(400)
                throw new Error("Product not found")
            }
       
            res.status(200).json(`${product}`)


        } catch (error) {
            res.status(400)
            throw new Error(error)
            
        }
    }
)
```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `{ new : true}`
--

	- **Return the Updated Document**: By default, findByIdAndUpdate returns the document as it was before the update. If you want to get the document after the update has been applied, you need to set { new: true }.
  - **Begavior without** : If you didn't include { new: true }, findByIdAndUpdate would return the original document before it was updated. This might not be useful if you need the updated document to, for example, confirm the changes or send the updated data back to the client.

--

- 2️⃣ - `fetchProducts`
- `req.query`
    -  is an object that contains the query string parameters from the URL of the HTTP request.
- `Query string`
    -  Query string parameters are the part of a URL that comes after the ? character. They are typically used to pass data to the server, such as search criteria, pagination information, or filters.

- <span style="background:#d3f8b6"><font color="#00b050">example</font></span>

    - `http://example.com/products?keyword=laptop&category=electronics`

    - The query string is <span style="background:#b1ffff"><font color="#002060">keyword=laptop&category=electronics</font></span> 
- `$regex`
  - if `req.query.keyword` exists : It creates a MongoDB query object that uses a regular expression ($regex) to match the name field of the products
-  `$option : "i"`
makes the regex case-insensitive, meaning it will match keyword regardless of case (e.g., "Laptop" will match "laptop", "LAPTOP", etc.).

- `db.countDocuments`
Counts the number of products that match the keyword criteria.

- `pages: Math.ceil(count / pageSize)`
  - The total number of pages, calculated by dividing the total number of products (count) by the number of products per page (pageSize), and rounding up.

- `hasMore`
  - A flag indicating if there are more pages of products. Here it is hardcoded to false.

--

3️⃣ - `getProducts`

- **here** `await Product.populate('categories')`
- `db.populate()`
  - This method is used to automatically replace the specified path in the document (in this case, category) with documents from a related collection.
- `db.populate('categories')`
  - The path to be populated. Assuming that each product has a reference (like a foreign key) to a document in the Category collection, .populate("category") will fetch the complete Category document(s) that correspond to the category reference in each Product document.
- <span style="background:#d3f8b6"><font color="#00b050">Example</font></span>
  - 🧩`ProductModels` 
  - ```js

      {
       "_id": "productId",
      "name": "Product Name",
       "category": "categoryId"
      }
    

  - After .populate("category"), it will look like this:
  ```js
  {
  "_id": "productId",
  "name": "Product Name",
  "category": {
    "_id": "categoryId",
    "name": "Category Name",
    // other category fields
  }
  }



```js



export const fetchTopProduct = asyncHandler(
  async(req, res)=>{

    try{

       const topProduct = await Product.find({}).sort({ rating : -1}).limit(6)

       res.status(200).json(topProduct)

    }catch(err){

      res.status(400)
      throw new Error('erro")
    }
  }
)





```