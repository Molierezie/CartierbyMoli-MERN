# <font color="#00b0f0">CRUD in Redux toolkit</font> 

## <font color="#e36c09"> ways 1 to do</font>

### <font color="#92cddc">What's it ?</font>

### <font color="#92cddc">use case ?</font>

### <font color="#b7dde8">Diagram - Analogy</font>

### <font color=« #00000 »>Step : 1 -</font> <font color="#f79646"> step</font>

#### <font color="#fac08f">Resource</font>

#### <font color="#95b3d7">1 - Code before</font>

#### <font color="#95b3d7">1 - Task</font>

#### <font color="#4f81bd">1 - Solution</font>


```jsx

import { USERS_URL } from "../constants";
import {apiSlice} from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({

    endpoints : (builder) => ({

   

         getUsers : builder.query({

            query : ()=>({

                url : `${USERS_URL}/all-users`,
                         }).providesTags(['User']),keepUnusedDataFor: 5,
                                  }),

        getUserDetails : builder.query({

            query : (id) =>({

                url : `${USERS_URL}/get-user/${id}`,
                            }),keepUnusedDataFor: 5,
                                        }),
       


        deleteUser : builder.mutation({

            query : (userId)=>({

                url : `${USERS_URL}/delete-user/${userId}`,
                method : 'DELETE'
                               })
                                     }),

        
        updateUser : builder.mutation({

            query : (data)=>({

                url : `${USERS_URL}/update-user/${data.userId}`,
                method : "PUT",
                body : data
                             }),invalidatesTags : ['User'],

                                    }),


                            })

                                            })



export const {
useGetUserDetailsQuery,
useDeleteUserMutation,
useUpdateUserMutation
} = userApiSlice ;

```

explain why for deleteUser we use in parameter of query : data.userId ? whereas for getUserDetails we use in parameter of query : id


```jsx



export const CreateUser = asyncHandler(

    async(req, res)=>{

        const { username, email, password} = req.body

        const usernameExist = await User.findOne({ username })
        const emailExist = await User.findOne({ email })

        if(usernameExist){

            res.status(400)
            throw new Error('Username already exist')
        }

         if(emailExist){

            res.status(400)
            throw new Error('email already exist')
        }

     
        const salt = await bcrypt.genSalt(15)
        const hashPassword = await bcrypt.hash(password, salt)

        const createUser = new User({

            username : username,
            email : email,
            password : hashPassword
        })

    

        const newUser = await createUser.save()

        generateToken(res, createUser._id)

        const displayUser = await createUser.select("-password")
    }
)

```


--- CODE BEFORE CHANGE

```jsx


const deleteHandler = async (userId)=>{

  
    
    if(window.confirm('Are you sure')){
        
        try{

        await delete(userId)
           
        }catch(err){
    
            console.err
        }

    }

}
```


