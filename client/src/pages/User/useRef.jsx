import { buildCreateApi } from '@reduxjs/toolkit/query'
import React from 'react'
import { useRef, useEffect, useState } from 'react'

const LearnUseRef = () => {


    const elementRef = useRef(null)
    const buttonRef = useRef(null)


    const [ value, setValue ] = useState(false)


    const handleValue = ()=>{

        setValue(!value)
    }

    console.log(elementRef);


    useEffect(()=>{

        console.log('Change');
        
    }, [elementRef])
    
    
    
    const handleRef = ()=>{

        elementRef.current.style.color = "red"
       
    }



    // console.log(buttonRef);

  return (


    <>
        <div onClick={handleRef} ref={elementRef} >NEW ARRIVALS</div>


        <h1>Hello</h1>

        <button onMouseOver={handleRef} ref={elementRef}>Submit</button>

        <button onClick={handleValue}>Value</button>
    </>

  )
}

export default LearnUseRef