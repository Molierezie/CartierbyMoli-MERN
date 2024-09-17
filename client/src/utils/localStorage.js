

// add items

export const addFavoriteToLocalStorage = (product)=>{

    const favorite = getFavoriteFromLocalStorage();

    if(!favorite.some((item)=> item._id === product._id )){

        favorite.push(product)
    }

    localStorage.setItem('favorites', JSON.stringify(favorite))
}

// remove items


export const removeFavoriteToLocalStorage = (productId)=>{

    const favorite = getFavoriteFromLocalStorage();

   const removeFavorite = favorite.filter((item)=> item._id !== productId )

    localStorage.setItem('favorites', JSON.stringify(removeFavorite))
}

// retrieve items


// We create a function for verify if the product is already in the favorite list
// If Exist we Parse the result because we use it in your application
export const getFavoriteFromLocalStorage  = ()=>{

    const favoriteJSON = localStorage.getItem('favorites')

    return favoriteJSON ? JSON.parse(favoriteJSON) : []
}

