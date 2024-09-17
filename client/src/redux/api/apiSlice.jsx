

import { createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'


// For setUp our API we use the function provide by RTQ Query fetchBseQuery for store the server url API
// We are not force to write direclty the url API here because we are using RTQ Query  and Vite, we put the url inside the proxy
// But for more secutity we set the BSE URL 

const baseQuery = fetchBaseQuery({ baseUrl : BASE_URL })


// createApi from RTQ Query for configure our API
export const apiSlice = createApi({

    baseQuery,

    // we setUp our tagTypes for caching and invalidation , we are using later inside the specific apiSlice
    tagTypes : ['Product', 'User', 'Order', 'Category'],
    
    // the endpoinst are each path to the API we set later inisde the specific apiSlice
    endpoints : ()=>({})

})