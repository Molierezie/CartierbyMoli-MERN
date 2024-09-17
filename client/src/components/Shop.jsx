import React from 'react'
import { Link } from 'react-router-dom'
import HeartFav from '../pages/Products/HeartFav'


const Shop = ({ product}) => {

  return (

<>


<div className='flex flex-col'>




</div>

<div className='sm:gap-y-10 w-[100vw] h-[150vh] bg-white grid grid-cols-grid-test md:h-[50vh] md:w-[75vw] md:gap-x-[10rem] lg:w-[85vw] lg:gap-x-[2rem] xl:gap-x-[7rem]'>

{product.map((p)=>(



    <div key={p._id} className='sm:bg-white h-[70vh] sm:w-[50vw] md:w-[45vw]lg:w-[25vw] xl:w-[20vw] grid grid-rows-sub row-[span_5]   mx-auto text-center  hover:bg-white hover:border-2 border-solid border-black/20'>
    

    <HeartFav product={p}/>
   
    
      
      <img src={p.image} className='sm:w-[100%] p-4 md:h-[55vh] md:w-[100%] object-cover  object-center'/>
    
      <h3 className='uppercase font-bold max-w-[15rem] text-center mx-auto'>{p.name}</h3>
    
      <p>{p.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
    
    <Link to={`/product-details/${p._id}`}
              className="sm:w-[45vw]  bg-black mx-auto lg:w-[10vw] h-[5vh] items-center text-white justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-black duration-300 cursor-pointer active:scale-[0.98]"
    >
    <button className="px-5 py-2">Acheter</button>
    </Link>
    
    </div>
    
        ))}


</div>



</>
  )
}

export default Shop