import {PRODUCT_URL, UPLOAD_URL} from "../constants"
import { apiSlice } from "../api/apiSlice";



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

export const productApiSlice = apiSlice.injectEndpoints({

    endpoints : (builder)=>({
        

    //     fetchProducts : builder.query({

    //         query : ({ keyword})=>({
                
    //             url : `${PRODUCT_URL}/fetch-products`,
    //             params : { keyword },

    //         }), keepUnuseDataFor : 5,
    //             providesTags : ["PRODUCT"],
                                        
    //                                 }),

        
        fetchProduct : builder.query({

        query : (id) =>({

            url : `${PRODUCT_URL}/fetch-product/${id}`,
        }),
        providesTags :  ["PRODUCT"],
                                    }),


        allProducts: builder.query({
            query: () => `${PRODUCT_URL}/all-products`,
          }),
      

        getProductDetails : builder.query({


            // GET is the method by defaut when we send information in our API
            // so we can write like this for more readable code
            query : (id) => `${PRODUCT_URL}/fetch-product/${id}`
           
        }),

        createProduct: builder.mutation({

            query : (data)=>({

                url : `${PRODUCT_URL}/create-product`,
                method : 'POST',
                body : data
            }), invalidatesTags : ['PRODUCT']
                                      }),


         updateProduct : builder.mutation({

            // Here the query function take 2 parameters why , because in the function updateProfile on the back-end
            // we wait the specific id and the formData
            query : ({id, formData})=>({

                url : `${PRODUCT_URL}/update-product/${id}`,
                method : 'PUT',
                body : formData
            })
        }),

        uploadProductImage : builder.mutation({

            query : (data)=>({

                url: `${UPLOAD_URL}`,
                method: "POST",
                body: data,
            })
        }),

        
           deleteProduct : builder.mutation({

            query : (id)=>({

                url : `${PRODUCT_URL}/delete-product/${id}`,
                method : 'DELETE',
                
            }),
            providesTags: ["Product"],

        }),

        createReview : builder.mutation({
            

            // Here we query function take One parameter because the function in the server wait only 
            // the change inside a specific product , buut don't need the id of the product only the change
            // this is why we dont need the id in the parameter

            query : (data)=>({

                url: `${PRODUCT_URL}/add-review/${data.productId}`,
                method: "POST",
                body: data,


            })
        }),




        getTopProducts: builder.query({
            query: () => `${PRODUCT_URL}/top-products`,
            keepUnusedDataFor: 5,
          }),
      
          getNewProducts: builder.query({
            query: () => `${PRODUCT_URL}/new-products`,
            keepUnusedDataFor: 5,
          }),




          getBrandLove : builder.query({

            query : ()=>({

                url : `${PRODUCT_URL}/fetch-love`,
                keepUnusedDataFor: 5,
            })
          }),


          // Here we filter the product by collection using req.params in the back-end for more dymatic way
          getProductByCollection : builder.query({

            query : (id) =>({

                url : `${PRODUCT_URL}/get-collection-product/${id}`,
            })
          }),


          // Here we filter the product by brand but not using req.params because I'm not create a collection fpr brand
          // So another solution less dymanic but it"s work
          // We get the path from the window.location.pathname
          // ex = https://www.reddit.com/explore/
          // here with the method the path will be /explore
          // we use encodeURIComponent to encode the path it ensure we get the right path
          getBrand : builder.query({

            query : () => ({

                url : `${PRODUCT_URL}/get-brand-product?path=${encodeURIComponent(window.location.pathname)}`,
            }),
            keepUnusedDataFor: 0,
            refetchOnMountOrArgChange: true,
          
         
        })

    })


})




export const {

    useFetchProductsQuery,
    useFetchProductQuery,
    useAllProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
    useGetNewProductsQuery,
    useUploadProductImageMutation,
    // useGetSacProductQuery,
    useGetBrandLoveQuery,
    useGetFilterProductsQuery,
    useGetProductByCollectionQuery,
    useGetBrandQuery
  } = productApiSlice;