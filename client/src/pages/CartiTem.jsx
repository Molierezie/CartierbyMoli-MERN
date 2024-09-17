

import React from 'react'

import { Link, Navigate, useNavigate } from 'react-router-dom'
import GoBackHome from '@/components/GoBackHome';

import { useSelector, useDispatch } from 'react-redux'

import { addToCart, removeFromCart } from '../redux/features/cart/cartSlice'
import { FaTrash } from "react-icons/fa";

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

    const handleRemoveCart = (id)=>{


        const confirm = window.confirm('Are you sure you want to delete this item ?')

        if(confirm){
            dispatch(removeFromCart(id))
        }
       
    }

    const checkoutHandler = () => {
        navigate("/login?redirect=/user/shipping");
      };
    
    
  

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

                <p className='text-[1rem] max-w-[20vw]'>{item.name}</p>
              


                <div className='bg-blue-500 flex justify-center items-center'>
                <select
            className='sm:h-[1.5rem w-[5vw] md:w-[15vw]'
            value={item.quantity}


            onChange={(e)=>handleCartQty(item, Number(e.target.value))}
            >
                { [...Array(item.countInStock)].keys().map((x)=>(

                <option
                disabled={item.countInStock === 0}
                key={x + 1}
                value={x + 1}
                >
                    {x + 1}
                </option>


                ))}

            </select>

            <FaTrash size={30} onClick={()=>handleRemoveCart(item._id)}/>

            </div>

            </div>
            <p className='text-[0.8rem]'>Collection : {item.brand}</p>
            <p className='text-[0.8rem] font-bold'>Prix un produit : {item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
           

    

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