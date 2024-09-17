import React from 'react'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetTopProductsQuery} from '@/redux/api/productApiSlice'
import { useSelector } from 'react-redux'

import Ratings from '@/pages/Products/Ratings'
import moment from 'moment'

import Carousel from 'react-multi-carousel'
import HeartFav from '@/pages/Products/HeartFav'






const ProductTabs = ({ product , userInfo, rating, setRating, comment, setComment, submitHandler, isLoadingReview}) => {



    // We create the state for the tabs
    const [ activeTab, setActiveTab ] = useState(1)



    if(isLoadingReview) return 'Loading'

    const { data : topProducts, isLoading : isLoadingTopProducts, isError : isErrorTopProducts } = useGetTopProductsQuery()


     if(isLoadingReview || isLoadingTopProducts) return 'Loading'

     if(isErrorTopProducts) return 'Error'


   


    const handleTab = (number)=>{

        setActiveTab(number)
    }


  

  return (
    

    <>
    

        <section className='sm:h-[100vh] flex flex-col md:flex-row md:h-[55vh]'>


            <div className='sm:flex flex-col justify-center items-center gap-y-8 w-[100%] h-[40vh] md:w-[50%] md:h-[100%] '>
                
                
                <div 
                className={`${activeTab === 1 ? "font-bold text-[2rem] " : "" } `}
                onClick={()=>handleTab(1)}
                >

                <p className='text-red-700 text-[1.5rem]'>Laissez votre avis</p>
             

                </div>
                

                <div 
                className={`${activeTab === 2 ? "font-bold text-[2rem]" : "" } `}
                onClick={()=>handleTab(2)}
                >

                <p className='text-red-700  text-[1.5rem]'>Voir tous les avis</p>
                

                </div>

                <div 
                className={`${activeTab === 3 ? "font-bold text-[2rem]'>" : "" } `}
                onClick={()=>handleTab(3)}
                >

                
                <p className='text-red-700 text-[1.5rem]'>Voir les produits du moment</p>

                </div>


            </div>

            {/* <div className='sm:flex flex-col justify-center items-center gap-y-8 w-[100%] h-[40vh] md:w-[50%] md:h-[100%] '> */}

            <div className='sm:bg-[#f9f9f9] w-[100%] flex justify-around items-center h-[50vh] md:w-[50%]'>


                { activeTab === 1 && (

                    
                    userInfo ? (

                        <form onSubmit={submitHandler} className='sm:bg-red-100 p-8 h-[40vh] w-[80%] flex flex-col justify-around'>


                            <div className='flex flex-col'>

                                    <label htmlFor='rating'>Veuillez laissez un avis</label>

                                    <select
                                    id='rating'
                                    value={rating}
                                    required
                                    onChange={(e)=>setRating(e.target.value)}
                                    >

                                        <option value=''></option>
                                        <option value='1'>Très mauvais</option>
                                        <option value='2'>Mauvais</option>
                                        <option value='3'>Bien</option>
                                        <option value='4'>Très bien</option>
                                        <option value='5'>Super</option>


                                    </select>


                            </div>



                            <div>


                            <label htmlFor='comment'>Laissez un commentaire</label>

                            <textarea
                            id='comment'
                            value={comment}
                            rows={3}
                            required
                            name='comment'
                            onChange={(e)=>setComment(e.target.value)}
                            className='w-[100%]'
                            >


                            </textarea>

                            </div>


                         

                            <div 
                                    className="sm:w-[45vw] bg-red-700 mx-auto md:w-[30vw] lg:w-[20vw] h-[5vh] items-center text-white justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-black duration-300 cursor-pointer active:scale-[0.98]"
                            >
                            <button className="px-5 py-2">Confimer votre avis</button>
                            </div>



                        </form>

        
                    ) :(

                        <Link to="/login">Pour ajouter un commentaire veuillez vous connectez ici</Link>
                    )

                )}

                { activeTab === 2 && (

                    <>

                    {product.reviews.length === 0 && (
                        <p>Il n'y a aucun commentaire pour le moment</p>
                    )}


                    {product.reviews.map((re)=>(

                        <div key={re._id} className='flex flex-col bg-red-100 w-[80%] h-[15vh]'>


                            <div>

                                <p>Noms utilisateur : {re.name}</p>

                                <p>Il y a {moment(re.createdAt).fromNow()}</p>


                            </div>


                                <p>Avis : {re.comment}</p>
                                <Ratings value={re.rating}/>     

                            <div>


                            </div>



                        </div>



                    ))}
                    
                    </>
                    

                )}

                { activeTab === 3 && (



                    // <div className='h-[50vh] grid grid-rows-repeat(5,1fr)'>

                    <div className='h-[50vh] grid '>

                    {/* <div className='h-[50vh] flex'> */}

                {/* //    DIFFERENCE SI j'UTILISE FLEX <div className='h-[50vh] flex'>  */}
        
                {topProducts.map((love)=>(


                        <div key={love._id} className="sm:w-[25vw] md:w-[15vw] grid grid-rows-sub row-[1/6] mx-auto text-center  hover:bg-white hover:border-2 border-solid border-black/20">

                        <HeartFav product={love}/>
                        <img src={love.image} alt='image-bijoux' className="sm:mx-auto h-[20vh] w-[30vw] md:w-[15vw] p-2 object-cover"/>

                        <h3 className='uppercase font-bold text-[0.7rem]'>{love.name} </h3>

                        <p>{love.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>

                        <Link to={`/product-details/${love._id}`}
                        className="sm:w-[15vw] h-[4vh] mx-auto md:w-[8vw] bg-black items-center text-white justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-black duration-300 cursor-pointer active:scale-[0.98]"
                        >
                        <button className="px-5 py-2"><a className="" href="">Acheter</a></button>
                        </Link>

                        </div>

                ))}
                     
                    
                    </div>
                    
                )}







            </div>




      </section>
    


    
    
    
    </>

       






  )
}

export default ProductTabs