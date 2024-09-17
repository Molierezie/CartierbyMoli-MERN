import React from 'react'

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from 'react'


// this component display an image and a description is use in all page with shop
// We use a children props because we don't want write the sme description in every page
const ImageAndDesc = ({ image, title, description, children}) => {

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
      
    });
  }, []);

  return (
   


  <div className='bg-[#f9f9f9] h-[50vh] w-full flex'>

    
  <img src={image} className='w-[50%] object-cover object-center'/>

  <div data-aos="fade-up" className='bg-[#f9f9f9] h-[50vh] w-[50%]  flex flex-col justify-center items-center gap-y-12 text-center'>

    <h3 className='sm:uppercase font-bold text-[1.2rem] max-w-[28vw] md:text-[2rem] md:max-w-[38vw] bg-[#f9f9f9]'>{title}</h3>

    <p className='sm:max-w-[25vw] text-[0.7rem] md:text-[1rem]'>
      {description}
    </p>

    { children && (

      <p>{children}</p>
    )}



  </div>

</div>
      
    
  )
}

export default ImageAndDesc