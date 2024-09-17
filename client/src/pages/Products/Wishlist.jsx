
// ----------- Hook provide by React -----------
import { useEffect } from 'react';

// --------------- function provide By Redux for the store and reducer  ---------------
import { useSelector } from "react-redux";


// ------------ Reusable component ---------------
import GoBackHome from '../../components/GoBackHome';
import Shop from '@/components/Shop';


// --------------- Style & Animation  ---------------

// -------- Scroll Animation
import AOS from "aos";
import "aos/dist/aos.css";



const Wishlist =()=>{

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
      
    });
  }, []);


const favorites = useSelector((state)=> state.favorites)


    return(


    
      
      <section className=' bg-white p-4'>

       
        <GoBackHome/>
        <div className='bg-red-700 h-[20vh] flex justify-center items-center mb-20 '>

          <p className='text-white font-bold text-3xl'> {favorites.length} article sauvegardé</p>
        </div>
      
      <Shop product={favorites}/>

      </section>
   
      
  




    )
}


export default Wishlist

