

// ----------- Hook provide by react-router-dom -----------
import { Link } from 'react-router-dom';
import moment from 'moment';

// --------------- Export function from apiProductSlice  ---------------
import { useAllProductsQuery} from '@/redux/api/productApiSlice';

// --------------- Reusable Components  ---------------
import GoBackHome from '@/components/GoBackHome';
import HeartFav from '@/pages/Products/HeartFav'

// --------------- Style & Animation  ---------------

// -------- react icons
import { FaArrowCircleRight } from "react-icons/fa";







const AllProductsList = () => {


  // In this components we take the data from the api which display all the products

  // When we cliked in one produict we are redirect in a specific product for update or delete

  const { data: products, isLoading, isError } = useAllProductsQuery();


  if(isLoading) return `Loading...`

  if(isError) return `Error`

  return (



    <div className="sm: bg-green-500 h-[500vh] w-[100vw]">

      <GoBackHome/>

      <p>Total Products: {products?.length}</p>


      <div className='sm:gap-y-10 w-[100vw] h-[500vh] bg-red-100 grid grid-cols-grid-test '>
  
  {products.map((product)=>(


  <div key={product._id} className='sm:bg-white h-[70vh] w-[50vw] md:w-[30vw] lg:w-[20vw] xl:w-[15vw] grid grid-rows-sub row-[span_5]  mx-auto text-center  hover:bg-white hover:border-2 border-solid border-black/20'>
  
      <HeartFav product={product}/>
      <p className="text-gray-400 text-xs"> {moment(product.createdAt).format("MMMM Do YYYY")}</p>
      
      <img src={product.image} className='sm:w-[100%] p-4 md:h-[55vh] md:w-[100%] object-cover object-center'/>

      <h3 className='uppercase font-bold'>{product.name}</h3>

      <p>{product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>

      <Link to={`/admin/product/update/${product._id}`} className='bg-red-500 mx-auto w-[15vw] h-[10vh] items-center text-white justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-black duration-300 cursor-pointer active:scale-[0.98]"'>
                <button className="px-5 py-2"><a className="" href="">  Update or Delete</a></button>
              
                <FaArrowCircleRight className='text-black w-8 h-6' />

              </Link>

    </div>

  ))}

    </div>



    </div>
  );
};

export default AllProductsList;