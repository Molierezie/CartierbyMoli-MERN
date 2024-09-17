import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoriteReducer from "./features/favorites/favoriteSlice";
// import cartReducer from "./features/cart/cartSlice";
import cartItemSliceReducer from "./features/cart/cartSlice";
import { getFavoriteFromLocalStorage } from "@/utils/localStorage";
import { setupListeners } from "@reduxjs/toolkit/query/react";

const initialFavorites = getFavoriteFromLocalStorage() || []

// We use the configureStore function from reduxjs/toolkit this store will manage all the actions inside this app
// and this is for that it will be in the top on the app

const store = configureStore({

    // the reducer take all the reducers create is the app
    reducer : {
       
        // the api slice is the path to the API where all the routes are
        api : apiSlice.reducer,
        auth : authReducer,
        favorites : favoriteReducer,
        // cart : cartReducer,
        cartItem : cartItemSliceReducer,
        

    },
    
    preloadedState : { favorites : initialFavorites},

    // the middleware take the apiSlice middlware (the middleware for RTQ Query) why ?
    // Because without the middleware we cannot use the powerful of RTQ Query e.g caching invalidation
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    // devTools : true, Before deployment
    
    // For see the changes in the store like a console
    devTools : true
})

setupListeners(store.dispatch);

export default store