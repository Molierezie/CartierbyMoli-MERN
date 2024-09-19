import React from 'react'
import { Link } from 'react-router-dom'
import HeartFav from '../pages/Products/HeartFav'


const Shop = ({ product}) => {

  return (

<>


<div className='flex flex-col'>




</div>

<div className=' sm:gap-y-10 w-[90vw] h-[150vh] bg-white grid sm:grid-cols-grid-shopSM md:grid-cols-grid-shopMD md:h-[50vh] md:w-[75vw] sm:gap-x-[2rem] md:gap-x-[12rem]  lg:w-[90vw] lg:gap-x-[20rem] xl:gap-x-[12rem]'>

{product.map((p)=>(



    <div key={p._id} className=' h-[70vh] sm:w-[35vw] md:w-[40vw] lg:w-[35vw] xl:w-[28vw] grid grid-rows-sub row-[span_5]   mx-auto text-center  hover:bg-white hover:border-2 border-solid border-black/20'>
    

    <HeartFav product={p}/>
   
    
      
      <img src={p.image} className='sm:w-[100%] p-4 md:h-[55vh] md:w-[100%] lg:w-[100%]  object-cover  object-center'/>
    
      <h3 className='uppercase font-bold max-w-[15rem] text-center mx-auto'>{p.name}</h3>
    
      <p>{p.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
    
    <Link to={`/product-details/${p._id}`}
              className="sm:w-[35vw] md:w-[40vw]  bg-black mx-auto lg:w-[10vw] h-[5vh] items-center text-white justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-black duration-300 cursor-pointer active:scale-[0.98]"
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