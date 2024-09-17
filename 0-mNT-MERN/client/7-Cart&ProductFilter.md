# Bouillon

# HomeWork

- add the file addToCart and Productdetails
- add the UI with map 
- add the functionnality in the map for handle add to cart
- add the method for add number of item in UI

# HomeWork 15 aout

- create UI for cart with map
- add the quantity with the array count in stock in the map
- create the function for remove



# <font color="#00b0f0">1️⃣ -  AddToCart</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

### <font color="#95b3d7">1 - Code before</font>

`Code Before & Task`

```jsx


initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) ? { cartItems : [], address : {}, }
reducers : {


    addToCart : (state, actions )=>{


        { comment, ratings, ...items } = actions.payload


        const itemsAlready = state.cartItems.find( (cart) => cart._id = action.payload._id )

        
        if(itemsAlready){

            state.cartItems.map((x) => x._id === itemsAlready ? items : x )
        }else{

            state.carteItems = [...state.cartItems, ...items]
        }
    }
}








```













### <font color="#4f81bd">1  - Solution ✅ </font>

#### <font color="#b2a2c7">🧩 - feature/cart/cartSlice.jsx </font>

##### <font color="#a5a5a5">💻 - Code</font>

```js


import { createSlice } from "@reduxjs/toolkit";

const localStorageCart = localStorage.getItem('cart')

const initialState = localStorageCart ? JSON.parse(localStorageCart) : { cartItems : [], shippingAddress : {}, paypalMethod : 'Paypal' }

const cartSlice = createSlice({

    name : 'cart',
    initialState,
    reducers : {


        addToCart : (state, action)=>{

           1️⃣ const { user, rating, numReviews, reviews, ...item } = action.payload;

           2️⃣ const existItem = state.cartItems.find((x)=>x._id === item._id);

           3️⃣ if(existItem){

                state.cartItems = state.cartItems.map((x)=> x._id === existItem._id ? item : x)
            }else{

                state.cartItems = { ...state.cartItems, ...item }
            }

        },
    } 
})

export const {
    addToCart,
   
  } = cartSlice.actions;
  
  export default cartSlice.reducer;

```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ `rest parameter for remove`

	- Here, the code destructures the payload to remove user, rating, numReviews, and reviews from the item object, leaving only the necessary product details in item.

- 2️⃣ `existItem`

	-  This checks if the item you're trying to add to the cart is already present in the cart.
    - This line looks through the cartItems array and finds the first item (x) that has the same _id as the new item you want to add. If such an item is found, existItem will be that item; otherwise, it will be undefined.

    - `why use method find and not map here` ? 
        - We use find here because we want to check if an item with the same _id already exists in the cart. The find method returns the first element in the array that satisfies the provided testing function. If no element satisfies the testing function, it returns undefined.
This is efficient because find stops searching as soon as it finds a match, whereas map would unnecessarily go through the entire array

- 3️⃣ `Condition if : items already exists`

    ```js

    [
    { _id: '1', name: 'Product 1', quantity: 1 },
    { _id: '2', name: 'Product 2', quantity: 1 }
    ]

    ```

    - If you try to add a new item with _id: '2' (already in the cart), the code will.
        - Find existItem: The item with _id: '2' already exists
        - Update the cart: The map function replaces the old item with _id: '2' with the new one.
  
    - `why use method map and not find here` ? 
        - We use map here because we want to create a new array with the updated item. The map method creates a new array with the results of calling a provided function on every element in the array. In this case, if the item's _id matches the existItem._id, we replace it with the new item; otherwise, we keep the original item.
        We can't use find here because find only returns a single element, whereas we need to update the entire array.

#### <font color="#b2a2c7">🧩-  in utils/cart.js </font>


- I want create the file for update the cart 

##### <font color="#a5a5a5">💻 - Code</font>

```js



```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `elementOfCode`

	- 



## <font color="#492d050">Question about this topic</font>

### <font color="#c3d69b">Question 1</font>

Is there possible to hide the password in the payload of the browser ?

#### answer

type="password" only cosmetically hides the password. The input value is always accessible via JS (using it's .value property). So when someone opens DevTools, he or she will be able to get the password regardless.




# <font color="#c00000">Handle Error || Fix bug</font>

## <font color="#d83931">Server | Port </font>

### <font color="#d99694">Server | Port </font>

```js


import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "@/utils/cart";


const localStorageCart = localStorage.getItem('cart')

const initialState = localStorageCart ? JSON.parse(localStorageCart) : { cartItems : [], shippingAddress : {}, paypalMethod : 'Paypal' }

const cartSlice = createSlice({



    name : 'cart',
    initialState,
    reducers : {


        addToCart : (state, action)=>{


            const { user, rating, numReviews, reviews, ...item } = action.payload;

            const existItem = state.cartItems.find((x)=>x._id === item._id);

            if(existItem){

                state.cartItems = state.cartItems.map((x)=> x._id === existItem._id ? item : x)
            }else{

                state.cartItems = { ...state.cartItems, ...item }
            }

            return updateCart(state, item)
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
          },
      
          saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
          },
      
          savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
          },
      
          clearCartItems: (state, action) => {
            state.cartItems = [];
            localStorage.setItem("cart", JSON.stringify(state));
          },
      
          resetCart: (state) => (state = initialState),
    
    } 
})

export const {
    addToCart,
    removeFromCart,
    savePaymentMethod,
    saveShippingAddress,
    clearCartItems,
    resetCart,
  } = cartSlice.actions;
  
  export default cartSlice.reducer;

```



Hey I try to handle the cart in my project

this is my utils/cart.js file


export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
  export const updateCart = (state) => {
    // Calculate the items price
    state.itemsPrice = addDecimals(
      state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  
    // Calculate the shipping price
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  
    // Calculate the tax price
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  
    // Calculate the total price
    state.totalPrice = (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
    ).toFixed(2);
  
    // Save the cart to localStorage
    localStorage.setItem("cart", JSON.stringify(state));
  
    return state;
  };

  this is my redux/features/cart/cartSlice file 


import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "@/utils/cart";


const localStorageCart = localStorage.getItem('cart')

const initialState = localStorageCart ? JSON.parse(localStorageCart) : { cartItems : [], shippingAddress : {}, paypalMethod : 'Paypal' }

const cartSlice = createSlice({



    name : 'cart',
    initialState,
    reducers : {


        addToCart : (state, action)=>{


            const { user, rating, numReviews, reviews, ...item } = action.payload;

            const existItem = state.cartItems.find((x)=> x._id === item._id);

            if(existItem){

                state.cartItems = state.cartItems.map((x)=> x._id === existItem._id ? item : x)
            }else{

                state.cartItems = { ...state.cartItems, ...item }
            }

            return updateCart(state, item)
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
          },
      
          saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
          },
      
          savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
          },
      
          clearCartItems: (state, action) => {
            state.cartItems = [];
            localStorage.setItem("cart", JSON.stringify(state));
          },
      
          resetCart: (state) => (state = initialState),
    
    } 
})

export const {
    addToCart,
    removeFromCart,
    savePaymentMethod,
    saveShippingAddress,
    clearCartItems,
    resetCart,
  } = cartSlice.actions;
  
  export default cartSlice.reducer;

  this is my store 

  import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoriteReducer from "./features/favorites/favoriteSlice";
import cartReducer from "./features/cart/cartSlice";
import { getFavoriteFromLocalStorage } from "@/utils/localStorage";
import { setupListeners } from "@reduxjs/toolkit/query/react";


// import favoritesReducer from "../redux/features/favorites/favoriteSlice";
// import { getFavoritesFromLocalStorage } from "@/utils/localStorage";



const initialFavorites = getFavoriteFromLocalStorage() || []

const store = configureStore({

    reducer : {
       
        api : apiSlice.reducer,
        auth : authReducer,
        favorites : favoriteReducer,
        cart : cartReducer

    },

    preloadedState : { favorites : initialFavorites},

    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true,
})

setupListeners(store.dispatch);

export default store


and this is my file ProdudctDetails.jsx

import { useState } from 'react'
import { useParams , useNavigate, Link} from 'react-router-dom'
import { useGetProductDetailsQuery, useCreateReviewMutation } from '@/redux/api/productApiSlice'
import { useSelector, useDispatch } from 'react-redux'


import Ratings from '@/pages/Products/Ratings'
import ProductTabs from '@/pages/Products/ProductTabs'

import { addToCart } from '@/redux/features/cart/cartSlice'
// React-Icons
import { TbBrandMyOppo } from "react-icons/tb";
import { FaClock, FaStar, FaShoppingBasket, FaShoppingCart} from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { SiSinglestore } from "react-icons/si";
import moment from 'moment';

import { toast } from 'react-toastify'

const ProductDetails = ()=>{

    const { userInfo } = useSelector((state)=>state.auth)

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const dispatch = useDispatch()
    const navigate = useNavigate()

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

        <>
       

                           
                                <div className='bg-white h-[40vh] w-[50%] flex flex-col justify-evenly p-10'>


                                    <button
                                    onClick={handleToCart}
                                    disabled={products.countInStock === 0}
                                    className='flex justify-start items-center gap-4'>

                                    <FaShoppingCart size={38} className='text-black'/>
                                    <p>Ajouter au panier</p>

                                    </button>
                                    
                                   
                                </div>


                        
        </>
    )
}

export default ProductDetails

Why when I click on the button I have this warning ? state.cartItels.reduce isn't a function 

```js



import { useState } from 'react'
import { useParams , useNavigate, Link} from 'react-router-dom'
import { useGetProductDetailsQuery, useCreateReviewMutation } from '@/redux/api/productApiSlice'
import { useSelector, useDispatch } from 'react-redux'


import Ratings from '@/pages/Products/Ratings'
import ProductTabs from '@/pages/Products/ProductTabs'

import { addToCart } from '@/redux/features/cart/cartSlice'
// React-Icons
import { TbBrandMyOppo } from "react-icons/tb";
import { FaClock, FaStar, FaShoppingBasket, FaShoppingCart} from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { SiSinglestore } from "react-icons/si";
import moment from 'moment';

import { toast } from 'react-toastify'

const ProductDetails = ()=>{

    const { userInfo } = useSelector((state)=>state.auth)

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const dispatch = useDispatch()
    const navigate = useNavigate()

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

        <>
       

                           
                                <div className='bg-white h-[40vh] w-[50%] flex flex-col justify-evenly p-10'>


                                    <button
                                    onClick={handleToCart}
                                    disabled={products.countInStock === 0}
                                    className='flex justify-start items-center gap-4'>

                                    <FaShoppingCart size={38} className='text-black'/>
                                    <p>Ajouter au panier</p>

                                    </button>
                                    
                                   
                                </div>


                        
        </>
    )
}

export default ProductDetails

```