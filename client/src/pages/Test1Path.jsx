import React from 'react'

import { useParams } from 'react-router'
const Test1Path = () => {


    const { path } = useParams()

    console.log(path);
    
  return (
    <div>


        <h1>Hello test 1 Path</h1>
      
    </div>
  )
}

export default Test1Path
