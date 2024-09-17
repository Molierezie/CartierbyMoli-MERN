# <font color="#00b0f0">Cache - Fetch - Invalidate</font> 

## Ressource

Official Documentation
https://redux-toolkit.js.org/rtk-query/usage/cache-behavior


```js



import { createSlice } from ''


const localStorage = localStorage.getItem('userInfo')

const init = { userInfo : localStorage ? JSON.parse(localStorage) : null }



const userSlice = createSlice({


  name : 'auth',

  initialeState : init,


  reducers : {


      setCredentials : (state, actions)=>{


        // L'état actuelle je vais le transformer et le mettre dans l'objet "action" cet objet va avoir comme propriété "payloads" qui va être rempacer par le state

        state.userInfo = actions.payload,

        localStorage.getItem('userInfo') ? JSON.stringify(localStorage.setItem('userInfo', actions.payload) )

        const time = localStorage("date", new Date.now())



      },


      logout : (state)=>{


        state.userInfo = null
        localStorage.clear()

      }
  }
})


export const { setCredentials, logoutn}




```






# <font color="#00b0f0">2️⃣ - Slice</font> 

## <font color="#4bacc6">🤔 - Understand State & Payload ?</font>


### <font color="#92cddc">e.g 1 with authentication</font>

#### <font color="#b7dde8">💻 - Code</font>

```jsx

import { 1️⃣ createSlice } from "@reduxjs/toolkit";


2️⃣ initialState = { userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null }

const authSlice = createSlice({

  name : 'auth',

  initialState,

  reducers : {

    3️⃣ setCredential : (state, action)=>{

      state.userInfo = 4️⃣ action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))

      const expiresIn = new Date().getFullYear()*30
      localstorages.setItem("expires In" expiresIn)

    },

    logout : (state)=>{

      state.userInfo = null
      localStorage.clear()
    },

  }
})

5️⃣ export const { setCredential, logout } = authSlice.actions

6️⃣ export default authSlice.reducer

```

#### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `createSlice`

	- is a function from Redux Toolkit that simplifies the process of creating a Redux slice. It automatically generates action creators and action types that correspond to the reducers and state.
  <font color="#f79646">In simply the createSlice is a place for save the initial State and update this state with action</font>
  

--
- 2️⃣ - `initialState`

	- defines the initial state of the auth slice. It checks if there's a userInfo item in localStorage. If it exists, it parses the JSON string into a JavaScript object and sets it as userInfo. If it doesn't exist, userInfo is set to null.

--
- 3️⃣ - `setCredential`

	- A function take 2 parameter the fisrt is the state actual and the 2nd is an object containing information about the action being dispatched.

--
- 4️⃣ - `action.payload`

	- This line updates the userInfo in the state with the data from action.payload. By the way It contains the data sent with the action.

  - For example, if you dispatch this action with user data
  e.g 
  ```jsx
  dispatch(setCredientials({ id: 1, name: 'John', email: 'john@example.com' }))
  ```
  Then action.payload would be { id: 1, name: 'John', email: 'john@example.com' }.

  The action.payload is crucial here because it's the mechanism by which new data is passed into the reducer. When you call setCredientials (or dispatch the action), you pass in the user data you want to save. This data becomes the payload of the action, which the reducer then uses to update the state and localStorage.
  e.g
  you might use it like this in a component:

  ```jsx
  import { useDispatch } from 'react-redux';
  import { setCredientials } from './authSlice';

  // ... in your component:
  const dispatch = useDispatch();

  // After a successful login:
  dispatch(setCredientials(userData));
  ```

  Here, userData would become action.payload inside the reducer.

--

- 5️⃣ 
  - This exports the setCredientials and logout action creators for use in other parts of the application

-- 
- 6️⃣ 
  - This exports the reducer function for the auth slice. This reducer will be added to the Redux store.



### <font color="#92cddc">e.g 2 with Favorites Product</font>

#### <font color="#b7dde8">💻 - Code</font>

```jsx

import { createSlice } from "@reduxjs/toolkit";


export const favoritesSlice = createSlice({


    name : 'favorites',

    initialState : [],

    reducers : {


        addFavorite : (state, 1️⃣ action)=>{

            if (!state.some( (product) => product._id === action.payload._id)) {
                state.push(action.payload)
            }
        },

        removefavorite : (state, action )=>{

            return state.filter( (product) => product._id !== action.payload._id)
        },

        setfavorites : (state, action)=>{

            return action.payload
        }
    }
})

export const { addFavorite, removefavorite, setfavorites } = favoritesSlice.actions

export const selectfavorite = (state)=> state.favorites

export default favoritesSlice.reducer


```

- 1️⃣ - `action`

	- When addToFavorites is called, an action is dispatched. This action has a type of favorites/addToFavorites and a payload that contains the product you want to add to the favorites list.
  - The payload in this case is an object representing a product, which might look like this: {  _id: 'product123',
  name: 'Awesome Product',
  image: 'url_to_image',
 }

 - response

 The state is an array representing the current list of favorite products.
The some() method checks if any product in the current state has the same _id as the product in the payload.
If the product is not already in the favorites (i.e., some() returns false), the product from the payload is added to the favorites list using state.push(action.payload).

- Mutating the State :

In Redux Toolkit, the state parameter is a special object created by Immer. This means you can "mutate" the state directly (like using push) because Immer takes care of producing a new immutable state.

2. `removeFromFavorites`

Action: When removeFromFavorites is called, an action is dispatched with a type of favorites/removeFromFavorites and a payload that contains the _id of the product to remove.

Payload: The payload is an object with just the _id of the product: {
  _id: 'product123'
}
The filter() method creates a new array that excludes the product with the matching _id.
If a product’s _id matches the one in the payload, it is removed from the new state.

3. `setFavorites`

Payload: The payload is an array of product objects, likely retrieved from localStorage or another source: [
  { _id: 'product123', name: 'Awesome Product', ... },
  { _id: 'product456', name: 'Another Product', ... },
  // More products
]

reducer Logic : The entire state is replaced with the new array provided in the payload.
This is useful for setting the initial state of favorites when loading data from an external source like localStorage.

```jsx


const removefav = ()=>{

  const favorites = getfava

 const remove = favorites.filter((item)=> items !== productId)

 localStorage.setItem('favorite' JSON.parse(remove))

  if(favorites)
}


```






can you explain preloadedState and the initialState please ?

# <font color="#00b0f0">1️⃣ - Theme</font> 

## 🤔 - <font color="#4bacc6">Store classique ?</font>


- `explanation`

	- `req.query`
            - 


- `use case`



## 🤔 - <font color="#4bacc6">PreloadedState ?</font>


### <font color="#92cddc">Theory</font>

- `explanation`

	- The preloadedState property is used to initialize the Redux store with a specific state when it is first created. 

--
- `use case`
  - One of the common use cases for preloadedState is to initialize the Redux store with persisted state, such as data stored in localStorage. This allows your application to restore its state across page reloads or browser sessions.

### <font color="#ccc1d9">Practice</font>

#### <font color="#7f7f7f">e.g - 1 with Favorite Cart/Product</font>


`Solution ✅`

```jsx

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import favoriteReducer from "./features/favoriteSlice";
import { getFavoriteFromLocalStorage } from "../../Utils/localStorage";


const initialState = getFavoriteFromLocalStorage() || []

const store = configureStore({

    reducer : {
       
        api : apiSlice.reducer,
        favorites : favoriteReducer

    },

    preloadedState : { favorites : initialState},
})


export default store

```

- 1️⃣ `initialState`
    - This is the value you want the favorites slice to start with. It's either the favorites list from localStorage or an empty array.

--

- 2️⃣ `preloadedState`
    - This tells Redux to use initialState as the starting state for the favorites slice.

--

- `Context`
  - When the Redux store is created with configureStore, it checks for the preloadedState. For the favorites slice, it finds that preloadedState is provided, so it initializes favorites with the initialState value.
  - This setup ensures that your application starts with the correct state for favorites, whether it's from a previous session (loaded from localStorage) or a fresh session (empty array).

