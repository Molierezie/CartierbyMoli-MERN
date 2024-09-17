

## HomeWork





this is my model for review and product

```jsx

import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
      user: {
      type: ObjectId,
      required: true,
      ref: "User",
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
    category: { type: ObjectId, ref: "categories", required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSchema);
export default Product;

```


this is addProductReview function

```jsx


export const addProductReview = asyncHandler(

  async(req, res)=>{
    
    try{

      const { rating, comment } = req.body

      const { id } = req.params

      const product = await Product.findById(id)


      if(product){


        const alreadyReview = product.reviews.find( (r)=> r.user.toString() === req.user._id.toString())

        if(alreadyReview){

          res.status(400)
          throw new Error('Product already reviewed')
        }

        const review = {

          name : req.user.username,
          rating : Number(rating),
          comment,
          user : req.user._id
        }

        product.reviews.push(review)
        
        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce( (acc, item) => item.rating + acc, 0) / product.reviews.length;


        await product.save()

        res.status(201).json({ message : 'Review added' })

      }else{

        res.status(404)
        throw new Error('Product not found')
      }

    }catch(err){

      console.error(err)
      res.status(500)
      throw new Error('Error')
    }
  }
)


```

this is my middleware for check ObjectId

```js

import { isValidObjectId } from "mongoose";

export const checkId = (req, res, next)=>{

    const { id } = req.params

    if(!isValidObjectId(id)){

        res.status(404)
        throw new Error('Invalid ID')
    }
    next();
}

```

this is my route path

```js

import express from "express";

import formidable from "express-formidable";

import { addProductReview,  } from "../controllers/productController.js";

// ------- Middleware -------
import { authentication, adminOnly } from "../middlewares/auth.js";
import { checkId } from "../middlewares/checkId.js";


const router = express.Router()


// ----------- REVIEWS ------------

// ADD REVIEW
router.post('/add-review/:id', authentication, checkId, addProductReview)


export default router
```

this is my endpoints in the front-end

```jsx

import {PRODUCT_URL, UPLOAD_URL} from "../constants"
import { apiSlice } from "../api/apiSlice";


export const productApiSlice = apiSlice.injectEndpoints({

    endpoints : (builder)=>({
        

        createReview : builder.mutation({

            query : (data)=>({

                url: `${PRODUCT_URL}/add-review/${data.productId}`,
                method: "POST",
                body: data,


            })
        }),

        getTopProducts: builder.query({
            query: () => `${PRODUCT_URL}/top-products`,
            keepUnusedDataFor: 5,
          }),
      
  
    })


})




export const {


    useCreateReviewMutation,
  
  } = productApiSlice;
```

this is my file ProductsTabs

```js

import React from 'react'

import { useState } from 'react'
import { useGetTopProductsQuery} from '@/redux/api/productApiSlice'
import { useSelector } from 'react-redux'

import Ratings from '@/pages/Products/Ratings'

const ProductTabs = ({ product , userInfo, rating, setRating, comment, setComment, submitHandler, isLoadingReview}) => {


    const [ activeTab, setActiveTab ] = useState(1)


    

    if(isLoadingReview) return 'Loading'

    const { data : topProducts, isLoading : isLoadingTopProducts, isError : isErrorTopProducts } = useGetTopProductsQuery()


     if(isLoadingReview || isLoadingTopProducts) return 'Loading'

     if(isErrorTopProducts) return 'Error'

     console.log(topProducts);
   


    const handleTab = (number)=>{

        setActiveTab(number)
    }


  

  return (

       <form onSubmit={submitHandler}>


                            <div className='flex flex-col'>

                                    <label htmlFor='rating'>Veuillez laissez un avis</label>

                                    <select
                                    id='rating'
                                    value={rating}
                                    required
                                    onChange={(e)=>setRating(e.target.value)}
                                    >

                                        <option value=''></option>
                                        <option value='1'>Très mauvais</option>
                                        <option value='2'>Mauvais</option>
                                        <option value='3'>Bien</option>
                                        <option value='4'>Très bien</option>
                                        <option value='5'>Super</option>


                                    </select>


                            </div>



                            <div>


                            <label htmlFor='comment'>Laissez un commentaire</label>

                            <textarea
                            id='comment'
                            value={comment}
                            rows={3}
                            required
                            name='comment'
                            onChange={(e)=>setComment(e.target.value)}
                            >


                            </textarea>

                            </div>


                            <button disabled={isLoadingReview} type='submit'>Ajouter</button>



                        </form>
  )

  

```

- See HomeWork 6 ratings & Comments

ADMIN - DELETE, UPDATE & GET FLOW

- understand providesTags & Invalidatestags

- form for product
  - new FormData()


- explication isLoading with the test page
- Restart favoritesSlice & explain , create an another Slice and explain the concept state & action.payload (response in redux Logic)
- write the line of code to Utils for LocalStorage
- main.jsx why for update path/:_id but for productDetails path/:id
- ratings & comments flow view the explanation of code and retry


# redux toolkit cache , keepUnusedFor 


## Definition KeepUnusedFor 

- The keepUnusedDataFor option in RTK Query controls how long the data remains in the cache after it is no longer used by any component. Adjusting this value affects both browser behavior and user experience in different ways

## example with keepUnusedDataFor: 5 and keepUnusedDataFor: 60.

### Browser behavior

#### keepUnusedDataFor: 5

**Caching**: The data fetched by the fetchProducts query will be kept in the cache for 5 seconds after the last component that was using it unmounts or stops using it.
**Cache Expiry**: If no component uses the fetchProducts query within 5 seconds, the cached data will be discarded.
**Refetching**: If a component re-queries fetchProducts after the 5-second window, a new request will be made to the server to fetch fresh data.

#### keepUnusedDataFor: 60

**Caching**: The data fetched by the fetchProducts query will be kept in the cache for 60 seconds after the last component that was using it unmounts or stops using it.
**Cache Expiry**: If no component uses the fetchProducts query within 60 seconds, the cached data will be discarded.
**Refetching**: If a component re-queries fetchProducts after the 60-second window, a new request will be made to the server to fetch fresh data.


## example with keepUnusedDataFor: 5 and keepUnusedDataFor: 60 with a app e-commerce

### With keepUnusedDataFor: 5:

A user navigates to the product listing page, fetching the product data.
The user navigates away to another page (e.g., product details) and returns after 10 seconds.
The product listing page makes a new API call to fetch the product data again.
Users see the most up-to-date product listings, but with a potential slight delay due to the new API call.

### With keepUnusedDataFor: 60:

A user navigates to the product listing page, fetching the product data.
The user navigates away to another page and returns after 30 seconds.
The product listing page uses the cached data, resulting in a faster load time.
Users see potentially slightly outdated product listings, but with a smoother navigation experience due to the reduced need for frequent API calls.


## Benefit of using redux toolkit query for the data catching

- Users are more likely to see fresh data because the cache duration is short. If there are frequent updates to the product data, users will benefit from seeing the latest information more often.

- Users navigating away and back to the component within 60 seconds will experience faster load times as the data will be served from the cache rather than making a new API call.

- La réduction du nombre d'appels à l'API se traduit par une diminution de la charge du serveur et du transfert de données, ce qui peut être bénéfique en termes de performances et de coûts, en particulier si l'API est soumise à des limites de taux ou à des coûts d'utilisation.

## inconvenient is the delay is long

Increased Load Times: If users navigate away and back to the component frequently (with intervals longer than 5 seconds), they may experience slightly longer load times due to the more frequent API calls.

--

Higher API Usage: More frequent API calls can increase server load and data transfer, which might be a consideration depending on the API's rate limits and performance constraints.


```jsx

import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCT_URL}`,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),

    createProduct: builder.mutation({
      query: (productData) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      providesTags: ["Product"],
    }),

    
  }),
});

export const {
    
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateReviewMutation,
 
} = productApiSlice;


```


# <font color="#c00000">Handle Error || Fix bug</font>

## <font color="#d83931">Problem connexion Server & Client </font>

### <font color="#d99694">[vite] http proxy error: /api AggregateError </font>


- ensure your back-end & front-end run at the same time
- at the end to thr url add'/'

- before
```js

export default defineConfig({
  plugins: [react()],
  server : {

    proxy : {
      "/api" : "http://localhost:5500",
      "/upload" : "http://localhost:5500"
    }
  }
})


```

- after



```jsx


const handleSubmit = ()=>{


  const res = await createReview({ id : productId, review, comment}).unwrap()

  try{

    if(res.error){

      toast.error(res.error)
    }else{

      toast.success('Thank you for our review !')
    }


  }catch{



  }


}



const { Object} = mongoose.schema.Type


const reviews = new schema({

  name : { type : String , required : true},
  description : { type : String , required : true},
  user : { type : Object, ref:'User'}

})


```