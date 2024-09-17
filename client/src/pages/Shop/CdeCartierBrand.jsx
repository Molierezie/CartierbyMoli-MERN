import React from 'react'


// ----------- Hook provide by react-router-dom -----------
import { useLocation } from 'react-router-dom'


// --------------- Export function from apiProductSlice  ---------------
import { useGetBrandQuery } from '../../redux/api/productApiSlice'


// --------------- Reusable components  ---------------
import GoBackHome from '../../components/GoBackHome'
import ImageAndDesc from '@/components/ImageAndDesc.jsx'
import Shop from '../../components/Shop'


// --------------- Style & Animation  ---------------

// ----------Image

import imgCdeCartierBrand from '@public/assets/CdeCartierBrand.png'

const CdeCartierBrand = () => {


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
    
    image={imgCdeCartierBrand}
    title="C de Cartier"
    description="Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.."
    />

    <Shop
    product={brandProduct}
    />
    
    </div>
    
    </>
  )
}

export default CdeCartierBrand
