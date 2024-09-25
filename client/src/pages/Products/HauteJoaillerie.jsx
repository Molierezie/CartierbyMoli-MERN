import React from 'react'

// ----------- Hook provide by React -----------
import { useEffect } from 'react'

// --------------- Style & Animation  ---------------

// -------- Image

import hj0 from '/assets/hj0.png'
import hj1 from '/assets/hj1.png'
import hj2 from '/assets/hj2.png'
import hj3 from '/assets/hj3.png'
import hj4 from '/assets/hj4.png'

// -------- Video
import ReactPlayer from 'react-player'

// -------- AOS Scroll Animation
import AOS from "aos";
import "aos/dist/aos.css";

import Footer from '../../components/Footer'


const HauteJoaillerie = () => {

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
     
      
    });
  }, []);



  return (
    <div className='bg-white '>



 {/* --------------------------------- SECTION 1 ----------------------------------- */}

<div className="sm:h-[35vh] md:h-[52vh] lg:h-[70vh]">

<div className="sm:px-[0rem] space-y-6 lg:px-28">

    <section className='sm:h-[20vh] w-[100%] md:h-[30vh] lg:h-[50vh]'>
        <img src={hj0} alt="image Voyage recommencé " className='sm:object-cover object-center h-[20vh] w-[100%] md:h-[30vh] lg:h-[50vh]' />
    </section>

    <div data-aos="fade-up" className="sm:flex flex-col justify-center items-center space-y-4 text-center mx-auto max-w-[75vw] md:max-w-[65vw] lg:max-w-[40vw]">

        <p className="sm:font-bold uppercase sm:text-[0.9rem] md:text-[1.4rem] lg:text-[1.6rem]">Le voyage recommencé</p>
        <p className="sm:text-[0.8rem] md:text-[1rem]">Un voyage comme une traversée, où les savoir-faire et les registres créatifs de la Maison sont revus à la lumière d’un prisme nouveau..</p>
        {/* <button className="sm:text-[0.8rem] md:text-[1rem] border-b-2 border-black">Découvrir La nouvelle collection</button> */}


    </div>


</div>


</div>


 {/* --------------------------------- SECTION 2 ----------------------------------- */}

<div className="sm:h-[30vh] md:h-[52vh] lg:h-[60vh]  mt-[7rem] lg:mt-0 lg:w-full">

<div className="sm:px-[0rem] space-y-6 lg:px-28  ">

    <section className='sm:h-[20vh]  sm:w-[100vw] lg:w-[85vw] md:h-[30vh] lg:h-[60vh]  flex justify-center items-center'>

        <ReactPlayer url='https://www.youtube.com/watch?v=I9doXIK-TW4' className='sm:h-[100vh] sm:w-[100vw] md:h-[100%] lg:h-[100%]' muted={true} loop playing  />
    </section>

</div>


</div>


 {/* --------------------------------- SECTION 3 ----------------------------------- */}



    <div className='sm:h-[80vh] sm:w-full  sm:flex-none lg:flex lg:h-[60vh]  '>

        <div className='sm:h-[40vh] w-full  md:h-[50vh]'>

          <img src={hj1} alt='image Collier Lerro' className='sm:h-[40vh] sm:w-[100%] md:h-[50vh]' />

        </div>

        <div className=' sm:h-[40vh] md:h-[30vh] lg:h-[50vh] sm:w-[100vw]  sm:flex flex-col justify-center  space-y-4 text-center mx-auto max-w-[75vw] md:max-w-[65vw] lg:max-w-[40vw]"'>

        <p className="sm:font-bold uppercase sm:text-[0.9rem] md:text-[1.4rem] lg:text-[1.6rem] lg:max-w-[30rem] mx-auto">Collier Lerro</p>
        <p data-aos="fade-up" className="sm:text-[0.8rem] md:text-[1rem]  lg:max-w-[30rem] mx-auto">Jaillissant de trois émeraudes de Colombie pour 5,62 carats, un entrelacs graphique de lignes pavées électrise cette création. Le jeu des pleins et des vides accentue l’impression de mouvement et les diamants tapers décuplent l'énergie de ce design en tension. 

.</p>
  
        </div>

    </div>


  {/* --------------------------------- SECTION 4 ----------------------------------- */}

  <div  className='sm:h-[80vh] sm:w-full  sm:flex-none lg:h-[60vh]  lg:flex flex-row-reverse sm:mt-0  '>

<div className='sm:h-[40vh] w-full  md:h-[50vh]'>

  <img src={hj2} alt='Image Bague Eximis' className='sm:h-[40vh] sm:w-[100%] md:h-[50vh]' />

</div>

<div className=' sm:h-[40vh] md:h-[30vh] lg:h-[50vh] sm:w-[100vw]  sm:flex flex-col justify-center  space-y-4 text-center mx-auto max-w-[75vw] md:max-w-[65vw] lg:max-w-[40vw]"'>

<p className="sm:font-bold uppercase sm:text-[0.9rem] md:text-[1.4rem] lg:text-[1.6rem] lg:max-w-[30rem] mx-auto">Bague Eximis</p>
<p data-aos="fade-up" className="sm:text-[0.8rem] md:text-[1rem] lg:max-w-[30rem] mx-auto">D’un singulier diamant fancy brun-jaune d’un poids de 4,15 carats de taille losange, Cartier fait le centre d’une bague tout en volume. Autour, des diamants blancs triangulaires composent une structure fractale, clivée en fragments symétriques.

.</p>


</div>

</div>



  {/* --------------------------------- SECTION 5 ----------------------------------- */}



  <div className='sm:h-[80vh] sm:w-full  sm:flex-none lg:h-[60vh]  lg:flex  sm:mt-0  '>

<div className='sm:h-[40vh] w-full  md:h-[50vh]'>

  <img src={hj3} alt='Image Collier Spina' className='object-cover sm:h-[40vh] sm:w-[100%] md:h-[50vh]' />

</div>

<div className=' sm:h-[40vh] md:h-[30vh] lg:h-[50vh] sm:w-[100vw]  sm:flex flex-col justify-center  space-y-4 text-center mx-auto max-w-[75vw] md:max-w-[65vw] lg:max-w-[40vw]"'>

<p className="sm:font-bold uppercase sm:text-[0.9rem] md:text-[1.4rem] lg:text-[1.6rem] lg:max-w-[30rem] mx-auto">Collier Spina
</p>
<p data-aos="fade-up" className="sm:text-[0.8rem] md:text-[1rem] lg:max-w-[30rem] mx-auto">Lignes brisées, alternance de diamants, de saphirs et d’ajours composent le design éblouissant de ce collier souple comme une étoffe. Au centre, un alignement de deux diamants coussins pour 4,56 carats et d’un saphir de Ceylan de 29,16 carats. Pivotant sur elle-même, la création devient diadème. 
.</p>


</div>

</div>


   {/* --------------------------------- SECTION 6 ----------------------------------- */}


  <div  className='sm:h-[80vh] sm:w-full  sm:flex-none lg:h-[60vh]  lg:flex flex-row-reverse sm:mt-0  '>

<div className='sm:h-[40vh] w-full  md:h-[50vh]'>

  <img src={hj4} alt='image bague Ondule' className='object-cover sm:h-[40vh] sm:w-[100%] md:h-[50vh]' />

</div>

<div className=' sm:h-[40vh] md:h-[30vh] lg:h-[50vh] sm:w-[100vw]  sm:flex flex-col justify-center  space-y-4 text-center mx-auto max-w-[75vw] md:max-w-[65vw] lg:max-w-[40vw]"'>

<p className="sm:font-bold uppercase sm:text-[0.9rem] md:text-[1.4rem] lg:text-[1.6rem] lg:max-w-[30rem] mx-auto">Bague Ondule
</p>
<p data-aos="fade-up" className="sm:text-[0.8rem] md:text-[1rem] lg:max-w-[30rem] mx-auto">Des pierres naissent l’émotion et l’intuition du sublime. D'un diamant gris-violet fancy de 0,92 carat exceptionnel par la rareté de sa couleur et l’importance de son poids, les joailliers Cartier ont fait le centre d’une architecture miniature. Tout autour, des diamants demi-lune diffusent leur éclat et transfigurent forme et brillance en un halo mystérieux.

.</p>


</div>

</div>


<Footer />
      
    </div>
  )
}

export default HauteJoaillerie
