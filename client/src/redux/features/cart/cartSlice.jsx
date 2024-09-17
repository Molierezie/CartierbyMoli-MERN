
// import { createSlice } from "@reduxjs/toolkit";
// import { updateCart } from "@/utils/cart";


// const localStorageCart = localStorage.getItem('cart')

// const initialState = localStorageCart ? JSON.parse(localStorageCart) : { cartItems : [], shippingAddress : {}, paypalMethod : 'Paypal' }

// const cartSlice = createSlice({

//     name : 'cart',
//     initialState,
//     reducers : {


//         addToCart : (state, action)=>{


//             const { user, rating, numReviews, reviews, ...item } = action.payload;

//             const existItem = state.cartItems.find((x)=> x._id === item._id);

//             if(existItem){

//                 state.cartItems = state.cartItems.map((x)=> x._id === existItem._id ? item : x)
//             }else{

  
//                 state.cartItems = [...state.cartItems, item ]
//             }

//             return updateCart(state, item)
//         },

//         removeFromCart: (state, action) => {
//             state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
//             return updateCart(state);
//           },
      
//           saveShippingAddress: (state, action) => {
//             state.shippingAddress = action.payload;
//             localStorage.setItem("cart", JSON.stringify(state));
//           },
      
//           savePaymentMethod: (state, action) => {
//             state.paymentMethod = action.payload;
//             localStorage.setItem("cart", JSON.stringify(state));
//           },
      
//           clearCartItems: (state, action) => {
//             state.cartItems = [];
//             localStorage.setItem("cart", JSON.stringify(state));
//           },
      
//           resetCart: (state) => (state = initialState),
    
//     } 
// })

// export const {
//     addToCart,
//     removeFromCart,
//     savePaymentMethod,
//     saveShippingAddress,
//     clearCartItems,
//     resetCart,
//   } = cartSlice.actions;
  
//   export default cartSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";
// import { updateCart } from "@/utils/cart";





// For the initial State we check if there is a cart in the localStorage
// if it"s ok we parse the data because we are using later in your app
// Otherwise we set it to an empty array
const localStorageCart = localStorage.getItem('cart')

const initialState = localStorageCart ? JSON.parse(localStorageCart) : { cartItems : [], itemsPrice : 0 , totalPrice : 0 }



const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
  
    addToCart: (state, action) => {
      


      // we create a special function for convert the price to 2 decimals and integer number
      const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
      };
      

      // We don't need to user, rating or reviews so we extract it from the payload

      const { user, rating, numReviews, reviews, ...item } = action.payload;

      // We check with the find method if the item is already in the cart
      const existItem = state.cartItems.find((x) => x._id === item._id);

      // If it's already in the cart we add the same payload
      // otherwise we add the new payload
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      const updateCart =(state, item )=>{


        // Imagine we have another item in you cart we need to update the price
        // and the localStorage for the new elements

        state.itemsPrice = addDecimals(

          state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

        );

   
        localStorage.setItem('cart', JSON.stringify(state));

        return state
      }

      updateCart(state, item)


    },


    // We remove the item with still the filter methiod and we also remove the localStorage
    // How we set the actual state now in the actual state, the product that was removed
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state));
      return state;
    },



    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.clear('cart');
      // localStorage.setItem("cart", JSON.stringify(state));
    },

    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCartItems,
  resetCart,
} = cartItemSlice.actions;

export default cartItemSlice.reducer;