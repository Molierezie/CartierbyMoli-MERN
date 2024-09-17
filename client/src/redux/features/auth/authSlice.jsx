import { createSlice } from "@reduxjs/toolkit";


// we intialatState take an object key value pairs
// He we set an conditional for the value and we parse the result because after we will use 
// the userInfo inside the app

    const initialState = {
       userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    }

    const authSlice = createSlice({

        // the name of the slice it's the same name set in the store
        name : 'auth',
        initialState,

        reducers : {

            // this function take two arguments state and action
            // the state is the actual state in initialState
            // the action is an object which take type and payload
            // payload is the value set when we dispatch the action in the component
            // Imagine an user login so now the information of the user will be the payload 
            // when we set an code javascript to Localstprage we need to stringify the payload
            setCredientials : (state,action)=>{

                state.userInfo = action.payload
                localStorage.setItem('userInfo', JSON.stringify(action.payload))
                const expiresIn = new Date().getTime() + 30 * 24 * 60 * 60 * 1000
                localStorage.setItem('expiresIn', expiresIn)
            },


            // When the user logout we set the initialState to "null" and we remove the info from localStorage
            logout : (state)=>{

                state.userInfo = null
                localStorage.clear();
            }
        }

    })


// These function are exported in the components
export const  { setCredientials, logout } = authSlice.actions

// we export the slice and we set the reducer in the store as a value and the key will be the name of the slice here 'auth'
export default authSlice.reducer












