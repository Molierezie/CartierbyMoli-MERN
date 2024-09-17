// ----------- Hook provide by react-router-dom -----------
import { Link } from 'react-router-dom'

// -------- Carousel
import CarouselHome from '@/components/CarouselHome'


// --------------- Export function from apiCategorySlice  ---------------
import {  useGetAllCategoryQuery } from "@/redux/api/categoryApiSlice";


// --------------- Style & Animation  ---------------

// -------- Image



import img1Home from '/assets/image1-home.png'
import imgBijoux from '/assets/img-Bijoux-home.png'
import imgEte from '/assets/img-ete-home.png'
import imgLunettes from '/assets/img-lunettes-home.png'
import imgMontre from '/assets/img-Montre-home.png'
import imgMontre2 from '/assets/img-montre2-home.png'
import imgParfum from '/assets/img-parfum-home.png'


// -------- AOS Scroll Animation
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from 'react'


import Footer from './Footer'




const Home = () => {
  
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
      
    });
  }, []);


  const { data : category , isLoading, error} = useGetAllCategoryQuery()

  if(isLoading) return `Loading...`
  if(error) return `Error`

  console.log(category);
  



  return (


    <>


    {/* { isLoading && (

    <Loaders />
    )} */}



        <div className=' bg-white'>


            {/* ----------------------- LIY COLLINS ----------------------- */}


            <div className="sm:h-[50vh] md:h-[52vh] lg:h-[80vh]">

                <div className="sm:px-[0rem] space-y-6 lg:px-28">

                    {/* <section className='sm:h-[20vh] bg-yellow-300 w-[100%] md:h-[30vh] lg:h-[50vh] hover:bg-red-400'> */}
                        <img src={img1Home} alt="" className='sm:object-cover object-center h-[20vh] w-[100%] md:h-[30vh] lg:h-[50vh]' />
                    {/* </section> */}

                    <div data-aos="fade-up" className="sm:flex flex-col justify-center items-center space-y-4 text-center mx-auto max-w-[75vw] md:max-w-[65vw] lg:max-w-[40vw]">

                        <p className="sm:font-bold uppercase sm:text-[0.9rem] md:text-[1.4rem] lg:text-[1.6rem]"> Les vacances très parisiennes de Lily Collins</p>
                        <p className="sm:text-[0.8rem] md:text-[1rem]">La plus parisienne des américaines le ton de la saison.</p>
                        <button className="sm:text-[0.8rem] md:text-[1rem]">Découvrir</button>


                    </div>

              
                </div>


            </div>


            {/* -------------- BIJOUX SOLAIRE / MONTRE ETE ----------------------- */}


            <section className="sm:h-[155vh] flex flex-col space-y-20 md:h-[155vh] lg:lg:h-[85vh] lg:flex-row gap-x-8 lg:space-y-[0px]">

                <div data-aos="fade-up" className="sm:flex flex-col justify-center items-center space-y-6 text-center lg:pl-28 lg:justify-start">


                    <img  src={imgBijoux} alt="" className='sm:h-[45vh] w-[100vw] md:h-[55vh] object-cover' />

            
                        <p className="sm:font-bold uppercase text-[0.9rem] mx-auto max-w-[75vw] md:max-w-[65vw] lg:max-w-[40vw]">BIJOUX SOLAIRES</p>
                        <p className="sm:text-[0.8rem] max-w-[75vw] mx-auto md:text-[1rem]">Des bijoux aussi savoureux qu’une escapade parisienne au cœur de l’été.</p>
                        <button className="sm:text-[0.8rem] md:text-[1rem]">Découvrir la sélection</button>

                        
                </div>


          
                <div data-aos="fade-up" className="sm:flex flex-col justify-center items-center space-y-6 text-center lg:pr-28 lg:justify-start">

              
                    <img src={imgMontre} alt="" className='sm:h-[45vh] w-[100vw] md:h-[55vh] object-cover' />


                        <p className="sm:font-bold uppercase text-[0.9rem] mx-auto max-w-[75vw] md:max-w-[65vw] lg:max-w-[40vw]">MONTRES À L’HEURE D’ÉTÉ</p>
                        <p className="sm:text-[0.8rem] max-w-[75vw] mx-auto md:text-[1rem]">Des montres qui prennent le temps de vivre avec élégance jusqu’au bout de l’été, jusqu’au bout de la nuit.</p>
                        <button className="sm:text-[0.8rem] md:text-[1rem]">Découvrir la sélection</button>


                </div>

            </section>

             {/* --------------------------- CAROUSEL PORODUCTS LOVE ----------------------------- */}

                
              <CarouselHome />

 
             {/* --------------------------- UN ETE PERSONNALISE ET ACCESOIRES DE SAISON ----------------------------- */}

        
             <div className="sm:h-[100vh] lg:h-[170vh]">


                <div className="sm:h-[50vh] flex flex-col justify-center items-center space-y-4 lg:px-28 lg:h-[90vh]">

                    {/* <section className='sm:bg-fuchsia-300 h-[20vh] w-[100%] md:h-[25vh] lg:h-[50vh]'>
                    </section> */}

                    <img src={imgEte} alt='image-été' className="sm:h-[20vh] w-[100%] md:h-[25vh] lg:h-[50vh] object-cover"/>

                     
                        <div data-aos="fade-up" className="sm:flex flex-col justify-center items-center space-y-4 text-center mx-auto max-w-[75vw] md:max-w-[65vw] lg:max-w-[40vw]">
                        

                            <p className="sm:font-bold uppercase sm:text-[1.1rem] md:text-[1.4rem] lg:text-[1.6rem]">un été personnalisé</p>
                            <p className="sm:text-[0.8rem] md:text-[1rem]">Beaucoup plus qu&apos;un détail.</p>
                            <button className="sm:text-[0.8rem] md:text-[1rem]">Personnaliser sa création</button>
                        </div>

                </div>


                <div className="sm:h-[50vh] flex flex-col justify-start items-center space-y-4 lg:px-28 lg:h-[80vh]">

                <img src={imgLunettes} alt='image-été' className="sm:h-[20vh] w-[100%] md:h-[25vh] lg:h-[50vh] object-cover"/>

                        <div data-aos="fade-up" className="sm:flex flex-col justify-center items-center space-y-6 text-center">

                            <p className="sm:font-bold uppercase sm:text-[1.1rem] md:text-[1.4rem] lg:text-[1.6rem]">accessoires de saison</p>
                            <p className="sm:text-[0.8rem] md:text-[1rem]">Des accesoires doués pour les beaux jours.</p>
                            <button className="sm:text-[0.8rem] md:text-[1rem]">Découvrir la sélection</button>
                        </div>

                    </div>



            </div>


              {/* --------------------- LES CREATIONS HORLOGERES ET PARFUM D'ETE ----------------------------- */}


            <section className="sm:h-[160vh] flex flex-col space-y-20 md:h-[155vh] lg:h-[90vh] lg:flex-row gap-x-8 lg:space-y-[0px]">

                <div data-aos="fade-up" className="sm:flex flex-col justify-center items-center space-y-6 text-center lg:pl-28 lg:justify-start">


                    <img src={imgMontre2} alt='image-été' className="sm:h-[45vh] bg-green-300 w-[100vw] md:h-[55vh] object-cover"/>


                        <p className="sm:font-bold uppercase text-[0.9rem] mx-auto max-w-[75vw] md:max-w-[65vw] lg:max-w-[40vw]">LES CRÉATIONS HORLOGÈRES CARTIER</p>
                        <p className="sm:text-[0.8rem] max-w-[75vw] mx-auto md:text-[1rem]">Chez Cartier, tout commence par le dessin. L&apos;obsession de la Maison pour les lignes épurées, les formes précises et les détails précieux se retrouve dans des objets au design à l’épreuve du temps.</p>
                        <button className="sm:text-[0.8rem] md:text-[1rem]">Découvrir</button>

                        
                </div>



                <div data-aos="fade-up" className="sm:flex flex-col justify-center items-center space-y-6 text-center lg:pr-28 lg:justify-start">

                <img src={imgParfum} alt='image-été' className="sm:h-[45vh] bg-green-300 w-[100vw] md:h-[55vh] object-cover"/>


                        <p className="sm:font-bold uppercase text-[0.9rem] mx-auto max-w-[75vw] md:max-w-[65vw] lg:max-w-[40vw]">PARFUMS D’ÉTÉ</p>
                        <p className="sm:text-[0.8rem] max-w-[75vw] mx-auto md:text-[1rem]">Des montres qui prennent le temps de vivre avec élégance jusqu’au bout de l’été, jusqu’au bout de la nuit.</p>
                        <button className="sm:text-[0.8rem] md:text-[1rem]">Découvrir la sélection</button>


                </div>

            </section>


           


        


                {/* --------------------------- SECTION NEWSLETTER ----------------------------- */}


                <section className="h-[30vh] p-8">


                    <div className="h-[25vh] border-t-[1px] border-black/60 border-b-[1px] flex flex-col justify-evenly items-center">

                        <p className="font-bold uppercase text-2xl">ABONNEZ-VOUS À NOTRE NEWSLETTER</p>

                        <Link to='/login'
                            className="max-w-32 bg-black items-center text-white justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-black duration-300 cursor-pointer active:scale-[0.98]"
                            >
                            <button className="px-5 py-2 uppercase"><a className="" href="">s&apos;abonner</a></button>
                            </Link>
                       


                    </div>

                </section>


                 {/* ---------------------------------------------------- SECTION FOOTER ---------------------------------------------- */}

                      <Footer />


        </div>

    
    
    </>
  )
}

export default Home
