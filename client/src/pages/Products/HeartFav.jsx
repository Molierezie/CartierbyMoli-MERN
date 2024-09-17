
import React from 'react'

// ----------- Hook provide by React -----------
import { useEffect } from "react";

// --------------- function provide By Redux for the store and reducer  ---------------
import { useSelector, useDispatch } from "react-redux";

// --------------- Export function from favoriteSlice  ---------------
import {
    addFavorite,
    removeFavorite,
    setFavorite,
    selectFavorite
} from "../../redux/features/favorites/favoriteSlice";

// --------------- Export function from localStorage Utils  ---------------
import {

    addFavoriteToLocalStorage,
    removeFavoriteToLocalStorage,
    getFavoriteFromLocalStorage
} from "@/utils/localStorage";

// --------------- Style & Animation  ---------------

// -------- react icons
import { FaHeart, FaRegHeart} from "react-icons/fa"; 

const HeartFav = ({ product})=>{


    const dispatch = useDispatch();

    // We retrieve the favorites from the local storage
    const favorites = useSelector((state) => state.favorites) || []

    console.log(favorites);
    
    // const isFavorite = favorites.some((p)=> p._id === product._id )

    // We create an function for verify if the product is already in the favorite list
    const isFavorite =(!favorites.some((p)=> p._id === product._id))

    useEffect(()=>{
        const favoritesFromLocalStorage = getFavoriteFromLocalStorage();
        dispatch(setFavorite(favoritesFromLocalStorage));
        
    }, [])


    const HandleFavorites = ()=>{


        // After create isFavorite variable now 
        // if the results is false we add the product in the favorite list in the store and in the local storage
        
        if(isFavorite){
    
          dispatch(addFavorite(product))
    
          addFavoriteToLocalStorage(product)

          
        // if the results is true in variable, we remove the product in the favorite list in the store and in the local storage
        } else {
    
           dispatch(removeFavorite(product))
    
           removeFavoriteToLocalStorage(product._id)

           
        }
      }

 
    return(


      
        <div onClick={HandleFavorites} className="cursor-pointer mx-auto">
            {isFavorite ? 
                (
                    <div className='flex flex-col justify-center items-center  gap-1'>

                    <p>sauvegarder en favoris</p>
                    <FaRegHeart/>
                    </div>
                
                ) : 
                (

                    <div className='flex flex-col justify-center items-center  gap-1'>

                    <p>supprimer des favoris</p>
                    <FaHeart className="text-red-700"/>
                    </div>
                
            
                )}
        </div>


    )
}

export default HeartFav


