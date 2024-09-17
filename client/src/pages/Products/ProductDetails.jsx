

// ----------- Hook provide by React -----------
import { useState } from 'react'

// ----------- Hook provide by react-router-dom -----------
import { useParams , useNavigate} from 'react-router-dom'

// --------------- Export function from apiProductSlice  ---------------
import { useGetProductDetailsQuery, useCreateReviewMutation } from '@/redux/api/productApiSlice'

// --------------- function provide By Redux for the store and reducer  ---------------
import { useSelector, useDispatch } from 'react-redux'


// --------------- Export function from authSlice  ---------------
import { addToCart } from '@/redux/features/cart/cartSlice'

// --------------- Reusable Component  ---------------
import GoBackHome from '../../components/GoBackHome';
import Ratings from '@/pages/Products/Ratings'
import ProductTabs from '@/pages/Products/ProductTabs'


// --------------- Style & Animation  ---------------

// React-Icons
import { TbBrandMyOppo } from "react-icons/tb";
import { FaClock, FaStar, FaShoppingBasket, FaShoppingCart} from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { SiSinglestore } from "react-icons/si";
import moment from 'moment';

// ---------- Toast
import { toast } from 'react-toastify'

const ProductDetails = ()=>{

    const { userInfo } = useSelector((state)=>state.auth)



    // We set the state for the review
    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const dispatch = useDispatch()
    const navigate = useNavigate()


    // We retrieve the id from the path of the url
    const { id: productId} = useParams()

    const { data : products, isLoading, isError } = useGetProductDetailsQuery(productId)

 

    // we use the specific function for trigger Api call 
    const [ createReview, { isLoading: isLoadingReview } ] = useCreateReviewMutation()


    if(isLoading || isLoadingReview) return `Loading...`
    if(isError) return `Error`

    console.log(products)



    // we send the information for create product review with Api call

    const submitHandler = async (e) => {
        e.preventDefault();
    
        try {
          await createReview({
            productId,
            rating,
            comment,
          }).unwrap();
        //   refetch();
          toast.success("Review created successfully");
        } catch (error) {
          toast.error(error?.data || error.message);
        }
      };


      // after create the slice for the cart we send the information of the product 
      // and the quantity inisde the cart

      const handleToCart = ()=>{

        dispatch(addToCart({
            ...products,
            quantity
        }))
        navigate('/cart')

    }

      


    return(

        <>
            <section className=''>
                <GoBackHome/>


                <article className='h-[250vh] bg-white-300 p-4 md:h-[140vh]'>

                    <div className='sm:h-[160vh] grid grid-cols-grid-product-detail md:h-[80vh]'>


                        <div className='bg-white h-[80vh] flex flex-col justify-evenly'>

           
                
                            <img src={products.image} alt='' className='sm:w-[90vw] p-4 object-cover object-center h-[90%] mb-6'/>


                        </div>
                        

                        <div className='bg-white h-[80vh]'>

                            <div className='sm:bg-white h-[40vh] flex flex-col justify-evenly p-10 max-w-[30rem] md:max-w-[45vw]'>

                                <h1 className='font-bold text-[1.5rem]'>{products.name}</h1>

                                <p className='text-[0.8rem]'>{products.description}</p>

                                <p className='font-bold text-[1.5rem]'>{products.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>

                            </div>

                            <div className='sm:h-[40vh] flex'>

                           
                                <div className='sm:h-[40vh] w-[50%] flex flex-col justify-evenly p-10 text-[0.8rem] md:text-[1rem]'>


                                    <div className='flex justify-start items-center space-x-2'>
                                        <TbBrandMyOppo size={36} className='text-red-500'/>
                                        <p>Collection : {products.brand}</p>
                                    </div>

                                    <div className='flex justify-start items-center space-x-2'>
                                        <FaClock size={36} className='text-red-500'/>
                                        <p>Ajouté il y {moment().startOf('seconds').fromNow()}</p>
                                    </div>

                                    <div className='flex justify-start items-center space-x-2'>
                                        <MdOutlineRateReview size={36} className='text-red-500'/>
                                        <p>Avis : {products.numReviews}</p>
                                    </div>

                

                                    <Ratings
                                        value={products.rating}
                                        text={`${products.numReviews} reviews`}
                                        />


                                    <button
                                    onClick={handleToCart}
                                    disabled={products.countInStock === 0}
                                    className='flex justify-start items-center gap-4'>

                                    <FaShoppingCart size={38} className='text-black'/>
                                    <p>Ajouter au panier</p>

                                    </button>
                                    
                                   
                                </div>


                                <div className='sm:h-[40vh] w-[50%] flex flex-col justify-evenly p-10 text-[0.8rem] md:text-[1rem]'>


                                <div className='flex justify-start items-center space-x-2'>
                                        <FaStar size={36} className='text-red-500'/>
                                        <p>Note : {products.rating}</p>
                                    </div>
                                    
                                
                                    <div className='flex justify-start items-center space-x-2'>
                                        <FaShoppingBasket size={36} className='text-red-500'/>
                                        <p>Quantité : {products.quantity}</p>
                                    </div>


                                    <div className='flex justify-start items-center space-x-2'>
                                        <SiSinglestore size={36} className='text-red-500'/>
                                        <p>en stock : {products.countInStock}</p>
                                    </div>

                             
                                
                                    {products.countInStock > 0 && (
                                    <div>
                                        <select
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="p-2 w-[6rem] rounded-lg text-black"
                                        >
                                        {[...Array(products.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                            </option>
                                        ))}
                                        </select>
                                    </div>
                                    )}


                                </div>


                            </div>


                        </div>


                    </div>

                    {/* We handle the review in a components we send in the property/pros the necessary information */}

                    <ProductTabs 
                    isLoadingReview={isLoadingReview}
                    submitHandler={submitHandler}
                    userInfo={userInfo}
                    rating={rating}
                    setRating={setRating}
                    comment={comment}
                    setComment={setComment}
                    product={products}
                    />


                </article>



            </section>
        </>
    )
}

export default ProductDetails