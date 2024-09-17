
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import React, { Suspense } from 'react'


// ----------- Hook provide by react-router-dom -----------

import {Route , createRoutesFromElements, RouterProvider} from 'react-router'
import { createBrowserRouter } from 'react-router-dom'


// ------------------- we handle the redux ------------------
import { Provider } from "react-redux";
import store from "./redux/store";


import { disableReactDevTools } from '@fvilers/disable-react-devtools';
if(process.env.NODE_ENV === 'production') disableReactDevTools()



// --------------------------------------------------------- //
// ---------------- ROUTE FOR AUTH ----------------------
// --------------------------------------------------------- //
// import Register from './pages/Auth/Register.jsx'
// import Login from './pages/Auth/Login.jsx'

const Register = React.lazy(() => import('./pages/Auth/Register.jsx'));
const Login = React.lazy(() => import('./pages/Auth/Login.jsx'));


// --------------------------------------------------------- //
// --------------------- REST OF ROUTES -----------------------
// --------------------------------------------------------- //

// import Home from './components/Home.jsx'
// import Contact from './pages/Contact.jsx'
// import Service from './pages/Service.jsx'


const Home = React.lazy(() => import('./components/Home.jsx'));
const Contact = React.lazy(() => import('./pages/Contact.jsx'));
const Service = React.lazy(() => import('./pages/Service.jsx'));
const Page404 = React.lazy(() => import('./pages/Page404.jsx'));


// --------------------------------------------------------- //
// ------------- ROUTE FOR PRODUCT ----------------------
// --------------------------------------------------------- //

// import Wishlist from './pages/Products/Wishlist.jsx'
// import ProductDetails from './pages/Products/ProductDetails.jsx'
// import Cart from './pages/CartiTem.jsx'

const Wishlist = React.lazy(() => import('./pages/Products/Wishlist.jsx'));
const ProductDetails = React.lazy(() => import('./pages/Products/ProductDetails.jsx'));
const Cart = React.lazy(() => import('./pages/CartiTem.jsx'));


// --------------------------------------------------------- //
// ---------------- ROUTE FOR SHOP ----------------------
// --------------------------------------------------------- //

// import HauteJoaileerie from './pages/Products/HauteJoaillerie.jsx'
// import Shop from './components/Shop.jsx'
// import ShopByCollection from './pages/ShopByCollection.jsx'
// import TrinityBrand from './pages/Shop/TrinityBrand.jsx'
// import LoveBrand from './pages/Shop/LoveBrand.jsx'
// import CdeCartierBrand from './pages/Shop/CdeCartierBrand.jsx'
// import PanthereDeCartierBrand from './pages/Shop/PanthereDeCartierBrand.jsx'
// import SantosBrand from './pages/Shop/SantosBrand.jsx'

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


// import PrivateRoute from './components/PrivateRoute.jsx'
// import Profile from './pages/User/Profile.jsx'
const PrivateRoute = React.lazy(() => import('./components/PrivateRoute.jsx'));
const Profile = React.lazy(() => import('./pages/User/Profile.jsx'));



// --------------------------------------------------------- //
// ---------------- ROUTE FOR USER ONLY ----------------------
// --------------------------------------------------------- //

// import AdminRoutes from './pages/Admin/AdminRoutes.jsx'
// import UserList from './pages/Admin/UserList.jsx'
// import CategoryList from './pages/Admin/CategoryList.jsx'
// import ProductList from './pages/Admin/ProductList.jsx'
// import AllProductsList from './pages/Admin/AllProductsList.jsx'
// import ProductUpdate from './pages/Admin/ProductUpdate.jsx'

const AdminRoutes = React.lazy(() => import('./pages/Admin/AdminRoutes.jsx'));
const UserList = React.lazy(() => import('./pages/Admin/UserList.jsx'));
const CategoryList = React.lazy(() => import('./pages/Admin/CategoryList.jsx'));
const ProductList = React.lazy(() => import('./pages/Admin/ProductList.jsx'));
const AllProductsList = React.lazy(() => import('./pages/Admin/AllProductsList.jsx'));
const ProductUpdate = React.lazy(() => import('./pages/Admin/ProductUpdate.jsx'));





import Test1 from './pages/Test1.jsx'
import Test2 from './pages/Test2.jsx'
import Test1Path from './pages/Test1Path.jsx'




// we use the function from react-router-v6
// we store the route inside a varibale and after we set this variable in the RouterProvider

// const router = createBrowserRouter(
// createRoutesFromElements(



// // the componennt app wrap all the routes
// // Inside the component app we set outlet for all the routes
// <Route path="/" element={<App />}>

   
// {/* // ----------------------------------------------------------------- //
// // -- ROUTE FOR EVRYONE INVITE (not user or admin), USER & ADMIN --- //
// // ---------------------------------------------------------------- // */}

//     <Route path='' element={<Home/>}/>
    

//     <Route path='Test1/:path' element={<Test1Path />} />
//     <Route path='Test1' element={<Test1 />} />
//     <Route path='Test2' element={<Test2 />} />

//     {/* Rest of Route  */}

//     <Route path="login" element={<Login />} />
//     <Route path='register' element={<Register />}/>
//     <Route path='*' element={ <Suspense fallback={<div>Loading...</div>}>
//               <Page404 />
//             </Suspense>}/>
//     <Route path="contact" element={<Contact />} />
//     <Route path="service" element={<Service />} />

//      {/* Route for Product */}

//     <Route path='wishlist' element={<Wishlist />} />
//     <Route path='product-details/:id' element={<ProductDetails />} />
//     <Route path='cart' element={<Cart />} />

//     {/* <Route for Shop */}

//     <Route path='shop' element={<Shop />} />
//     <Route path="shop-collection/:id" element={< ShopByCollection/>} />
//     <Route path='haute-joaillerie' element={<HauteJoaileerie />} />
//     <Route path='TRINITY' element={<TrinityBrand />} />
//     <Route path='PANTHERE-DE-CARTIER' element={<PanthereDeCartierBrand />} />
//     <Route path='LOVE' element={<LoveBrand />} />
//     <Route path='SANTOS' element={<SantosBrand />} />
//     <Route path='C-DE-CARTIER' element={<CdeCartierBrand />} />


// {/* // --------------------------------------------------------- //
// // ---------------- ROUTE FOR USER ONLY ----------------------
// // --------------------------------------------------------- // */}

//     <Route path='user' element={<PrivateRoute />}>

//     <Route path='profile' element={<Profile />} />


//     </Route>


// {/* // --------------------------------------------------------- //
// // ---------------- ROUTE FOR USER ONLY ----------------------
// // --------------------------------------------------------- // */}

//     <Route path='admin' element={<AdminRoutes/>}>
    
//     <Route path='user-list' element={<UserList />} />
//     <Route path='category-list' element={<CategoryList />} />
//     <Route path='product-list' element={<ProductList />} />
//     <Route path='all-product-list' element={<AllProductsList />} />
//     <Route path='product/update/:id' element={<ProductUpdate />} />

    
//     </Route>





// </Route>
// )
// )

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path='' element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
        <Route path='login' element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
        <Route path='register' element={<Suspense fallback={<div>Loading...</div>}><Register /></Suspense>} />
        <Route path='contact' element={<Suspense fallback={<div>Loading...</div>}><Contact /></Suspense>} />
        <Route path='service' element={<Suspense fallback={<div>Loading...</div>}><Service /></Suspense>} />
        <Route path='wishlist' element={<Suspense fallback={<div>Loading...</div>}><Wishlist /></Suspense>} />
        <Route path='product-details/:id' element={<Suspense fallback={<div>Loading...</div>}><ProductDetails /></Suspense>} />
        <Route path='cart' element={<Suspense fallback={<div>Loading...</div>}><Cart /></Suspense>} />
        <Route path='shop' element={<Suspense fallback={<div>Loading...</div>}><Shop /></Suspense>} />
        <Route path="shop-collection/:id" element={<Suspense fallback={<div>Loading...</div>}><ShopByCollection /></Suspense>} />
        <Route path='haute-joaillerie' element={<Suspense fallback={<div>Loading...</div>}><HauteJoaileerie /></Suspense>} />
        <Route path='TRINITY' element={<Suspense fallback={<div>Loading...</div>}><TrinityBrand /></Suspense>} />
        <Route path='LOVE' element={<Suspense fallback={<div>Loading...</div>}><LoveBrand /></Suspense>} />
        <Route path='SANTOS' element={<Suspense fallback={<div>Loading...</div>}><SantosBrand /></Suspense>} />
        <Route path='C-DE-CARTIER' element={<Suspense fallback={<div>Loading...</div>}><CdeCartierBrand /></Suspense>} />
        
        <Route path="*" element={<Suspense fallback={<div>Loading...</div>}><Page404 /></Suspense>} />
  
        <Route path='user' element={<Suspense fallback={<div>Loading...</div>}><PrivateRoute /></Suspense>}>
          <Route path='profile' element={<Suspense fallback={<div>Loading...</div>}><Profile /></Suspense>} />
        </Route>
  
        <Route path='admin' element={<Suspense fallback={<div>Loading...</div>}><AdminRoutes /></Suspense>}>
          <Route path='user-list' element={<Suspense fallback={<div>Loading...</div>}><UserList /></Suspense>} />
          <Route path='category-list' element={<Suspense fallback={<div>Loading...</div>}><CategoryList /></Suspense>} />
          <Route path='product-list' element={<Suspense fallback={<div>Loading...</div>}><ProductList /></Suspense>} />
          <Route path='all-product-list' element={<Suspense fallback={<div>Loading...</div>}><AllProductsList /></Suspense>} />
          <Route path='product/update/:id' element={<Suspense fallback={<div>Loading...</div>}><ProductUpdate /></Suspense>} />
        </Route>
      </Route>
    )
  );



ReactDOM.createRoot(document.getElementById('root')).render(


    //  As I say inside the store the Provider of Redux wrap all the App
    //  Inside the child is the route for all components
    <Provider store={store}>
            <RouterProvider router={router} />
    
    </Provider>

)
