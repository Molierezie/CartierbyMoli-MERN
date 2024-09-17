// ----------- Hook provide by react-router-dom -----------
import {useLocation } from 'react-router-dom'


// --------------- Export function from apiProductSlice  ---------------
import { useGetBrandQuery } from '../../redux/api/productApiSlice'

// --------------- Reusable components  ---------------
import Shop from '../../components/Shop'
import ImageAndDesc from '../../components/ImageAndDesc'
import GoBackHome from '../../components/GoBackHome'

// --------------- Style & Animation  ---------------

// ----------Image
import imgLoveBrand from '@public/assets/LoveBrand.png'


const LoveBrand = () => {


    // We use the hook with pathname for retrieve the url without the hostname 
    // Because in our back-end we get the product we don't use params ID but the a specific url
    const location  = useLocation()

    const {data : brandProduct , isLoading , isError , error} = useGetBrandQuery(location.pathname)

    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error</div>
    if(error) return <div>Error</div>


  return (
    <>

    <div className='w-[100vw] bg-white p-4'>
    <GoBackHome/>


        <ImageAndDesc 
        
        image={imgLoveBrand}
        title="Love"
        description="Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.."
        />
    
        <Shop
        product={brandProduct}
        />
        
        </div>
        </>
  )
}

export default LoveBrand
