import React from 'react'

import { useGetBrandQuery } from '../redux/api/productApiSlice'
import { Link, useLocation } from 'react-router-dom'

const Test2 = () => {

    

  const location = useLocation();

  const { data : dataQuery, isLoading, error, refetch } = useGetBrandQuery(location.pathname)


  
  
  if(isLoading) return `Loading...`
  if(error) return `Error`
  
  
  console.log(dataQuery);

  return (
   


 <div className='h-[100vh] w-full bg-orange-100'>

    { dataQuery.map((data)=>(


<div key={data._id}>
        
        <h1>{data.name}</h1>
</div>



    ))}
        
 </div>
      
    
  )
}

export default Test2
