

import React from 'react'


// ----------- Hook provide by react-router-dom -----------
import { useNavigate } from 'react-router-dom'


// --------------- Reusable Component  ---------------
import GoBackHome from '@/components/GoBackHome';

// --------------- function provide By Redux for the store and reducer  ---------------
import { useSelector, useDispatch } from 'react-redux'


// --------------- Export function from cartSlice  ---------------
import { addToCart, removeFromCart } from '../redux/features/cart/cartSlice'


// --------------- Style & Animation  ---------------

// React-Icons
import { FaTrash } from "react-icons/fa";

// ---------- Select
import Select from 'react-select'

const Cart = () => {

    
    const dispatch = useDispatch()
    const navigate = useNavigate()


    
     // The initialState inside the cart is an array of cartItems and itemsPrice
      // Here we want only the cartItesm for display in your navigation
      // So in the cart we get the length of cartItems
    const cart = useSelector((state)=> state.cartItem)

    const { cartItems } = cart


    console.log(cartItems);


    // Here when the user click we take the infos of the product and the quantity for the Slice
    const handleCartQty = (product, quantity)=>{

        dispatch(addToCart({...product, quantity}))
    }


    // here I take the specific Id to the user for the delete
    const handleRemoveCart = (id)=>{


        const confirm = window.confirm('Are you sure you want to delete this item ?')

        if(confirm){
            dispatch(removeFromCart(id))
        }
       
    }

    const checkoutHandler = () => {
        navigate("/login");
      };



    
      const options =  [
            
        { value : 0 , label : 0 },
         { value : 1 , label : 1 },
         { value : 2 , label : 2 },
         { value : 3 , label : 3 },
         { value : 4 , label : 4 },
         { value : 5 , label : 5 },
         { value : 6 , label : 6 },
         { value : 7 , label : 7 },
         { value : 8 , label : 8},
         { value : 9 , label : 9},
         { value : 10 , label : 10},
         { value : 11 , label : 11},

    ]
    
  

  return (

    <>

        <GoBackHome/>

        <section className='w-full flex flex-col justify-center items-center gap-y-10'>


       
            <div className='h-[10vh] w-full flex justify-center items-center'>
                <h3 className='text-red-500 font-bold text-[2.5rem]'>Mon Panier</h3>
            </div>

        {cartItems.map((item)=>(


        <div key={item._id} className='sm:h-[50vh] w-[55vw] flex flex-col justify-evenly items-start p-4 border-4 border-solid border-red-200'>

            <img src={item.image} alt={item.name} className='sm:h-[20vh] w-[30vw] mx-auto lg:h-[25vh] lg:w-[20vw]'/>


            <div className='flex justify-around items-center gap-x-2 lg:gap-x-20'>

                <p className='sm:text-[0.8rem] text-[1rem] max-w-[20vw]'>{item.name}</p>
              


                <div className='flex justify-center items-center'>

                    <Select
                    className='sm:h-[1.5rem w-[20vw] md:w-[15vw]'
                    onChange={(e)=>handleCartQty(item, Number(e.value))}
                    options={options}
                    defaultInputValue={item.quantity}
                    
                    />


                
       

            <FaTrash size={30} onClick={()=>handleRemoveCart(item._id)}/>

            </div>

            </div>
            <p className='text-[0.7rem]'>Collection : {item.brand}</p>
            <p className='text-[0.7rem] font-bold'>Prix un produit : {item.price?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
           

    

        </div>
            
                
                ))}

                <div>

                <p>Quantité : {cartItems.reduce((acc, item)=> acc + item.quantity, 0)}</p>
                <p>Prix Totale : {cartItems.reduce((acc, item)=> acc + item.quantity * item.price, 0)}</p>
              
                    <button
                    disabled={cartItems.length === 0}
                     onClick={checkoutHandler}
                      className="bg-red-500 items-center text-white justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-red-500 duration-300 cursor-pointer active:scale-[0.98]">Commander
                      </button>
                    

                </div>
                
                
                </section>
    
    </>
    
  )
}

export default Cart