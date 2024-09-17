
# <font color="#ffc000">0️⃣ - Understand Concept with Illustration & Analogy</font>


## <font color="#c4bd97">User Management</font>


# <font color="#00b0f0">1️⃣ - SET-UP-API</font>

## <font color="#92cddc">📝 - Diagram Analogy</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

### <font color="#95b3d7">1 - Code before</font>

🧩 in src/redux/constants.jsx

```jsx



```

🧩 in src/redux/api/apiSlice.jsx

```jsx



```

### <font color="#95b3d7">1 - Task</font>

- a
- b
- c 

### <font color="#4f81bd">1 - Solution ✅ </font>

#### <font color="#b2a2c7">🧩-  in constant.jsx</font>

##### <font color="#a5a5a5">💻 - Code</font>


🧩 in src/redux/constants.jsx

```jsx

export const BASE_URL = ''
export const USERS_URL = `api/users`

```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - why `BASE_URL` is empty ?

	- is empty because I configure the base_url in the proxy of this project for forward API requests to your backend server. This allows you to use relative URLs in your code.

  🧩 vite.config.js


```js

  export default defineConfig({
  plugins: [react()],
  server : {

    proxy : {
      "/api" : "http://localhost:5500"
    }
  }
})

```

#### <font color="#b2a2c7">🧩 - apiSlice.jsx</font>

##### <font color="#a5a5a5">💻 - Code</font>

```jsx

import { createApi, fetchBaseQuery } import from ''
import { BASE_URL } from ''


const baseQuery = fetchBaseQuery({ baseUrl : `${BASE_URL}`})


const apiSlice = createApi({

  baseQuery,

  tagTypes : ['USER', 'ORDERS', 'CATEGORY' ],

  endpoints : ()=>({})

})

```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>



- 1️⃣ - `createApi`

	- This function is used to define an API slice in your Redux store. It simplifies data fetching and caching.

--
- 2️⃣ - `fetchbaseQuery`

	- This is a utility function to define the base query configuration for the API, such as the base URL and default headers.

--
- 3️⃣ - `tagTypes`

	- This is an array of tag names used for caching and invalidation purposes. By defining tag types, you can use them to invalidate cache for specific resources. For example, if you update a product, you can invalidate the 'Product' tag to ensure any components relying on product data get the latest information.

--
- 3️⃣ - `tagTypes`



# <font color="#00b0f0">2️⃣ - USER MANAGEMENT SETUP</font>

## <font color="#92cddc">📝 - Diagram Analogy</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

### <font color="#95b3d7">1 - Code before</font>

🧩 in userController 

```js


```

### <font color="#95b3d7">1 - Task</font>

- a
- b
- c 

### <font color="#4f81bd">1  - Solution ✅ </font>

#### <font color="#b2a2c7">🧩 - in authSlice.jsx </font>

##### <font color="#a5a5a5">💻 - Code</font>

```js

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

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `createSlice`

	- is a function from Redux Toolkit that simplifies the process of creating a Redux slice. It automatically generates action creators and action types that correspond to the reducers and state.

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




#### <font color="#b2a2c7">🧩 - in stores.jsx</font>

##### <font color="#a5a5a5">💻 - Code</font>

```js

import { configureStore } from ''
import authReducer from ''
import { apiSlice } from
import { setupListener } from ''


const store = configureStore({

1️⃣ reducer: {

  api : 2️⃣ apiSlice.reducer,

  auth : authReducer

},

3️⃣ middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),

devTools : true

setUpListeners(store.dispatch)

})


export default store

```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `reducer`

	- An object where keys are slice names and values are the slice reducers. I can write that I want for the slices names
--

- 2️⃣ - `apiSlice.reducer`

	- When you include apiSlice.reducer in the reducer field of your configureStore call, you are telling Redux to include the state slice managed by apiSlice. This state slice will store information about your API requests, including caching, loading status, error handling, and responses.

--

- 3️⃣ - `middleware`

  - The apiSlice.middleware enhances the default middleware with capabilities to handle API request lifecycles (like fetching, caching, and updating the store with the results).
  - This adds (concatenates) the apiSlice.middleware to the default middleware array. It ensures that the RTK Query middleware is included in the middleware pipeline of the Redux store. 
  - Resume : This line configures the Redux store to use both the default middleware and the custom middleware provided by RTK Query. This setup allows the store to handle async API calls efficiently while maintaining other default middleware functionalities

--

- 4️⃣ - `setupListeners`

  - This sets up automatic re-fetching and other side effects for queries.
  - This function enhances the store with listeners for automatic refetching of queries based on application focus and connectivity status. It helps keep your data fresh and synchronized with the backend when the user regains focus or connectivity





🧩`userApiSlice.js` file

```jsx

 import { fetchQuery } from ''
 import { USERS } from ''


const apiUserSlice = fetchQuery.endpointInject({

    endpoint : (builder)=>{


      login : builder.mutation({

        query : (data)=>({

          url : `${USERS}/login-user`,
          method : 'POST'
          body : data
        })
      })

    }
})

export { useLoginMutation } = apiUserSlice

```

🧩`authSlice.js` file

```jsx


import { createSlice } from ''


const initialState = { userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userinfo')) : null }

const authSlice = createSlice({

    name : 'auth',

    initialState,

    reducers : {

      setCredentials : ( state, action) =>{

          state.userInfo = action.payload
          localStorage.setItem('userInfo' : JSON.stringyfy(action.payload))

          const expiresIn = new Date().getTime()*30*30*100
          localStorage.setItem('expiresInj' : expiresIn)
      },

      logout : (state)=>{
        state.userInfo = null
        localStorage.clear()
      }
    }

})

    export const { setCredential, logout } = authSlice.actions

    export default authSlice.reducer


```
🧩`store.jsx` file

```jsx

import {configureStore} from ''
import { createApi } from ''
import authReducer from ''
import { setUpListener} from ''


const store = configurestore({

  [reducers.path] : createApi.reducer,

  auth : authReducer,

  middleware : (getDefaultMiddleware)=> getDefaultMiddleware.concat(createApi.middleware)

})

setUpListener(store.dispatch)

export default store

```

🧩`navigation.jsx` file

```jsx

import { logout } from 'authSlice'
import { useLogoutMutation }  from 'apiUserSlice'
import { toast } from ''
import { useState, useEffect} from ''
import { useSelector, useDispatch } from ''
import { Link, Navigation, useLocation} from ''


const Navigation = ()=>{


  const auth = useSelector((state)=> state.auth.userInfo)

  const dispatch = useDispacth()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const handleLogout = async ()=>{

    try{

      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/home')

    }catch(err){
      toast.error(err.message)
    }
  }



}




```

## <font color="#492d050">🤔 - Question about this topic</font>

### <font color="#c3d69b">Question 1</font>

- Is there possible to hide the password in the payload of the browser ?
#### <font color="#d7e3bc">answer</font>

- type="password" only cosmetically hides the password. The input value is always accessible via JS (using it's .value property). So when someone opens DevTools, he or she will be able to get the password regardless.

--


- The code you've provided is for an input field of type "password" in HTML/JSX, likely used in a React component. By default, using type="password" does hide the actual characters in the input field on the user interface, replacing them with dots or asterisks. However, this doesn't hide the password in the network payload when the form is submitted.
To address your specific question: Is it possible to hide the password in the payload of the browser?
The short answer is no, not entirely. Here's why:

  HTTPS: The most important step is to ensure your website uses HTTPS. This encrypts all data sent between the browser and the server, including passwords. While this doesn't "hide" the password in the payload, it does encrypt it, making it extremely difficult for anyone intercepting the traffic to read.
Server-side handling: The password should never be logged or stored in plain text on the server side. It should be hashed before storage.
Client-side: You can't completely hide the password from the client-side code or network requests, as the browser needs to send it to the server for authentication.

  However, there are some best practices you can follow:

  Use HTTPS for all communications.
Implement proper CSRF (Cross-Site Request Forgery) protection.
Use secure password hashing on the server side.
Avoid sending passwords in URL parameters.
Consider using more secure authentication methods like OAuth 2.0 or JWT (JSON Web Tokens).


Remember, the goal is not to hide the password from the browser itself (which is impossible), but to protect it from unauthorized access during transmission and storage.
If you're particularly concerned about security, you might want to look into more advanced authentication methods that don't require sending the password with every request, such as token-based authentication systems.
Would you like me to elaborate on any of these points or discuss alternative authentication strategies?



# <font color="#00b0f0">3️⃣ -  User Management (User itself)</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

### <font color="#95b3d7">1 - Code before</font>

🧩 in userApiSlice

```js


```

🧩 in Login.jsx

```jsx


```

🧩 in Register.jsx

```jsx


```

🧩 in Profile.jsx

```jsx


```

🧩 in Navigation.jsx (for logout)

```jsx


```

### <font color="#95b3d7">1 - Task</font>

- add the feature in the project for login, register, logout and update Profile

### <font color="#4f81bd">1  - Solution ✅ </font>

#### <font color="#b2a2c7">🧩 - in userApiSlice </font>

##### <font color="#a5a5a5">💻 - Code</font>

```jsx

import {1️⃣ USERS_URL } from "../constants";
import {apiSlice} from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({

   2️⃣, 3️⃣ endpoints : ( builder) => ({


      4️⃣  login : builder.mutation({

            query : (data) => ({

       1️⃣         url : `${USERS_URL}/login-user`,
                method : "POST",
                body : data,

            }),
                           

                              }),


      4️⃣  logout: builder.mutation({
            query: () => ({
              url: `${USERS_URL}/logout-user`,
              method: "POST",
                          }) 
    
                                }),


      4️⃣ register : builder.mutation({

            query : (data)=>({

                url : `${USERS_URL}/create-user`,
                method : "POST",
                body : data
                            })

                                  }),


      4️⃣  updateProfile : builder.mutation({

            query : (data)=>({

                url : `${USERS_URL}/update-profile`,
                method : "PUT",
                body : data
                            })
                                 }),



                            })

                                            })


export const { useLoginMutation,
useLogoutMutation, 
useRegisterMutation,
useUpdateProfileMutation,
} = userApiSlice ;

```


##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ `USERS_URL` 
  - correspond to the url of the back-end 'localhost/api/users', I add at the end 'login-ser' because in my bacck-end this is the routes for the login


🧩`Back-end`

```js
// LOGIN USER
router.post("/login-user", loginUser) 

```

- 2️⃣ `endpoints`
  - This property is a function that takes a builder object and returns an object defining the new endpoints to be added.

--

- 3️⃣ `builder` 
  - The builder object is provided by Redux Toolkit Query and is used to define endpoints with various types of queries and mutations.

--

- 4️⃣ `builder.mutation`
  - It is a mutation endpoint because it involves a state change (logging in a user).
 e.g if I want passing any data or to change the data, but If don't want get any data and change I use another solution

--

- 5️⃣ `query : (data)`
  - This property is a function that takes data as an argument and returns an object describing the API request.

--

- 6️⃣ `body: data`
  - This property specifies the body of the request. It sends the data argument (which includes user credentials) as the body of the POST request. Here the data This is the input data (e.g., email and password) that will be sent in the API request.

-- 
- 7️⃣ `use`
  - is for all the endpoint it doesn't matter if you work we the query or mutation 'Login' this is the name of the endpoint .'Mutation' her we work with the mutation. The useLoginMutation hook can be used to trigger login requests, handle loading states, and process responses or errors.
  Understand useFunctionMutation with doc, Link [Doc redux Toolkit](https://www.youtube.com/watch?v=ob3-ivQx2Es&list=PL1BztTYDF-QM8jn9jXESmx2vJwSmhe7t9)



#### <font color="#b2a2c7">🧩 - in Login.jsx </font>

##### <font color="#a5a5a5">💻 - Code</font>

🧩 in Login.jsx


```js
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/userApiSlice'
import { setCredientials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { FaCircle } from "react-icons/fa";


const Login = () => {


  1️⃣  const { userInfo } = useSelector( (state) => state.auth );

    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

  
   2️⃣ const [ login, { isLoading } ] = useLoginMutation();

 
   3️⃣  const  { search } = useLocation();

    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/login"


   4️⃣ useEffect(() => {

      userInfo && navigate(redirect);

    }, [navigate, redirect, userInfo]);


    const submitHandler = async (e)=>{

      e.preventDefault();

      try {

       5️⃣ const res = await login({ email, password}).unwrap()
        console.log(res);
    
        dispatch(setCredientials({...res}));
        navigate(redirect);
        toast.success("Connexion reussie");
        
      } catch (err) {
        console.log(err);
        toast.error("Mot de passe incorrect");
        
      }
    }


    return(

           <form onSubmit={submitHandler}>

                <input
                className='sm:border-b-2 border-black w-[90vw] mt-6 sm:text-[0.9rem] md:w-[45vw] text-[1.1rem] p-1'
                type='email'
                id='email'
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}>

                </input>

                <input
                className='sm:border-b-2 border-black w-[90vw] mt-6 sm:text-[0.9rem]  md:w-[45vw] text-[1.1rem] p-1'
                type='password'
                id='password'
                value={password}
                placeholder='Mot de passe*'
                onChange={(e)=> setPassword(e.target.value)}
                >

                
                </input>

              

          <button 
          className='sm:h-[3rem] w-[90vw] rounded-full bg-black text-white md:w-[45vw] sm:text-[0.9rem] '
          disabled={isLoading}
          type="submit"

          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>


            {isLoading && ( <span>LOADING</span>)}


              </form>

    )


}

export default Login
```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `useSelector`

	- used to extract the data from the redux Store, here we use the destructuring for search the slice 'auth' and inside the auth slice we want to get the userInfo.
This allows the component to access the current user's information

--

- 2️⃣ `useLoginMutation`
  - Link [Documentation redux](https://redux-toolkit.js.org/rtk-query/usage/mutations)

--

- 3️⃣ 
  - the `search` property contains the query string of the URL (everything after the '?' in the URL).
`URLSearchParams`is a Web API that provides utility methods for manipulating the query string of a URL. It parses the query string into a format that's easy to work with
`const redirect = sp.get('redirect') || '/'` Here, we're using the get method of URLSearchParams to retrieve the value of the 'redirect' parameter from the query string.
e.g
Suppose the current URL is: <span style="background:#d4b106">http://yourapp.com/login?redirect=/dashboard</span>
   - `search` would be <span style="background:#d4b106">"?redirect=/dashboard"</span>
   - `sp` would be a `URLSearchParams` object representing this query string
   - `sp.get('redirect')` would return <span style="background:#d4b106">"/dashboard"</span>
   - so `redirect` would be set to <span style="background:#d4b106">"/dashboard"</span>
If the URL was just http://yourapp.com/login with no query string:
   - `search` would be an empty string ''
   - `sp`would be an empty <span style="background:#d4b106">URLSearchParams</span> object
   - <span style="background:#d4b106">sp.get('redirect')</span> would be return <span style="background:#d4b106">null</span>
   - So <span style="background:#d4b106">redirect</span> would fall back to <span style="background:#d4b106">"/"</span>

--

  - 4️⃣ `useEffect`
    - useEffect is use for each time navigate, userInfo or Redirect is invo

--


  - 4️⃣ `unwrap()`
    - method is a feature provided by Redux Toolkit's RTK Query. It's used to handle the Promise returned by an RTK Query mutation (in this case, the login mutation).
Here what unwrap does ?
    - It "unwraps" the Promise returned by the mutation.
    - If the mutation is successful, unwrap() returns the payload of the fulfilled action. This is typically the data returned by your API.
    - If the mutation fails, unwrap() will throw an error. This error will contain details about what went wrong, which can be caught in the catch block.


#### <font color="#b2a2c7">🧩 - in Register.jsx </font>

##### <font color="#a5a5a5">💻 - Code</font>

```js

const { userInfo } = useSelector( (state) => state.auth)

const [ username, setUsername ] = useState('')
const [ email, setEmail ] = useState('')
const [ password, setPassword ] = useState('')
const [ confirmPassword, setConfirmPassword ] = useState('')


const dispatch = useDispatch()
const navigate = useNavigate()

const { search} = useLocation();
const sp = new URLSearchParams(search);
const redirect = sp.get("redirect") || "/register"



const [ register , {isLoading}] = useRegisterMutation()

useEffect(() => {
  userInfo && navigate(redirect)
}, [navigate, redirect, userInfo])





const handleRegister = async (e) =>{

  e.preventDefault()

  if(password !== confirmPassword){
    toast.error("Passwords do not match")
    
  }else{

    try{
  
        const res = await register({ username, email, password}).unwrap()
        dispatch(setCredientials({...res}))
        navigate(redirect)
        toast.success("Registered successfully")
  
    }catch(err){
      console.log(err);
      toast.error(err.data.message || err.error)
    }

  }

```

#### <font color="#b2a2c7">🧩 - in Navigation.jsx (for logout)</font>

##### <font color="#a5a5a5">💻 - Code</font>

```js

import logout from ''
import useLogoutMutation from ''


  1️⃣ const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async ()=>{

        try {

            await logoutApiCall().unwrap()
            dispatch(logout());
            navigate('/login')
            
        } catch (error) {
            console.log(error);
            toast.error(error.data?.message || error.message || "An unexpected error occurred");  
        }
}

```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `logoutApiCall`

	- is the function returned by useLogoutMutation that triggers the logout

#### <font color="#b2a2c7">🧩 - in Profile.jsx</font>

##### <font color="#a5a5a5">💻 - Code</font>

```js


const { userInfo } = useSelector((state)=> state.auth)


  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')

  const dispatch = useDispatch()

  const [ profile, { isLoading : isLoadingProfile} ] = useUpdateProfileMutation()

  1️⃣ useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]
);


const handleProfile = async (e)=>{

  e.preventDefault()

  try{

   2️⃣ const res = await profile({
    
    _id : userInfo._id
    username, 
    email, 
    password
    })

    dispatch(setCredientials({...res}))
    toast.success("Profile updated successfully")


  }catch(err){
    toast.error(error.data.message || error.error)

  }
}

```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `useEffect`

	- the use of the useEffect at each time we changing the username or the email, on the forthcoming render this username or email is update

- 2️⃣ - `const res = await...`

	- in the res we use the id because the user is already existing and The server needs to know which user to update. The _id serves as a unique identifier for the user in the database
  - For the login or register we don't send an id because the user does'nt existing is the database for now 


# <font color="#00b0f0">4️⃣ -  User Management (Admin Task)</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

### <font color="#95b3d7">1 - Code before</font>



```js


```

### <font color="#95b3d7">1 - Task</font>

- a
- b
- c 

### <font color="#4f81bd">1  - Solution ✅ </font>

#### <font color="#b2a2c7">🧩 - in userApiSlice </font>

##### <font color="#a5a5a5">💻 - Code</font>


🧩 userApiSlice

```jsx

export const userApiSlice = apiSlice.injectEndpoints({


  endpoints : (builder)=>{


    getOneUser : builder.query({

      query : (id)=>({

        url : `url/id`,
        method : 'GET'

      })
    }),

    getAllUser : builder.query({

      query : ()=>({

        url : `url/all-users`,

      })
    }),providesTags : ['USER']

    deleteUser : builder.mutation({


      query : (userId)=>({

        url : `url/userId`,
        method : 'DELETE',
        body : id

      })
    }),


    editUser : builder.mutation({

      query : (id, data)=>{

        url : `url/id`,
        method : 'PUT',
        body : data

      }
    }), invalidatestags : ['USER']
  }
})


```


🧩 page/admin/AdminHandleUser

```jsx

const UserList = () => {

  // const { userInfo } = useSelector( (state)=> state.auth)

  const { 1️⃣ data : users, isLoading, refetch, error} = useGetUsersQuery()
  const [ deleteUser ] = useDeleteUserMutation()
  const [ updateUser ] = useUpdateUserMutation()


  const [ editUserId, setEditUserId] = useState(null)
  const [ editUserName, setEditUserName] = useState("")
  const [ editUserEmail, setEditUserEmail] = useState("")



3️⃣ const deleteHandler = async (id) => {
  if (window.confirm("Are you sure")) {
    try {
   3️⃣   await deleteUser(id);
      
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
};

const toggleEdit = (id, username, email) => {
  setEditUserId(id);
  setEditUserName(username);
  setEditUserEmail(email);
};

3️⃣ const updateHandler = async(id)=>{

  try {

    await updateUser({id : id, username : editUserName, email : editUserEmail})
    setEditUserId(null)
    
    toast.success('User Updated successfully')
  } catch (error) {
    toast.error(error.data?.message || error.message)
    
  }


}



// const testWindow = window.confirm('are you kidding me ?')

  return (
    
    <div className="p-4">

      <h1 className="text-2xl font-semibold mb-4">Users List</h1>

      { isLoading ? 

      (<p>is Loading</p>) 

      : error ? 
      (
        <Message variant="danger">
          {error.data?.message || error.message }
        </Message>
      )
      :
      (
        <div className="bg-green-200 flex flex-col md:flex-row">

          <table className=" w-full md:w-4/5 mx-auto">

          <thead className="bg-blue-400">
            <tr className="bg-orange-400">
              <th className="px-4 py-2 text-left text-red-500">Id</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u)=>(
              

              <tr key={u._id} className="">
                <td className="px-4 py-2 bg-orange-700">{u._id}</td>

                <td className="px-4 py-2 bg-yellow-300">
                  {editUserId === u._id ?

                  (

                <div className="flex items-center">
                  
                      <input
            
                      type ='text'
                      value={editUserName}
                      onChange={e => setEditUserName(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      />

                      <button onClick={()=> 3️⃣ updateHandler(u._id)}
                      className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">

                      <FaCheckToSlot />
              
                      </button>
                    
                    </div>
                  ):
                  (
                    <div className="flex items-center justify-around">

                        {u.username} { '' }
                        <button onClick={()=> toggleEdit(u._id, u.username, u.email)}>

                          <FaEdit />

                        </button>

                    </div>
                  )}

                </td>
                <td className="px-4 py-2">
                    {editUserId === u._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editUserEmail}
                          onChange={(e) => setEditUserEmail(e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(u._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheckToSlot />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <a href={`mailto:${u.email}`}>{u.email}</a>{" "}
                        <button
                          onClick={() =>
                            toggleEdit(u._id, u.name, u.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {u.isAdmin ? (
                      <FaCheckToSlot style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {!u.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => 3️⃣ deleteHandler(u._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>
                    )}
                  </td>

                
              </tr>

          
            

              ))}
          </tbody>


          </table>

        </div>
      )
    
    }

      
    </div>
  )
}

export default UserList
```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>


- 1️⃣ `data`
  - read the doc for understand the role of data. here is for extract the data of all users
  - The latest returned result regardless of hook arg, if present.
  - here I write `data : users ` for the logic but I can write that's I want example `data : Moli`,  `data : Utilisateurs`

--

- 2️⃣ - add `refetch` in the object to useGetUsersQuery ? 

  - Don't need to use refetch due to RTK Query's automatic cache invalidation and updates
  - With this setup, when deleteUser or updateUser is called, it automatically invalidates the 'User' tag, causing any queries that provide this tag (like getUsers) to refetch

  - Benefit : Reduced boilerplate: You don't need to manually manage refetching.
  - Improved performance: RTK Query can optimize when and how to refetch data
  - Consistency: Your UI stays in sync with your server data automatically

--

- 3️⃣ `id` in the async function
  - Its' correspond to the id of the user to be deleted because on my server we use req.params.id , so with the trigger function to deleteUser(id) we pass this id is send on the back 
  - Here I write 'id' because it's a convention but I can write that I want 
  - When we call the updateHanlder or deleteHandler in the code jsx we have one paramter this the `user._id` so the 'id' in parameter to this function corresponding to the 'id' of the user on the server


- 4️⃣ `editUserId` explanation
  - This initializes editUserId as null, meaning no user is being edited initially.
  - `toggleEdit` When the edit button is clicked, this function sets editUserId to the ID of the user being edited.
  
  - ` await updateUser({id: id, username: editUserName, email: editUserEmail})
    setEditUserId(null)` 
    After a successful update, setEditUserId(null) is called, which exits edit mode.
    Preventing Multiple Edits:
    By having a single editUserId, the component ensures that only one user can be edited at a time

  - `editUserId` on JSX
      - When the edit button is clicked for a specific user, <span style="background:#b1ffff">toggleEdit</span> is called with that user's information.
      - It sets the editUserId to the ID of the user being edited  <span style="background:#b1ffff">function ToggleEdit</span>, effectively putting that user into edit mode. Also It sets editUserName and editUserEmail to the current values of the user's name and email.
      - By updating these three state variables (editUserId, editUserName, editUserEmail), it triggers a re-render of the component.
      - This re-render causes the UI to switch from displaying static user information to showing editable input fields for the selected user.
    - When toggleEdit is called, it causes this condition to become true for the selected user, switching their display to edit mode

  - `Facilitating Updates`
    - By setting up the edit state, toggleEdit prepares the component for potential updates to the user's information
    - The updateHandler function can then use the editUserName and editUserEmail states to send updated information to the server

  - `summary`
    - In the context of the entire program, <span style="background:#b1ffff">toggleEdit</span> acts as the bridge between the static display of user information and the interactive edit mode. It's typically triggered by a user action (clicking an edit button) and sets up the component state to reflect and manage the editing process for a specific user.
This function is a key part of creating an interactive and user-friendly interface for managing user data, allowing for in-place editing without the need for separate edit pages or forms.
    



### Why specify the effect dependencies ?

```jsx

useEffect(() => {
  // This runs after every render
});

useEffect(() => {
  // This runs only on mount (when the component appears)
  // That's means will only run on initial render
}, []);

useEffect(() => {
  // This runs on mount *and also* if either a or b have changed since the last render
}, [a, b]);

```

### Why add a cleanup ?




```jsx


import { useDeleteUserMutation } from "../../redux/api/userApiSlice"
import { useState } from "react"
import Message from "../../components/Message"

import { FaCheckToSlot } from "react-icons/fa6";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify'

const UserList = () => {


  const { data : users, isLoading, error} = useGetUsersQuery()
  const [ deleteUser ] = useDeleteUserMutation()



  const [ editUserId, setEditUserId] = useState(null)
  const [ editUserName, setEditUserName] = useState("")
  const [ editUserEmail, setEditUserEmail] = useState("")



const deleteHandler = async (id) => {
  if (window.confirm("Are you sure")) {
    try {
      await deleteUser(id);
      
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
};

const toggleEdit = (id, username, email) => {
  setEditUserId(id);
  setEditUserName(username);
  setEditUserEmail(email);
};



  return (
    
    <div className="p-4">

      <h1 className="text-2xl font-semibold mb-4">Users List</h1>

      { isLoading ? 

      (<p>is Loading</p>) 

      : error ? 
      (
        <Message variant="danger">
          {error.data?.message || error.message }
        </Message>
      )
      :
      (
        <div className="bg-green-200 flex flex-col md:flex-row">

          <table className=" w-full md:w-4/5 mx-auto">

          <thead className="bg-blue-400">
            <tr className="bg-orange-400">
              <th className="px-4 py-2 text-left text-red-500">Id</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u)=>(
              

              <tr key={u._id} className="">
                <td className="px-4 py-2 bg-orange-700">{u._id}</td>

                  <td className="px-4 py-2">
                    {!u.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteHandler(u._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>
                    )}
                  </td>

                
              </tr>

          
            

              ))}
          </tbody>


          </table>

        </div>
      )
    
    }

      
    </div>
  )
}

export default UserList

```

