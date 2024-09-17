import { apiSlice } from "../api/apiSlice";
import { CATEGORY_URL } from "../constants";


// INJECTENDPOINTS
// we create the endpoint in apiSlice and for using in the specific apiSlice we use the method injectEndpoints


// BUILER  
// is a function from RTQ Query either builder is .mutation (for api with change POSR, DELETE, PATCH) or .query (for api with GET)

// QUERY
// is a function which take an parameter the elements (data) that we take send to the API  

// PROVIDETAGS is the powerfyl of RTQ QUERY we set this tags after the query function
// generally when we have a CRUD we set this tag in the READ / GET function


// INVALIDATETAGS 
// so ProvideTags is set for read / get and we set Invalidates for the path where there will have a change in the data
// This is the caching invalidation, like that automatically if there are any change, the data inside the get/ read path is up to date


// EXPORT FUNCTIONS
// When we export the function another powerfull of RTQ Query because we use e specific word for each route API

// useFunctionMutation
// create an object for the route API where we will have a change inisde this object there are many function and elements for the components (isLoading etc)

// useFunctionQuery
// create an object for the route API where we don't have a change we get only the data inisde this object there are many function and elements for the components (isLoading etc)

export const categoryApiSlice = apiSlice.injectEndpoints({



    endpoints : (builder)=>({


        createCategory : builder.mutation({

                       
            query : (data)=>({

                url : `${CATEGORY_URL}/create-category`,
                method : 'POST',
                body : data
            })
        }),

         updateCategory : builder.mutation({

            query : ({id, data})=>({

                url : `${CATEGORY_URL}/update-category/${id}`,
                method : 'PUT',
                body : data
            }), invalidateTags : ['CATEGORY'],
        }),


        deleteCategory : builder.mutation({

            query : (id)=>({

                url : `${CATEGORY_URL}/delete-category/${id}`,
                method : 'DELETE',
                
            })
        }),


        getAllCategory : builder.query({

            query : ()=>({

                url : `${CATEGORY_URL}/all-categories`,
                method : 'GET',
                
            }), providetags: ['CATEGORY']
        }),


        getOnecategory : builder.query({

            query : (id)=>({

                url : `${CATEGORY_URL}/get-category/${id}`,
                method : 'GET',
                
            }), providetags: ['CATEGORY']
        }),


    })
})





export const {

    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoryQuery,
    useGetOnecategoryQuery
    
} = categoryApiSlice
