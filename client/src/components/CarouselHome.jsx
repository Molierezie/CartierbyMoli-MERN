import React from 'react'

import { Link } from 'react-router-dom'

// -- FETCH PRODUCT --

import { useGetBrandLoveQuery } from '@/redux/api/productApiSlice'

// -- RESPONSIVE FOR CAROUSEL --
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Shop from '@/components/Shop';

import HeartFav from '@/pages/Products/HeartFav'

// import HeartIcon from '../pages/Products/HeartIcon';





const responsive = {

    xl: {
      breakpoint: { max: 3500, min: 1840 },
      items: 5,
    },
    lg: {
      breakpoint: { max: 1840, min: 760 },
      items: 3,
    },
    md: {
      breakpoint: { max: 760, min: 359 },
      items: 1,
    },
    sm: {
      breakpoint: { max: 359, min: 0 },
      items: 1,
    },
  };


  const CarouselHome = ()=>{

    const { data : product , isLoading, isError, error } = useGetBrandLoveQuery()

    if(isLoading) return `Loading...`
    if(isError || error ) return `Error`

    return(


        <section className='sm:h-[100vh] bg-gray-100 flex flex-col justify-center'>

        <h3 data-aos="fade-right"  className='mx-auto text-[4rem] mb-10'>LOVE</h3>

        <Carousel
            partialVisbile={false}
            swipeable={true}
            draggable={true}
            responsive={responsive}
            ssr={true}
            infinite
            autoPlay={true}
            autoPlaySpeed={6000}
            arrows={true}
            keyBoardControl={true}
            renderButtonGroupOutside={true}
            >
            {product.map((love) => (
        

                // <div key={love._id} className="h-[70vh] w-[20vw] grid grid-rows-sub row-[1/5]  mx-auto text-center  hover:bg-white hover:border-2 border-solid border-black/20">
                 <div key={love._id} className='sm:bg-white h-[70vh] w-[70vw] md:w-[30vw] xl:w-[20vw] grid grid-rows-sub row-[span_5]  mx-auto text-center  hover:bg-white hover:border-2 border-solid border-black/20'>

                    <HeartFav product={love}/>
                    <img src={love.image} alt='image-bijoux' className="sm:h-[35vh] w-[100%] p-4 object-cover"/>

                    <h3 className='uppercase font-bold'>{love.name}</h3>

                    <p>{love.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>

                    <Link to={`/product-details/${love._id}`}
                    className="bg-black items-center text-white justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-black duration-300 cursor-pointer active:scale-[0.98]"
                    >
                    <button className="px-5 py-2"><a className="" href="">Acheter</a></button>
                    </Link>

                </div>
            ))}
        </Carousel>

     </section>

    )
  }

  export default CarouselHome