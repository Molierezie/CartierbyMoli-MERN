import React from 'react'

// ----------- Hook provide by React -----------
import { useState, useEffect } from "react"

// ----------- Hook provide by react-router-dom -----------
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";


// --------------- function provide By Redux for the store and reducer  ---------------
import { useSelector, useDispatch } from "react-redux";

// --------------- Export function from authSlice  ---------------
import { logout } from "../../redux/features/auth/authSlice";

// --------------- Export function from apiUserSlice  ---------------
import { useLogoutMutation } from "../../redux/api/userApiSlice"

// ------------------ Export function from apiCategorySlice for get Category   ---------------
import {  useGetAllCategoryQuery } from "@/redux/api/categoryApiSlice";


// --------------- Style & Animation  ---------------

// -------- react icons
import { BiUserCircle } from "react-icons/bi";
import { CiMenuBurger, CiUser, CiHeadphones, CiHeart, CiShoppingBasket, CiBoxes, CiShop} from "react-icons/ci";
import { IoIosSearch, IoMdClose, IoIosArrowForward, IoMdLogOut} from "react-icons/io";
import {AiFillShopping } from "react-icons/ai";
import { MdOutlinePlace, MdOutlineRoomService, MdOutlineDashboardCustomize } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaRegHeart, FaHeart } from "react-icons/fa";

// ---------- Image for Sub menu Joaillerie  


import baguesJoaillerie from '/assets/bagueHome.png'
import boucle from '/assets/BoucleOreilleHome.png'
import collier from '/assets/collierHome.png'
import bracelet from '/assets/braceletHome.png'


// ---------- Toast
import { toast } from 'react-toastify'



// -------------- AOS Scroll Animation
import AOS from "aos";
import "aos/dist/aos.css";



const Navbar = () => {



    // we configure the animation
    useEffect(() => {
        AOS.init({
          once: true,
          duration: 700,
          easing: "ease-out-cubic",
          
        });
      }, []);


      // method useSelector is for display the actual state inside the store
      const favorites = useSelector((state)=> state.favorites)


      // we use the method .lenth to display the number of favorites
      const favCount = favorites.length

      // Here we get the cart
      const cart = useSelector((state)=> state.cartItem)

      // The initialState inside the cart is an array of cartItems and itemsPrice
      // Here we want only the cartItesm for display in your navigation
      // So in the cart we get the length of cartItems
      const cartCount = cart.cartItems.length

      console.log(cart.cartItems.length);
      

    
    
      // Here we get the userInfo data because our navigation depends on which is connected 
      // If the is an admin there was specific link 
      // If this is User there was specific link
    const { userInfo } = useSelector( (state)=> state.auth )
    

    console.log(userInfo);
    

    // state for open and hide the sidebar and subsubmenu Joaillerie
    const [ showSideBar, setShowSidebar] = useState(false);
    const [ showJoaillerie, setShowJoaillerie ] = useState(false)


    const openJoaillerie = ()=>{
        setShowJoaillerie(!showJoaillerie)
    }

    const closeJoaillerie = ()=>{
        showJoaillerie && setShowJoaillerie(false)
    }

    const openSidebar = ()=>{
        setShowSidebar(!showSideBar)
    }

    const closeSidebar = ()=>{
        showSideBar && setShowSidebar(false)
    }



    // dipatch thr specific function for send the data in the actions then in our store then in our reducer then in the specifi function in this reducer
    const dispatch = useDispatch()
    const navigate = useNavigate()


    // the powerful of RTQ Query the speficic function here "logoutApiCall" we can tell as you wish trigger the API call
    const [logoutApiCall] = useLogoutMutation()


    // Function for handle the logout
    // when the user click on the logout we call the logoutApiCall function
    // when we call on the server we trigger the function logiut
    // In the front-end we clear also the localStorage here when we call dispatch function
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


useEffect(()=>{

    !showSideBar && closeSidebar()

},[showSideBar])




// Here we use the speific function useGetAllCategoryQuery for get all the category
// When we click on a speficic category w

const { data : category , isLoading : isLoadingNavigation, error : errorNavigation} = useGetAllCategoryQuery()

if(isLoadingNavigation) return `Loading...`
if(errorNavigation) return `Error`

console.log(category);



  return (

    <>


    
     {/* --------------------------------------- NAVBAR MD - LG - XL --------------------------------------- */}

    <nav className="z-10 sm:h-[10vh] h-[20vh] sm:flex justify-between items-center lg:grid grid-cols-grid-col-nav grid-rows-grid-row-nav p-6 lg:h-[35vh]">

        <div className="sm:flex justify-end items-center space-x-4 lg:hidden">

            <CiMenuBurger onClick={openSidebar} className="sm:w-[8vw] h-[6vh]"/> 
            <IoIosSearch className="sm:w-[8vw] h-[6vh]"/>

        </div>

        <article className="sm:hidden lg:flex justify-start items-center row-[1/3] col-span-1  space-x-7 sm:text-[1.2rem] xl:text-[1.5rem]">

            {/* <p>France</p> */}
            <Link to="/">France</Link>
            <Link to="/contact">Contact</Link>
            <Link to="service">Services</Link>
          
        </article>

        <article className="lg:flex justify-center items-center row-[2/3] col-span-1">

            <Link to=''  data-aos="fade-right" className="sm:text-[2rem] font-bold font-dancing md:text-[3.2rem] xl:text-[4rem]">CartierByMoli</Link>
           

        </article>


            
            {/* // Here we use the state of userInfo for know if this is an user , admin or invited
            // beceause rhe navbar style depends of that */}

            { !userInfo ? 

            (
                <article className="sm:flex justify-end items-center row-[1/3] space-x-4">

    
                <Link to='/register'  className="sm:hidden lg:flex flex-col justify-center items-center space-y-2">
            
            <div className="bg-white lg:h-[150px] w-[50px] flex flex-col justify-center items-center">
            
            <h1 className="z-10 relative lg:top-[3.6rem] text-[1.5rem] text-transparent">{favCount}</h1>
            <CiUser  size={55} className="z-0 relative lg:bottom-[1rem] text-red-700 flex justify-center items-center"/>

            </div>

            </Link>


                <Link to='/wishlist'  className="sm:hidden lg:flex flex-col justify-center items-center space-y-2">
            
            <div className="bg-white lg:h-[150px] w-[60px] mt-2 flex flex-col justify-center items-center">
            
            <h1 className="z-10 relative lg:top-[1.8rem] text-[1.5rem] font-bold text-white">{favCount}</h1>
            <FaHeart  size={53} className="z-0 relative lg:bottom-[1rem] text-red-700 flex justify-center items-center "/>

            </div>

            </Link>


                <Link to='/cart'  className="sm:hidden lg:flex flex-col justify-center items-center space-y-2">
            
            <div className="bg-white lg:h-[150px] w-[55px] flex flex-col justify-center items-center">
            
            <h1 className="z-10 relative lg:top-[2.7rem] text-[1.5rem] font-bold text-red-700">{cartCount}</h1>
            <AiFillShopping  size={68} className="z-0 relative lg:bottom-[1rem] text-black flex justify-center items-center"/>

            </div>

            </Link>


                  </article>
            ) :

            userInfo && !userInfo.isAdmin ? 

            (

                <article className="sm:h-[15vh] flex justify-end  items-center row-[1/3] space-x-4">

                <Link to="/wishlist"   className="sm:hidden lg:flex flex-col justify-center items-center space-y-2">
                
                <CiHeart size={32} className=""/>
                <span className="text-[1rem]">Whislist</span>

                </Link>

                <Link to='/user/profile'  className="sm:hidden lg:flex flex-col justify-center items-center space-y-2">
                
                <BiUserCircle size={32} className=""/>
                <span className="text-[1rem] text-black">{userInfo.username}</span>

                </Link>


                
                
                <Link onClick={logoutHandler} to=''  className="lg:flex flex-col justify-center items-center space-y-2">
                
                <IoMdLogOut size={32} className=""/>
                <span className="text-[1rem] ">Déconnexion</span>
                </Link>



                  </article>
              
            ) :
            (
                <article className="h-[15vh] flex flex-wrap justify-center items-center row-[1/3] space-x-3">

               

                <Link to='' className="sm:hidden lg:flex flex-col justify-center items-center space-y-2 ">
                
                    <MdOutlineDashboardCustomize size={32} className="t"/>
                    <span className="text-[0.7rem] text-red-500">Dashboard</span>
                </Link>

                <Link to='/admin/product-list'    className="sm:hidden lg:flex flex-col justify-center items-center space-y-2">
                
                < CiShoppingBasket size={32} className=""/>
                <span className="text-[0.7rem] text-red-500">Créer Produits</span>
                </Link>

                <Link to='/admin/all-product-list'  className="sm:hidden lg:flex flex-col justify-center items-center space-y-2">
                
                <CiShop size={32} className=""/>
                <span className="text-[0.7rem] text-red-500">Les produits</span>
                </Link>

                <Link to='/cart'  className="sm:hidden lg:flex flex-col justify-center items-center space-y-2">
                
                <HiOutlineShoppingCart size={32} className=""/>
                <span className="text-[0.7rem] text-red-500">Commandes</span>
                </Link>
                

                <Link to='/admin/category-list'  className="sm:hidden lg:flex flex-col justify-center items-center space-y-2">
                
                <CiBoxes size={32} className=""/>
                <span className="text-[0.7rem] text-red-500">Créer Categories</span>
                </Link>

                <Link to='/admin/user-list'  className="sm:hidden lg:flex flex-col justify-center items-center space-y-2">
                
                <PiUsersThree size={32} className=""/>
                <span className="text-[0.7rem] text-red-500 ">Utilisateurs</span>
                </Link>

               
                
                <Link onClick={logoutHandler} to=''  className="lg:flex flex-col justify-center items-center space-y-2">
                
                <IoMdLogOut size={32} className=""/>
                <span className="text-[0.7rem] text-red-900 ">Déconnexion</span>
                </Link>



                  </article>
            ) 
         
            }




            <div className=" sm:hidden lg:flex flex flex-col justify-center items-center mt-[2rem]  row-[3/3] col-span-3 uppercase h-[15vh] sm:text-[1.2rem] lg:text-[1.4rem]">
                
       
         
        {/* <article  className="bg-white w-[80%] h-[8vh] sm:hidden lg:flex justify-center gap-[10rem] items-center uppercase  sm:text-[1.2rem] lg:text-[1.4rem] border-b-2 border-black"> */}
            
        <article  className="bg-white w-[75%] h-[8vh] sm:hidden lg:flex justify-center lg:gap-[2rem] xl:gap[7rem]  items-center uppercase  sm:text-[1rem]  border-b-4 border-black">


            <div className="ml-5">
            <p className="text-[1rem] w-[300px]">
                Rechercher par Collection
            </p>

            </div>

        <Link to='haute-joaillerie'> 
            <p className="hover:border-b-4 border-red-700 border-6 transition-all w-[195px]">Haute Joaillerie</p>
            </Link>
          
{/* 
            Here we use a condtionnal beacuse if the submenu is open we jhave to add a features to close it */}

            {!showJoaillerie ?  (<p onMouseOver={openJoaillerie} className="hover:border-b-4 border-red-700 border-6 transition-all">Joaillerie</p>) : (<p  onMouseOver={closeJoaillerie} className="text-[0.8rem] bg-red-700 p-4 text-white ">Survole moi pour fermer 😜</p>) }

          
         {/* Why we get the catgory the role is here because we are create a specific route in the back-end
         for fetch the products of a specific category we use the category id */}

            <Link to={`shop-collection/${category[4]._id}`}>
            <p className="hover:border-b-4 border-red-700 border-6 transition-all">Montre</p>
            </Link>

            <Link to={`shop-collection/${category[5]._id}`}>
            <p className="hover:border-b-4 border-red-700 border-6 transition-all">Sac</p>
            </Link>

            <Link to={`shop-collection/${category[6]._id}`}>
            <p className="hover:border-b-4 border-red-700 border-6 transition-all">Lunettes</p>
            </Link>


        </article>



        {/* <article className="bg-orange-300 w-[100%] h-[8vh] sm:hidden lg:flex  justify-center gap-[9.8rem] items-center uppercase  sm:text-[1.2rem] lg:text-[1.4rem] text-red-700"> */}

        <article className="w-[100%] h-[8vh] sm:hidden lg:flex  justify-center lg:gap-[3.1rem] xl:gap[6.5rem] items-center uppercase  sm:text-[1rem]  text-red-700">
       
       <div className="mr-7">

        <p className="text-[1rem]">
        Rechercher par Marque
            </p>
       </div>

        <Link to='TRINITY'> 
            <p className="hover:border-b-4 border-black border-6 transition-all">TRINITY</p>
            </Link>
          
            <Link to='LOVE'> 
            <p className="hover:border-b-4 border-black border-6 transition-all">LOVE</p>
            </Link>

            <Link to='C-DE-CARTIER'>
            <p className="hover:border-b-4 border-black border-6 transition-all">C DE CARTIER</p>
            </Link>

         
            <Link to='PANTHERE-DE-CARTIER'>
            <p className="hover:border-b-4 border-black border-6 transition-all">PANTHERE DE CARTIER</p>
            </Link>

            <Link to='SANTOS'>
            <p className="hover:border-b-4 border-black border-6 transition-all">SANTOS</p>
            </Link>



        </article>

        </div>


           
   


        {/* --------------------------------------- NAVBAR - SM --------------------------------------- */}
    
    {/* ------------ SIDEBAR ------------- */}

    <div className={ showSideBar ? "overflow-scroll transition-all duration-[2s] fixed grid grid-rows-15 top-0 left-0 h-screen z-10 w-[50%] bg-white sm:w-[100%]": "fixed grid grid-rows-9 top-0 left-[-100%] h-screen z-10 md:w-[50%] bg-white sm:w-[100%]"}>

        <div className="flex justify-between items-center p-8">

        <IoMdClose onClick={closeSidebar} size={38}/>

        <h1 className="text-2xl font-bold font-dancing justify-self-start">CartierByMoli</h1>

        </div>

     
        <Link onClick={showSideBar} to="haute-joaillerie" className="flex justify-between items-center p-8">

        <p className="uppercase">Haute Joaillerie</p>

        <IoIosArrowForward size={30} />

        </Link>

        <div className="flex justify-between items-center p-8">

            
        <Link onClick={showSideBar} to={`/shop-collection/${category[0]._id}`}>
                        <p className="hover:border-b-4 border-red-700 border-6 transition-all uppercase">Bagues</p>
        </Link>

        <IoIosArrowForward size={30} />

        </div>

        <div className="flex justify-between items-center p-8">

        <Link onClick={showSideBar} to={`/shop-collection/${category[3]._id}`}>
                    <p className="hover:border-b-4 border-red-700 border-6 transition-all uppercase">Collier</p>
            </Link>

            <IoIosArrowForward size={30} />

        </div>

        <div className="flex justify-between items-center p-8">


            
            <Link onClick={showSideBar} to={`/shop-collection/${category[1]._id}`}>
            <p className="hover:border-b-4 border-red-700 border-6 transition-all uppercase">Boucle d'Oreilles</p>
            </Link>

            <IoIosArrowForward size={30} />


        </div>


        <div className="flex justify-between items-center p-8">


            
            <Link onClick={showSideBar} to={`/shop-collection/${category[2]._id}`}>
            <p className="hover:border-b-4 border-red-700 border-6 transition-all uppercase">Bracelets</p>
            </Link>

            <IoIosArrowForward size={30} />


        </div>



        <div className="flex justify-between items-center p-8">

        <Link onClick={showSideBar} to={`/shop-collection/${category[4]._id}`}>
            <p className="hover:border-b-4 border-red-700 border-6 transition-all uppercase">Montre</p>
            </Link>

        <IoIosArrowForward size={30} />


        </div>

        <div className="flex justify-between items-center p-8">

        <Link onClick={showSideBar} to={`/shop-collection/${category[5]._id}`}>
            <p className="hover:border-b-4 border-red-700 border-6 transition-all uppercase">Sac</p>
            </Link>

        <IoIosArrowForward size={30} />

        </div>

       

   
        <div className="flex justify-between items-center p-8">

        <Link onClick={showSideBar} to={`/shop-collection/${category[6]._id}`}>
            <p className="hover:border-b-4 border-red-700 border-6 transition-all uppercase">Lunettes de Soleil</p>
            </Link>

        <IoIosArrowForward size={30} />


        </div>





        <div className="flex justify-between items-center p-8 bg-red-400">

            <Link onClick={showSideBar} to='LOVE' >
                <p className="hover:border-b-4 border-red-700 border-6 transition-all uppercase">LOVE</p>
                </Link>

            <IoIosArrowForward size={30} />


        </div>

        <div className="flex justify-between items-center p-8 bg-red-400">

            <Link onClick={showSideBar} to='TRINITY' >
                <p className="hover:border-b-4 border-red-700 border-6 transition-all uppercase">TRINITY</p>
                </Link>

            <IoIosArrowForward size={30} />

            </div>

            <div className="flex justify-between items-center p-8 bg-red-400">

            <Link onClick={showSideBar} to='SANTOS' >
                <p className="hover:border-b-4 border-red-700 border-6 transition-all uppercase">SANTOS</p>
                </Link>

            <IoIosArrowForward size={30} />

            </div>

            <div className="flex justify-between items-center p-8 bg-red-400">

                <Link onClick={showSideBar} to='PANTHERE-DE-CARTIER' >
                    <p className="hover:border-b-4 border-red-700 border-6 transition-all uppercase">PANTHERE DE CARTIER</p>
                    </Link>

                <IoIosArrowForward size={30} />

                </div>

                <div className="flex justify-between items-center p-8 bg-red-400">

                    <Link onClick={showSideBar} to='C-DE-CARTIER' >
                        <p className="hover:border-b-4 border-red-700 border-6 transition-all uppercase">C DE CARTIER</p>
                        </Link>

                    <IoIosArrowForward size={30} />

                    </div>



         <div onClick={showSideBar} className="bg-red-600 flex justify-start items-center p-8 space-x-4">


            <MdOutlinePlace size={30} className="text-white"/>
            <p className="uppercase text-white">France</p>


        </div>

        <Link to='/contact' onClick={showSideBar} className="bg-red-600 flex justify-start items-center p-8 space-x-4">

            <CiHeadphones size={30} className="text-white" />
            <p className="uppercase text-white">Contactez-nous</p>


        </Link>

        <Link to='/service' onClick={showSideBar} className="bg-red-600 flex justify-start items-center p-8 space-x-4">
        
            <MdOutlineRoomService size={30} className="text-white" />
            <p className="uppercase text-white">Services</p>

        </Link>


        <Link onClick={showSideBar} to="/wishlist" className="bg-red-600 flex justify-start items-center p-8  space-x-1">

      
        <FaHeart  size={40} className="text-white"/>
      
        {/* <FavCountSmall /> */}
        
        <p className="uppercase text-white">Ma wishlist</p>

        </Link>

    

{/* 
        <Link to='/wishlist'  className="sm:hidden lg:flex flex-col justify-center items-center space-y-2">
            
            <div className="bg-white lg:h-[150px] w-[80px] mt-2 flex flex-col justify-center items-center">
            
            <h1 className="z-10 relative lg:top-[2.8rem] text-[2rem] font-bold text-white">{favCount}aa</h1>
            <FaHeart  size={73} className="z-0 relative lg:bottom-[1rem] text-red-700 flex justify-center items-center "/>

            </div>

            </Link> */}
        
        

         {!userInfo ?
         
        (
            <div onClick={showSideBar} className="bg-red-600 flex justify-start items-center p-8 space-x-4">

            <CiUser size={30} className="text-white" />

            <Link to="/login" className="uppercase text-white">
            Connexion
            </Link>
          
            </div>
        ) :
        
        userInfo && !userInfo.isAdmin ?

        (

            <>
            
            <Link onClick={showSideBar} to='user/profile' className="bg-red-600 flex justify-start items-center p-8 space-x-4">
            
            <BiUserCircle size={30} className="text-white" />
            <p  className="uppercase text-white">
                Modifier le profil
            </p>
            
            </Link>

           

            <div onClick={showSideBar} className="bg-red-600 flex justify-start items-center p-8 space-x-4">

            <IoMdLogOut onClick={logoutHandler}  size={30} className="text-white" />
            <p onClick={logoutHandler}  className="uppercase text-white">
                Deconnexion
            </p>

            </div>

            </>

            
        ) :
        (


            <>
           
            <div  className="bg-red-600 flex justify-start items-center p-8 space-x-4">

            <MdOutlineDashboardCustomize onClick={showSideBar}   size={30} className="text-white" />
            <p  className="uppercase text-white">
                Dashboard
            </p>

            </div>

             <div className="bg-red-600 flex justify-start items-center p-8 space-x-4">

             <CiShoppingBasket onClick={showSideBar}  size={30} className="text-white" />
             <p  className="uppercase text-white">
                 Les produits
             </p>
 
             </div>

              <div className="bg-red-600 flex justify-start items-center p-8 space-x-4">

              <HiOutlineShoppingCart onClick={showSideBar}  size={30} className="text-white" />
              <p  className="uppercase text-white">
                  Les commandes
              </p>
  
              </div>

              <div className="bg-red-600 flex justify-start items-center p-8 space-x-4">

                <CiBoxes onClick={showSideBar}  size={30} className="text-white" />
                <p  className="uppercase text-white">
                    Catégories
                </p>

                </div>

              
               <div className="bg-red-600 flex justify-start items-center p-8 space-x-4">

               <PiUsersThree onClick={showSideBar}  size={30} className="text-white" />
               <p  className="uppercase text-white">
                   Les Utilisateurs
               </p>
   
               </div>

                <div className="bg-red-600  flex justify-start items-center p-8 space-x-4">

                <BiUserCircle onClick={showSideBar}  size={30} className="text-white" />
                <p  className="uppercase text-white">
                    Modifier le profil
                </p>
    
                </div>
                
            <div className="bg-red-600 flex justify-start items-center p-8 space-x-4">

            <IoMdLogOut onClick={logoutHandler}   size={30} className="text-white" />
            <p onClick={logoutHandler}  className="uppercase text-white">
                Deconnexion
            </p>

            </div>

            </>
        )
    }


        

        </div>

    </nav>




            {/* IF YOU MOUSEOVER THE CATEGORY JOALLERIE THE SUBMENU DISPLAY */}


            { showJoaillerie ? 
            
            <div className="bg-white z-10 h-[50vh] w-[90vw] mx-auto flex flex-col sticky top-[10rem]">

            <div className="h-[5vh] flex justify-center items-center border-t-4 border-black border-6">
                    <h3 className="text-red-700">Découvrez toutes les collections Joaillerie</h3>
            </div>

                <div className="h-[30vh] flex justify-evenly mt-8">

                    <div className="h-[25vh] w-[15vw] flex flex-col justify-center items-center gap-y-4">

                    
                        <Link to={`shop-collection/${category[0]._id}`}>
                        <p className="hover:border-b-4 border-red-700 border-6 transition-all">Bagues</p>
                        </Link>


                        <img src={baguesJoaillerie} alt="baguesJoaillerie" className="sm:bg-black h-[25vh] w-[20vw]" />

                        <Link to={`/shop-collection/${category[0]._id}`} className="sm:w-[13vw] h-[5vh] bg-black mx-auto md:h-[5vh] lg:w-[13vw] lg:h-[4vh] items-center text-white text-[0.7rem] justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-black duration-300 cursor-pointer active:scale-[0.98]">
                        <button className="px-5 py-2 "><a className="" href="">Voir toutes les collections</a></button>
                        </Link>
                      
                        
                    </div>

                    <div className="h-[25vh] w-[15vw] flex flex-col justify-center items-center gap-y-4">

                    <Link to={`shop-collection/${category[2]._id}`}>
                        <p className="hover:border-b-4 border-red-700 border-6 transition-all">Bracelets</p>
                        </Link>


                        <img src={bracelet} alt="baguesJoaillerie" className="sm:bg-black h-[25vh] w-[20vw]" />

                        <Link to={`/shop-collection/${category[2]._id}`} className="sm:w-[13vw] h-[5vh] bg-black mx-auto md:h-[5vh] lg:w-[13vw] lg:h-[4vh] items-center text-white text-[0.7rem] justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-black duration-300 cursor-pointer active:scale-[0.98]">
                        <button className="px-5 py-2 "><a className="" href="">Voir toutes les collections</a></button>
                        </Link>
                   
                    </div>

                    <div className="h-[25vh] w-[15vw] flex flex-col justify-center items-center gap-y-4">

                    <Link to={`/shop-collection/${category[3]._id}`}>
                        <p className="hover:border-b-4 border-red-700 border-6 transition-all">Collier</p>
                        </Link>


                        <img src={collier} alt="baguesJoaillerie" className="sm:bg-black h-[25vh] w-[20vw]" />

                        <Link to={`/shop-collection/${category[3]._id}`} className="sm:w-[13vw] h-[5vh] bg-black mx-auto md:h-[5vh] lg:w-[13vw] lg:h-[4vh] items-center text-white text-[0.7rem] justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-black duration-300 cursor-pointer active:scale-[0.98]">
                        <button className="px-5 py-2 "><a className="" href="">Voir toutes les collections</a></button>
                        </Link>
                        
                        </div>

                    <div className="h-[25vh] w-[15vw] flex flex-col justify-center items-center gap-y-4">

                  
                        <Link to={`shop-collection/${category[1]._id}`}>
                        <p className="hover:border-b-4 border-red-700 border-6 transition-all">Boucle d'Oreilles</p>
                        </Link>

                        <img src={boucle} alt="baguesJoaillerie" className="sm:bg-black h-[25vh] w-[20vw]" />

                        <Link to={`/shop-collection/${category[1]._id}`} className="sm:w-[13vw] h-[5vh] bg-black mx-auto md:h-[5vh] lg:w-[13vw] lg:h-[4vh] items-center text-white text-[0.7rem] justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-black duration-300 cursor-pointer active:scale-[0.98]">
                        <button className="px-5 py-2 "><a className="" href="">Voir toutes les collections</a></button>
                        </Link>
                                                
                    </div>

                </div>

          

               

                <div className="h-[10vh] flex justify-evenly items-center">

                    <div className="bg-red-700 h-[8vh] w-[15vw] flex justify-center items-center">
                        <p className="text-white uppercase text-[1rem] text-center">Les icônes cartier</p>
                    </div>

                    <div className="bg-red-700 h-[8vh] w-[15vw] flex justify-center items-center">
                    <p className="text-white uppercase text-[1rem] text-center">Personaliser votre création</p>
                    </div>

                    <div className="bg-red-700 h-[8vh] w-[15vw] flex justify-center items-center">
                    <p className="text-white uppercase text-[1rem] text-center">Nouvelles Création</p>
                    </div>

                    <div className="bg-red-700 h-[8vh] w-[15vw] flex justify-center items-center">
                    <p className="text-white uppercase text-[1rem] text-center">Sélection de bijoux pour lui</p>
                    </div>
                   

                </div>

             
            </div> : ''}




    </>
  )
}

export default Navbar
