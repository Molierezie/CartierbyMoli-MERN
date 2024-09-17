import { USERS_URL } from "../constants";
import {apiSlice} from "../api/apiSlice";

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

export const userApiSlice = apiSlice.injectEndpoints({

    endpoints : (builder) => ({

        login : builder.mutation({

            query : (data) => ({

                url : `${USERS_URL}/login-user`,
                method : "POST",
                body : data,

            }),
                           

                              }),


        logout: builder.mutation({
            query: () => ({
              url: `${USERS_URL}/logout-user`,
              method: "POST",
                          }) 
    
                                }),


        register : builder.mutation({

            query : (data)=>({

                url : `${USERS_URL}/create-user`,
                method : "POST",
                body : data
                            })

                                  }),



        updateProfile : builder.mutation({

            query : (data)=>({

                url : `${USERS_URL}/update-profile`,
                method : "PUT",
                body : data
                            })
                                 }),

                                 
        getUsers : builder.query({

            query : ()=>({

                url : `${USERS_URL}/all-users`,
                         }),providesTags: ['User'],
                         keepUnusedDataFor: 5,
                                  }),


        getUserDetails : builder.query({

            query : (id) =>({

                url : `${USERS_URL}/get-user/${id}`,
                            }),keepUnusedDataFor: 5,
                                        }),
       


        deleteUser : builder.mutation({

            query : (id)=>({

                url : `${USERS_URL}/delete-user/${id}`,
                method : 'DELETE'
                               }), invalidatesTags : ['User'],
                                     }),

        
        updateUser : builder.mutation({

            query : (data)=>({

                url : `${USERS_URL}/update-user/${data.id}`,
                method : "PUT",
                body : data
                             }),invalidatesTags: ["User"],

                                    }),


                            })

                                            })



export const { useLoginMutation,
useLogoutMutation, 
useRegisterMutation,
useUpdateProfileMutation,
useGetUsersQuery,
useGetUserDetailsQuery,
useDeleteUserMutation,
useUpdateUserMutation
} = userApiSlice ;