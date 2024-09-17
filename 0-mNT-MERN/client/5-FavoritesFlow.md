
🧩`favoritesSlice` component

```jsx


import { createSlice } from ''


initialState = []

export const favoriteSlice = createSlice({


  name : 'favorite',

  initialState : initialState,

  reducers : {


    // one function for add review
    // check if there is already a review or not

    addFavorite : (state, actions)=>{

      if(!state.some((product)=> product._id === actions.payload._id) ){

          state.push(action.payload)
      }
    },


    removeFavorite : (state, action)=>{

    // check if the product is already favorite

      return state.filter((product) => product._id !== action.payload._id )

     

    },

    setFavorite : (state, action)=>{

      return action.payloads
    }

    // one function for remove review


    // one function for add review in localStorage


  }

})


export const { addFavorite, removeFavorite , setFavorite} = favoriteSlice.actions

export const favoriteSelector = (state) => state.favorite

export default favoriteSlice.reducer


```


🧩`utils/localStorage.js` component


```js


export const addFavoriteToLocalStorage = (product)=>{

const favorite = getFavoriteToLocalStorage()

if(!favorite.some((p)=> p._id === product._id )){

      favorite.push(product)
  }

  localStorage.setItem('favorite', JSON.stringify(favorite))
}


export const removeFavoriteToLocalStorage = (productId)=>{


  const favorite = getFavoriteToLocalStorage()

  const removeFavorite = favorite.filter((p)=> p._id !== productId)

  localStorage.setItem('favorite', JSON.stringify(removeFavorite))
  

}



export const getFavoriteToLocalStorage = (product)=>{


    const favoriteJSON = localStorage.getItem('Favorite')

    const favorite = favoriteJSON ? JSON.parse(favoriteJSON) : []

}


```

// Question

- Why Stringify Removefavorite ?


🧩`store.jsx` component

```jsx


import { configureStore } from ''
import { apiSlice } from ''
import favoriteReducer from ''
import { getFavoriteToLocalStorage } from ''
import preloaledState from ''


const favoriteState = getFavoriteToLocalStorage() || []

const store = configureStore({


  reducers : {

    api : apiSlice.reducers,
    auth : authReducer,
    favorite : favoriteReducer
  },

  preloaledState : { initialState : favoriteState }


})


```

// Explain the role of preloaledState


🧩`heartIcon.jsx` component


```jsx


import { useSelector, useDispatch } from ''

import {

addFavorite,
removeFavorite,
setFavorite,
favoriteSelector

} from ''

import {

getFavoriteToLocalStorage,
removeFavoriteToLocalStorage,
addFavoriteToLocalStorage

} from ''



const HeartIcon = ({ product })=>{


  const favorite = favoriteSelector

  const dispatch = useDispatch()

  const isFavorite = (!favorite.some((p)=> p._id === product._id))
  


  const handleFavorite = ()=>{


    if(isFavorite){

      dispatch(addFavorite(product))

      getFavoriteToLocalStorage(product)

    

    } else {

       dispatch(removeFavorite(product))

       removeFavoriteToLocalStorage(product._id)
    }
  }

  useEffect(()=>{
    

    const getFavToLocalStorage = getFavoriteToLocalStorage()
    dispatch(setFavorite(getFavToLocalStorage))

  }, [])


  return (


    
  )



}



```

- Why in HandleFavorite in parameter I don't set the product ?



🧩`favCount.jsx` component


```jsx


import { useSelector} from ''


const favCount = ()=>{


  const favorites = useSelector((state)=> state.favorites)


  const favCount = favorites.length
  
}



```