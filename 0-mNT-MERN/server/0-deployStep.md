
# Deploy

# Change a made

🔁

- change the place of uploads folder, I take it in the server folder

  // "server": "nodemon server/index.js",
    // "client": "npm run dev --prefix client",
    // "build": "concurrently \"npm run client\" \"npm run server\" "


    "dev": "NODE_ENV=development nodemon server/index.js",
    "start": " NODE_ENV=production node server/index.js",
    "build": "npm install && npm install --prefix client && npm run build --prefix client",

    
# brouillon

6H33,20s The mongo URI

combine server localhost:500 annd front-end localhost:5173 in the same domain

📸 as a programmer - How to build a Netflix Clone - 6H25min

## step 1 in server.js : convert the front-end to be our static asset 


1. import path

```js

import path from 'path'

```

2) `convert the front-end to be our static assets ` 

```js

if( 1️⃣ ENV_VARS.NODE_ENV === "production"){
  
 2️⃣ app.use(express.static(path.join(__dirname, "/client/dist")))


 3️⃣ app.get("*", (req, res)=>res.sendFile(path.resolve(__dirname, "client", "dist", "index.html")))
}

```

🔁 I add the folder env_var

- 1️⃣ `create a folder envVar.js`

    - we make this steps for convert front-end folder to be static assets and in production
    
    
- 2️⃣ ` convert front-end folder to be static assets and in production`

    - put enverything in the dist folder how ?
    - go in my folder client and run 'npm run build'
    - a dist folder appears
    - Go back in server.js
    - `__dirname`
    - that's means we are under the root, because this is the placr where we want running the app
    - So from this root => go to the front-end => go to the file 'dist'

-  3️⃣
    - under the dist we have a file 'index.htm' this is the file that we are returning
    - That's means if we are in the API routes handle it but if any other routes than htese you should show the React application


## step 2 - in package.json 

# brouillon

- when we deploy our app we are not going to have the node modules because we don't push to the github (very long file)

- the 1st npm install, install all the package to the folder "node_modules" 
- the 2nd npm install the depencies but this time for the front-end so set prefix, that's means run this command for the front-end
- When this step is done we also want to run the front-end
--

- When we are complete the scripts.build now we want start the app in the production mode sever 
- when we ran the dev (server) we add "NODE_ENV = developement"
- and when we start the app we add "NODE_ENV = production"

📍 root folder

- delete the folder node_modules and also for the production
- delete the folder dist in the front-end
- add gitignore in the __dirname root directy
- 





Hey this my multer file for upload image


import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs";

const router = express.Router();

// const uploadDir = "uploads";

const uploadDir = "./uploads"
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    
},

});


const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);

  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");


router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;

this is how I handle the upload in my index.js file

```js

import uploadRoutes from "./routes/uploadRoutes.js";

app.use("/api/upload", uploadRoutes);


const __dirname = path.resolve();
app.use("./uploads", express.static(path.join(__dirname + "./uploads")));

```

this is my structure of my project

- client
- server
    - config
    - controllers
    - routes
    - model
    - utils
    - middlewares
    - .env
- uploads


this is an example of product in mongodb

{
  "_id": {
    "$oid": "66b4d9c174d34a2678935bf2"
  },
  "name": "ALLIANCE LOVE",
  "image": "./uploads/image-1723141956075.png",
  "brand": "LOVE",
  "quantity": 200,
  "category": {
    "$oid": "66b4c6e00dddb8ee3dc348d2"
  }

}




Why When I'm going in the front-end I see all the data but not the images ?

## Question 1

What's the difference between these 2 syntax for delete , update etc ?

```js

export const deleteCategory = asyncHandler(


    async(req, res)=>{


            try{
                

                const { idCat } = req.params

                const catDelete = await Category.findById(idcat)

                if(!catDelete){

                    res.status(400)
                    throw new Error(`Error`)
                }

               1️⃣ await Category.DeleteOne({ _id : catDelete._id})
               2️⃣ await Category.FindByIdAndRemove({ _id : catDelete._id })
                
                res.status(200).json(`${captUpdate} is updated`)
                

            }catch(err){

                res.status(400)
                throw new Error
            }

    }
)


```


response


```js


  ✅ await Category.DeleteOne({ name : category.name})

           ❌ await Category.FindByIdAndRemove({ name : category.name})

```


updateOne can be used with any query, not just _id.
findByIdAndUpdate specifically requires an _id.


## Question 2

Hey this is my apiCategorySlice and this is my component jsx

🧩`apiSlice.jsx` file


```js

 deleteCategory : builder.mutation({

            query : (id)=>({

                url : `${CATEGORY_URL}/delete-category/${id}`,
                method : 'DELETE',
                
            })
        }),

```


🧩`compenenent.jsx` file


```jsx

const handleDeleteCategory = async () => {
    try {

      // same logic that handleUpdateCategory here we send only the id
      
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category delection failed. Tray again.");
    }
  };

```


why with this syntax the category is deleted correctly

1️⃣

```jsx

 const result = await deleteCategory(selectedCategory._id).unwrap();
 
```

2️⃣
but with this syntax the category isn't delete ?

```jsx

 const result = await deleteCategory({ id : selectedCategory._id}).unwrap();

```




🧩`apiCategorySlice.jsx` file


```jsx

    createCategory : builder.mutation({

            query : (data)=>({

                url : `${CATEGORY_URL}/create-category`,
                method : 'POST',
                body : data
            })
        }),

```


yes but with createCategory the query function expects to receive the id directly as its argument.
The two syntax works 

```jsx

   const result = await createCategory({ name : name }).unwrap();

    const result = await createCategory({ name : name }).unwrap();

```

but in the component I pass an object and it's works but for the delete it's not working



RESPONSE :


- RTK Query automatically serializes the argument passed to the mutation into the request body for POST, PUT, and PATCH methods. This means whether you pass an object or a primitive value, it will be correctly sent as the body.

For deleteCategory (DELETE request)

```jsx
deleteCategory: builder.mutation({
  query: (id) => ({
    url: `${CATEGORY_URL}/delete-category/${id}`,
    method: 'DELETE',
  })
}),


```

- DELETE requests typically don't have a body. The id is expected to be part of the URL, not the body. This is why passing an object doesn't work as expected.

- The key difference is in how RTK Query treats arguments for different HTTP methods:

For POST, PUT, PATCH: The entire argument is serialized as the request body.
For GET, DELETE: The argument is used to construct the URL or query parameters.




difference with invalidateTags and refetch() same purpose ?


## FORMIDABLE


without parse the json data or the urlencoded in the form when we try to send the information from the front-end to the back-end

we have this warning in the terminal

```terminal

Error: TypeError: Cannot destructure property 'name' of 'req.fields' as it is undefined.

```

### First Solution use Formidable inside specific routes


### Third solution use formidablemiddleware in index.js

Advantage to express-formidable middleware

multipart form data (usually used for file uploads).
URL-encoded form data (text fields in forms).
JSON data (although handling JSON is not its primary purpose).

So when you use express-formidable, the form data (both text and files) is parsed, and you can access:

Fields (text inputs) via req.fields.
Files via req.files.

```js
import express from 'express';
import formidableMiddleware from 'express-formidable';

const app = express();

// express-formidable automatically parses form data
app.use(formidableMiddleware());

app.post('/upload', (req, res) => {
  console.log(req.fields); // Text fields from the form
  console.log(req.files);  // Uploaded files from the form
  res.send('File uploaded!');
});


```


## Pathname Location

hey I work in a mern stack app my url in the front-end is this `http://localhost:5173/Test1`

here is my file in express.js

```js


export const Test2 = asyncHandler(


  async(req, res)=>{


    try{

      console.log(req.path);
      
    
    }catch(err){


      res.status(400)
      throw new Error
    }



  }
)

```

this is my file in  apiProductSlice in the front-end

```jsx
    getBrand : builder.query({

            query : () => ({

                url : `${PRODUCT_URL}/test-2`,
            })
        })

```

this is my file for the route

```jsx
  <Route path='Test1' element={<Test1 />} />

```

this is my component jsx

```jsx

import React from 'react'

import { useGetBrandQuery } from '../redux/api/productApiSlice'


const Test1 = () => {

 

  const { data : dataQuery, isLoading, error, refetch } = useGetBrandQuery()


  
  
  if(isLoading) return `Loading...`
  if(error) return `Error`
  
  
  console.log(dataQuery);

  return (
   


 <div>
   <h1>Hello test 1</h1>
 </div>
      
    
  )
}

export default Test1

```

Why when I am in the page with the url "http://localhost:5173/Test1"

the response in the log to the back-end is "/test-2" and not "/Test1" , I use the method req.path so I don't understand why I don't retrive the path of the url to the front-end ?


Yes but for the first page example I'm going to the page '/Test2'

the first time I get the good request here  return res.json(brandLove)

But after if I click to the page '/Test2' I have stil the same data return res.json(brandLove) and not  return res.json(brandPanthere) why ?



this is my file controller

```js
export const Test2 = asyncHandler(


  async(req, res)=>{


    try{

      const { frontendPath } = req.query

      const brandLove = await Product.find({ brand : 'TRINITY'})
      const brandPanthere = await Product.find({ brand : 'PANTHERE DE CARTIER'})


  
      switch (true) {
        case frontendPath === '/Test1':
         return res.json(brandLove)
         
        
        case frontendPath === '/Test2':
          return res.json(brandPanthere)
          
      
        default:
          break;
      }

  
    
    }catch(err){


      res.status(400)
      throw new Error
    }


  }
)

```

This is my file apiProductSlice 

```jsx
  getBrand : builder.query({

            query : () => ({

                url : `${PRODUCT_URL}/test?frontendPath=${encodeURIComponent(window.location.pathname)}`,
            })
        })


```


Ok it's cool it's works but I only add this and when I click in two url I have 2 different datra as I wish 

```js
const location = useLocation();
  const { data: dataQuery, isLoading, error } = useGetBrandQuery(location.pathname);


```

I don't include the frontend path in the query key , refetchOnMountOrArgChange,  as you ask me



Hey Here is my folder for add a review for a folder

this is my model

```js

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


this my function for the review


```js


export const addProductReview = asyncHandler(

  async(req, res)=>{
    
    try{

console.log('Request body:', req.body);
console.log('Product ID:', req.params.id);


      // we search the rating and comment from the front

      const { rating, comment } = req.body

       // we search a specific product by id
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


Why I have this error ? 
InternalServerError: stream is not readable

in the front-end

```jsx

   <form onSubmit={submitHandler} className='sm:bg-red-100 p-8 h-[40vh] w-[80%] flex flex-col justify-around'>


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
                            className='w-[100%]'
                            >


                            </textarea>

                            </div>


                         

                            <div 
                                    className="sm:w-[45vw] bg-red-700 mx-auto md:w-[30vw] lg:w-[20vw] h-[5vh] items-center text-white justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-black duration-300 cursor-pointer active:scale-[0.98]"
                            >
                            <button className="px-5 py-2">Confimer votre avis</button>
                            </div>



                        </form>

```

## Loading


hey this is my component Login.jsx

```jsx


const [ login, { isLoading : isLoadingLogin, error : errorLogin } ] = useLoginMutation();
if(isLoadingLogin ) return <h1>Chargement ...</h1>

return(


  <button 
          className='sm:h-[3rem] w-[40vw] rounded-full bg-red-700 text-white sm:text-[0.9rem] md:w-[25vw]'
     
          type="submit"

          >
            Conexion
          </button>

)


```


Why When I return the loading here when I try to connect I have this warning

'Rendered fewer hooks than expected. This may be caused by an accidental early return statement.'


but when I put the isLoading here in the jsx I don't have the warning and the browsers works well ?

```jsx


const [ login, { isLoading : isLoadingLogin, error : errorLogin } ] = useLoginMutation();


return(


  <button 
          className='sm:h-[3rem] w-[40vw] rounded-full bg-red-700 text-white sm:text-[0.9rem] md:w-[25vw]'
     
          type="submit"

          >
            {isLoadingLogin ? 'Chargement...' : 'Connexion'}
          </button>

)


```

Response :

Always place the return isLoading after any hook that be used in the component
Here, you're conditionally returning early based on isLoadingLogin. This means that on some renders (when isLoadingLogin is true), the component will return before reaching any hooks that might be used in the main return statement. This violates the rules of hooks because the number of hooks called can vary between renders.

## Use Later

// Here we use the feature provided by react-router-dom serach why ?
    // Because if
    // const  { search } = useLocation();
    // const sp = new URLSearchParams(search);
    // const redirect = sp.get("redirect") || "/login"

      // useEffect(() => {

    //   userInfo && navigate(redirect);

    // }, [navigate, redirect, userInfo]);


    ```jsx




const ProductDetails = ()=>{



 const { id : ProductId } = useParams


 const { data : productUpdateOrDelete , isLoading , error, refetch} = useProductMutation(ProductId)


 const [ Update]


if(isLoading) return <h1> Chargement </h1>
if(error) return <h2> Error </h2>



const [ name, setName] = useState(productUpdateOrDelete?.name || '')



const handleUpdate = async (e)=>{



      const form = new FormData()

      form.append('name', name )
      



      const res = await Update{
        id : ProductId,
        form
      }


      if(res.?error){

        toast.error(res.?error)
      }esle{

        toast.success()
        refetch()
        navigate()
      }

    
  }

}


  return(


    <form>



    <select 
    onChange={(e)=>setCategeries(e.target.value)}>



      {categories?.map(()=>(


        <option
        value={categories}
        >
  
  
        </option>


      ))}



    </select>

    </form>

  )


export default ProductDetails
}



    ```


## useParams & id syntax Id in main.jsx



Ok I'm using useParams hook for get a specific product


Why When I writ this syntax I get the information in the browser ? 

```jsx

  const params = useParams()
  const { data : product } = useFetchProductQuery(params._id)

```

But When I write with this syntadx I don't get the information in the browser ?

```jsx

 const { id : productId } = useParams()

   const { data : product } = useFetchProductQuery(productId)

```

### Response

The difference in behavior you're experiencing is likely due to how the useParams hook is returning the parameter and how you're destructuring it. Let's break it down:

Working syntax:
jsx

Copy
const params = useParams()
const { data : product } = useFetchProductQuery(params._id)
In this case, useParams() returns an object with all URL parameters. If your route is defined as something like /product/:_id, then params will be an object like { _id: "actualProductId" }. So params._id correctly accesses the product ID.

Non-working syntax:
jsx

Copy
const { id : productId } = useParams()
const { data : product } = useFetchProductQuery(productId)
Here, you're trying to destructure an id property from the params object. However, if your route is defined with :_id (note the underscore), then there is no id property to destructure, which is why productId ends up being undefined.

To fix the second syntax, you need to make sure the destructuring matches your route parameter name. If your route uses :_id, then use:

jsx

Copy
const { _id: productId } = useParams()
const { data : product } = useFetchProductQuery(productId)
Or if your route uses :id, then your original destructuring would work:

jsx

Copy
const { id: productId } = useParams()
const { data : product } = useFetchProductQuery(productId)
The key is to ensure that the name you're destructuring from useParams() matches exactly with how you've defined it in your route.

To avoid these issues, you can also use the first syntax (which is working for you) as it's more flexible and doesn't depend on knowing the exact parameter name:

jsx

Copy
const params = useParams()
const { data : product } = useFetchProductQuery(params.id || params._id)
This way, it will work whether your route uses :id or :_id.

Remember to check your route definitions to ensure they match how you're trying to access the parameters in your component.



## useEffect

Why when I put an empty array in the useEffect I don't see the info in the browser ? But If I put an array of product it's works ?

## Effect behavior with isLoading and useEffect


```js


const ProductUpdate = () =>{


  const navigate = useNavigate()

  // const params = useParams()

  const { id : productId } = useParams()

   const { data : product , isLoading, error} = useFetchProductQuery(productId)

  //  const { data : product } = useFetchProductQuery(params._id)

   const { data : categories = []} = useGetAllCategoryQuery()

   const imageRef = useRef(null)

   const { handleImageChange, imgUrl, setImgUrl} = usePreviewImg();

   useEffect(()=>{

    if(imgUrl){
      setImage(imgUrl)
    }


  }, [imgUrl])

  if(isLoading) return `Loading...`

  if(error) return `Error`



   const [uploadProductImage] = useUploadProductImageMutation();
   const [updateProduct] = useUpdateProductMutation()
   const [deleteProduct] = useDeleteProductMutation()


   console.log(product);
   

  const [ name, setName ] = useState(product ? product.name : "")
  const [ price, setPrice ] = useState("")
  const [ image, setImage ] = useState(product?.image || "")
  const [description, setDescription] = useState("");
  const [ category, setCategory ] = useState("")
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e) =>{

  e.preventDefault()

  try{

    const formData = new FormData()

    formData.append('description', description)
    formData.append('name', name)
    formData.append('image', imgUrl)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('quantity', quantity)
    formData.append('brand', brand)
    formData.append('countInStock', stock)


    const res = await updateProduct({ id : params._id, formData });

    if(res?.error){

      console.error
      toast.error( res.error, 'something wrong')
      
    }else{

      toast.success(`Product is updated`)
      setImage(res?.image)
      navigate('/admin/all-product-list')

    }


  }catch(error){

     console.error
      toast.error('something wrong')
  }
}


```

Why when I add 

```jsx

 if(isLoading) return `Loading...`

  if(error) return `Error`
```

I have this error ? 'Rebdered more hooks than during prebious render'






Hey I buuld a e-commerce whith mern stack rtq query

this is my cartSlice file 

```jsx

import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "@/utils/cart";




const localStorageCart = localStorage.getItem('cart')

const initialState = localStorageCart ? JSON.parse(localStorageCart) : { cartItems : [], itemsPrice : 0  }


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
  
    addToCart: (state, action) => {
      

      const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
      };
      

      const { user, rating, numReviews, reviews, ...item } = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

  
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      const updateCart =(state, item )=>{

        const transform
        state.itemsPrice = addDecimals(

          state.itemsPrice.reduce((acc, item) => acc + item.price * item.quantity, 0)
        );

      

        // addToLocalStorage
   
        localStorage.setItem('cart', JSON.stringify(state));

        return state
      }

      updateCart(state, item)


    },

```

this is my productDeatils components

```jsx



ProductsDetails = ()=>{



  const { id: productId} = useParams()

    const { data : products, isLoading, isError } = useGetProductDetailsQuery(productId)

   const handleToCart = ()=>{

        dispatch(addToCart({
            ...products,
            quantity
        }))
        navigate('/cart')

    }

    return(


             <button
                                    onClick={handleToCart}
                                  
                                    className='flex justify-start items-center gap-4'>

                                    <FaShoppingCart size={38} className='text-black'/>
                                    <p>Ajouter au panier</p>

                                    </button>

    )

}





```


Why When I try to add a product in the cart in the browser I stay on the same page I'm not redirect in the cart
and I have this error message 'state2.itemsPrice.reduce is not a function
    at updateCart2 (cartSlice.jsx:114:28)
    at addToCart (cartSlice.jsx:126:7)'



  this is my components cart.jsx


  ```jsx




const Cart = () => {

    
    const dispatch = useDispatch()
    const navigate = useNavigate()


    // const cart = useSelector((state)=> state.cart)
    // cartItem

    const cart = useSelector((state)=> state.cartItem)

    const { cartItems } = cart


    console.log(cartItems);

    const handleCartQty = (product, quantity)=>{

        dispatch(addToCart({...product, quantity}))
    }

    const handleRemoveCart = (id)=>{


        const confirm = window.confirm('Are you sure you want to delete this item ?')

        if(confirm){
            dispatch(removeFromCart(id))
        }
       
    }

    const checkoutHandler = () => {
        navigate("/login?redirect=/user/shipping");
      };
    

    return(

 <>

        <GoBackHome/>

        <section className='h-[200vh] w-full flex flex-col justify-center items-center gap-y-10'>


       
            <div className='h-[10vh] w-full flex justify-center items-center'>
                <h3 className='text-red-500 font-bold text-[2.5rem]'>Mon Panier</h3>
            </div>

        {cartItems.map((item)=>(


        <div key={item._id} className='sm:h-[50vh] w-[55vw] flex flex-col justify-evenly items-start p-4 border-4 border-solid border-red-200'>

            <img src={item.image} alt={item.name} className='sm:h-[20vh] w-[30vw] mx-auto lg:h-[25vh] lg:w-[20vw]'/>


            <div className='flex justify-around items-center gap-x-2 lg:gap-x-20'>

                <p className='text-[1rem] max-w-[20vw]'>{item.name}</p>
              


                <div className='bg-blue-500 flex justify-center items-center'>
                <select
            className='sm:h-[1.5rem w-[5vw] md:w-[15vw]'
            value={item.quantity}
            onChange={(e)=>handleCartQty(item, Number(e.target.value))}
            >
                { [...Array(item.countInStock).keys().map((x)=>(

                <option
                disabled={item.countInStock === 0}
                key={x + 1}
                value={x + 1}
                >
                    {x + 1}
                </option>


                ))]}

            </select>

            <FaTrash size={30} onClick={()=>handleRemoveCart(item._id)}/>

            </div>

            </div>
            <p className='text-[0.8rem]'>Collection : {item.brand}</p>
            <p className='text-[0.8rem] font-bold'>Prix un produit : {item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
           

    

        </div>
            
                
                ))}

                <div>

                <p>Quantité : {cartItems.reduce((acc, item)=> acc + item.quantity, 0)}</p>
                <p>Prix Totale : {cartItems.reduce((acc, item)=> acc + item.quantity * item.price, 0)}</p>
              
                    <button
                    disabled={cartItems.length === 0}
                     onClick={checkoutHandler}
                      className="bg-red-500 items-center text-white justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-red-500 duration-300 cursor-pointer active:scale-[0.98]">Commander
                      </button>
                    

                </div>
                
                
                </section>
    
    </>

    )


}

  ```

<!--   this is my store function remove item in cartSlice -->

  ```jsx

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return state;
    },

  ```

  Why when i remove an item in my browser it's disparait but when I refresh my page he is still in the cart ?