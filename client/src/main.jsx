
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import React, { Suspense } from 'react'

import 'core-js/stable';
import 'regenerator-runtime/runtime';



// ----------- Hook provide by react-router-dom -----------


import { createBrowserRouter, Route , createRoutesFromElements, RouterProvider } from 'react-router-dom'


// ------------------- we handle the redux ------------------
import { Provider } from "react-redux";
import store from "./redux/store";




const Register = React.lazy(() => import('./pages/Auth/Register.jsx'));
const Login = React.lazy(() => import('./pages/Auth/Login.jsx'));


// --------------------------------------------------------- //
// --------------------- REST OF ROUTES -----------------------
// --------------------------------------------------------- //




const Home = React.lazy(() => import('./components/Home.jsx'));
const Contact = React.lazy(() => import('./pages/Contact.jsx'));
const Service = React.lazy(() => import('./pages/Service.jsx'));
const Page404 = React.lazy(() => import('./pages/Page404.jsx'));


// --------------------------------------------------------- //
// ------------- ROUTE FOR PRODUCT ----------------------
// --------------------------------------------------------- //



const Wishlist = React.lazy(() => import('./pages/Products/Wishlist.jsx'));
const ProductDetails = React.lazy(() => import('./pages/Products/ProductDetails.jsx'));
const Cart = React.lazy(() => import('./pages/CartiTem.jsx'));


// --------------------------------------------------------- //
// ---------------- ROUTE FOR SHOP ----------------------
// --------------------------------------------------------- //



const HauteJoaileerie = React.lazy(() => import('./pages/Products/HauteJoaillerie.jsx'));
const Shop = React.lazy(() => import('./components/Shop.jsx'));
const ShopByCollection = React.lazy(() => import('./pages/ShopByCollection.jsx'));
const TrinityBrand = React.lazy(() => import('./pages/Shop/TrinityBrand.jsx'));
const LoveBrand = React.lazy(() => import('./pages/Shop/LoveBrand.jsx'));
const CdeCartierBrand = React.lazy(() => import('./pages/Shop/CdeCartierBrand.jsx'));
const PanthereDeCartierBrand = React.lazy(() => import('./pages/Shop/PanthereDeCartierBrand.jsx'));
const SantosBrand = React.lazy(() => import('./pages/Shop/SantosBrand.jsx'));


// --------------------------------------------------------- //
// ---------------- ROUTE FOR USER ONLY ----------------------
// --------------------------------------------------------- //


const PrivateRoute = React.lazy(() => import('./components/PrivateRoute.jsx'));
const Profile = React.lazy(() => import('./pages/User/Profile.jsx'));



// --------------------------------------------------------- //
// ---------------- ROUTE FOR USER ONLY ----------------------
// --------------------------------------------------------- //



const AdminRoutes = React.lazy(() => import('./pages/Admin/AdminRoutes.jsx'));
const UserList = React.lazy(() => import('./pages/Admin/UserList.jsx'));
const CategoryList = React.lazy(() => import('./pages/Admin/CategoryList.jsx'));
const ProductList = React.lazy(() => import('./pages/Admin/ProductList.jsx'));
const AllProductsList = React.lazy(() => import('./pages/Admin/AllProductsList.jsx'));
const ProductUpdate = React.lazy(() => import('./pages/Admin/ProductUpdate.jsx'));





const router = createBrowserRouter(
    createRoutesFromElements(
  

      <Route path="/" element={<App />}>

   
{/* // ----------------------------------------------------------------- //
// -- ROUTE FOR EVRYONE INVITE (not user or admin), USER & ADMIN --- //
// ---------------------------------------------------------------- // */}

    <Route path='' element={<Home/>}/>
    

    {/* <Route path='Test1/:path' element={<Test1Path />} />
    <Route path='Test1' element={<Test1 />} />
    <Route path='Test2' element={<Test2 />} /> */}

    {/* Rest of Route  */}

    <Route path="login" element={<Login />} />
    <Route path='register' element={<Register />}/>
    <Route path="*" element={<Page404 />} />
    <Route path="contact" element={<Contact />} />
    <Route path="service" element={<Service />} />

     {/* Route for Product */}

    <Route path='wishlist' element={<Wishlist />} />
    <Route path='product-details/:id' element={<ProductDetails />} />
    <Route path='cart' element={<Cart />} />

    {/* <Route for Shop */}

    <Route path='shop' element={<Shop />} />
    <Route path="shop-collection/:id" element={< ShopByCollection/>} />
    <Route path='haute-joaillerie' element={<HauteJoaileerie />} />
    <Route path='TRINITY' element={<TrinityBrand />} />
    <Route path='PANTHERE-DE-CARTIER' element={<PanthereDeCartierBrand />} />
    <Route path='LOVE' element={<LoveBrand />} />
    <Route path='SANTOS' element={<SantosBrand />} />
    <Route path='C-DE-CARTIER' element={<CdeCartierBrand />} />


{/* // --------------------------------------------------------- //
// ---------------- ROUTE FOR USER ONLY ----------------------
// --------------------------------------------------------- // */}

    <Route path='user' element={<PrivateRoute />}>
    <Route path='profile' element={<Profile />} />

    </Route>


{/* // --------------------------------------------------------- //
// ---------------- ROUTE FOR USER ONLY ----------------------
// --------------------------------------------------------- // */}

    <Route path='admin' element={<AdminRoutes/>}>
    
    <Route path='user-list' element={<UserList />} />
    <Route path='category-list' element={<CategoryList />} />
    <Route path='product-list' element={<ProductList />} />
    <Route path='all-product-list' element={<AllProductsList />} />
    <Route path='product/update/:id' element={<ProductUpdate />} />

    
    </Route>





</Route>
    )
  );



ReactDOM.createRoot(document.getElementById('root')).render(


    //  As I say inside the store the Provider of Redux wrap all the App
    //  Inside the child is the route for all components
    
    <Provider store={store}>
              <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
            </Suspense>
    </Provider>

)
