import React from 'react'

import { useGetBrandQuery } from '../redux/api/productApiSlice'

import { useParams ,  useLocation} from 'react-router'


const Test1 = () => {


  const location = useLocation();

  const { data : dataQuery, isLoading, error, refetch } = useGetBrandQuery(location.pathname)


  
  
  if(isLoading) return `Loading...`
  if(error) return `Error`
  
  
  console.log(dataQuery);

  return (
   

    <div className='h-[100vh] w-full bg-blue-100'>

    { dataQuery.map((data)=>(


<div key={data._id}>
        
        <h1>{data.name}</h1>
</div>



    ))}
        
 </div>
      
    
  )
}

export default Test1
