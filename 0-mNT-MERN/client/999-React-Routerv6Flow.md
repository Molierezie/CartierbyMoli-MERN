# <font color="#00000">Page Navigation</font>

---

# <font color="#00b0f0">React-Router-v6</font> 

## <font color="#e36c09">Classic</font>

### <font color="#92cddc">What's it ?</font>

### <font color="#92cddc">use case ?</font>

### <font color="#b7dde8">Diagram - Analogy</font>


### <font color="#f79646">handle React-Router-v6</font>

#### <font color="#fac08f">Ressource</font>

#### <font color="#95b3d7">1 - Code before</font>

#### <font color="#95b3d7">1 - Task</font>

- Handle React Router DOM 


#### <font color="#4f81bd">1 - Solution</font>

#####  <font color=« #0000 »0>Step 1 - </font> <font color="#b2a2c7">🧩`main.jsx` component
</font>

```js

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowser, Route , createRoutesFromElements, RouteProvider} from 'react-router'


const routes = createBrowser(

createRoutesFromElements(

    <Route path="/" element={<App />}>


    <Route/>
)
    
)



ReactDOM.createRoot(document.getElementById('root')).render(


    <Provider store={store}>
        <RouteProvider router={routes} />
    </Provider>
  
)

```


# <font color="#00b0f0">1️⃣ - Theme</font> 

## 🤔 - <span style="background:#d3f8b6"><font color="#00b050">What's createBrowserRouter ?</font></span>


- `explanation`

	- `req.query`
            - 


- `What's createRoutesFromElement` ?



## 🤔 - <span style="background:#d3f8b6"><font color="#00b050">What's createRoutesFromElement ?</font></span>

- `explanation`


- `use case`




## 👨🏾‍💻 - <span style="background:#b1ffff"><font color="#002060">Practice</font></span>


### <font color="#7f7f7f">e.g - 1 simple</font>

`Code Before & Task`

```jsx

```

`Solution ✅`

```jsx

```

- 1️⃣ -
    - blabla

—

- 2️⃣ -
    - blabla





# <font color="#00b0f0">1️⃣ -  Router</font>

## <font color="#e36c09">👨🏾‍💻 - Practice with createBrowserRouter & createRouteFormElement </font>

### <font color="#95b3d7">1 - Code before</font>

🧩 in main.jsx

```jsx


```

### <font color="#95b3d7">1 - Task</font>

- a
- b
- c 

### <font color="#4f81bd">1  - Solution ✅ </font>

#### <font color="#b2a2c7">🧩 - in main.jsx</font>

##### <font color="#a5a5a5">💻 - Code</font>

```jsx

```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `index={true} `

	- In the provided code, the index={true} prop is used on the <Route> with the path '/', indicating that this route should be the default or landing page when the user visits the root path of the application.
    - When a user navigates to the root path (/), the <Home> component will be rendered instead of the <App> component, as the index={true} prop takes precedence over the parent <Route> with the same path.



## <font color="#492d050">Question about this topic</font>

### <font color="#c3d69b">Explanation createBrowserRouter, createRouteFormElement </font>

Is there possible to hide the password in the payload of the browser ?

#### answer

type="password" only cosmetically hides the password. The input value is always accessible via JS (using it's .value property). So when someone opens DevTools, he or she will be able to get the password regardless.


```jsx

import { useSelector, useDispatch} import ''


const userInfo = useSelector( (state) => state.auth.userInfo)

const { userInfo } = useSelector( (state) => state.auth)


userInfo && userInfo.isAdmin ? ( <Outlet/> ) : ( <Navigate="/home" replace />)


```


# UseParams e.g

hey this is my function in my ProductController file

js

export const fetchTest = asyncHandler(

  async(req, res)=>{


    
    
    try {

      const { id } = req.params

      const p = await Category.find({ _id : id})

      const product = await Product.find({

        category : p[0]._id

      })

      res.json(product)

      
    } catch (error) {

      res.status(400)
      throw new Error(error)
      
    }
    


  }
)


this is the route

js
router.get('/test-product/:id', fetchTest)


when I make a request in postman I get well the products with the specify category id

Now in the front-end I work with react redux toolkit query

this is the route for call api in productApiSlice

js

   getProductByCollection : builder.query({

            query : (id) =>({

                url : `${PRODUCT_URL}/test-product/${id}`,
            })
          })


I want in my navigation when I click on a category example if I click in the category "Haute Joaillerie" I get all the product in the category "Haute Joaillerie" as that works very well in postman

this is my route in main.jsx

jsx

 <Route path="test1/:id" element={< Test1/>} />


this is my component navigation.jsx

jsx

import { Link} from "react-router-dom";
import {  useGetAllCategoryQuery } from "@/redux/api/categoryApiSlice";


const Navbar = () => {

const { data : category , isLoading : isLoadingNavigation, error : errorNavigation} = useGetAllCategoryQuery()

if(isLoadingNavigation) return `Loading...`
if(errorNavigation) return `Error`

console.log(category);


return(

            <article className="sm:hidden lg:flex flex-wrap justify-evenly space-x-10 items-center pt-8 row-[3/3] col-span-3 uppercase h-[10vh]">
            
            <div className="flex flex-col justify-center items-center">

            <p className="hover:border-b-4 border-red-700 border-6 transition-all">Tous les produits</p>
            <p className="text-[0.7rem] lowercase">(Filtrer par catégorie et collection)</p>

            </div>
            
            <Link to={`test1/${category[0]._id}`}>
            <p className="hover:border-b-4 border-red-700 border-6 transition-all">Haute Joaillerie</p>
            </Link>


            <p onMouseOver={openJoaillerie} className="hover:border-b-4 border-red-700 border-6 transition-all">Joaillerie</p>

          
            <p className="hover:border-b-4 border-red-700 border-6 transition-all">Montre</p>

            <p className="hover:border-b-4 border-red-700 border-6 transition-all">Sac</p>

            <p className="hover:border-b-4 border-red-700 border-6 transition-all">Lunettes</p>

         

        </article>
)


}


and this is my component Test1 for display the product

jsx

import React from 'react'
import MenuShopFilter from '../components/MenuShopFilter'
import Shoop from '../components/Shoop'
import { useSelector } from 'react-redux'

import { useParams } from 'react-router'
import { useGetProductByCollectionQuery } from '@/redux/api/productApiSlice'
import {  useGetAllCategoryQuery } from "@/redux/api/categoryApiSlice";


const Test1 = () => {


  
  const { data : productsByCategory, isLoading : isLoadingTest1, error : errorTest1} = useGetProductByCollectionQuery()
  
  if(isLoadingTest1) return `Loading...`
  if(errorTest1) return `Error`
  
  console.log(productsByCategory);

  
  const { data : category , isLoading : isLoadingNavigation, error : errorNavigation} = useGetAllCategoryQuery()
  
  if(isLoadingNavigation) return `Loading...`
  if(errorNavigation) return `Error`
  
  console.log(category[0]._id);

  return (
   


    <div className='h-[250vh] w-[100vw] bg-white p-4'>

    <div className='sm:h-[150vh] w-full flex justify-evenly'>

      

      </div>

      </div>
        
      
    
  )
}

export default Test1


Why when I click example on my navigation on "Haute Joallerie" I have an error on my browser "@reduxjs_toolkit_query_react.js?v=a2c34962:109 GET http://localhost:5173/api/product/test-product/undefined 400 (Bad Request)"

response :

The error occurs because the id parameter, which should be passed to the useGetProductByCollectionQuery hook, is undefined. This leads to the request being made to http://localhost:5173/api/product/test-product/undefined, resulting in a 400 (Bad Request) error.

Key Points to Check and Fix:
Extract the id Parameter in Test1:

You need to use useParams to get the id parameter from the URL. This id should then be passed to the useGetProductByCollectionQuery hook.
Pass the id to the Query:

Ensure that the id from the URL is correctly passed as an argument to the useGetProductByCollectionQuery hook.

```jsx

 const { id } = useParams();

  // Use the 'id' to fetch products by category
  const { data: productsByCategory, isLoading: isLoadingTest1, error: errorTest1 } = useGetProductByCollectionQuery(id);

```

Explanation:
useParams:

This hook is used to extract route parameters from the URL. In your case, it's extracting the id parameter that corresponds to the category.
useGetProductByCollectionQuery(id):

The id is passed as an argument to the useGetProductByCollectionQuery hook, which then makes the API call to fetch products in that category.