import { createSlice } from "@reduxjs/toolkit";


export const favoritesSlice = createSlice({


    name : 'favorites',

    initialState : [],

    reducers : {


        // For the function add Favorite we verify if there is already a product in the favirite list
        // if not we add it

        addFavorite : (state, action)=>{

            if (!state.some( (product) => product._id === action.payload._id)) {
                state.push(action.payload)
            }
        },


        // We remove from favorite with the method filter
        removeFavorite : (state, action )=>{

            return state.filter( (product) => product._id !== action.payload._id)
        },

        setFavorite : (state, action)=>{

            return action.payload
           
        }
    }
})

export const { addFavorite, removeFavorite, setFavorite } = favoritesSlice.actions;

export const selectFavorite = (state)=> state.favorites || []

export default favoritesSlice.reducer

