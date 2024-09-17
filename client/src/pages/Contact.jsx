import React from 'react'

import ImageAndDesc from '../components/ImageAndDesc'

import contact from '/assets/contact.png'



const Contact = () => {
  return (

    <>
    
    <ImageAndDesc 

    image={contact}
    title="Nous contacter"
    description="Vous pouvez compter sur notre équipe d’experts pour répondre à toutes vos questions, aussi bien pour vous aider à passer vos commandes que pour vous conseiller en matière de style et vous proposer des idées cadeaux. N’hésitez pas à nous contacter, nous sommes là pour vous."
    
    
    />

      <div 
              className="sm:w-[35vw] mt-10 bg-black mx-auto lg:w-[20vw] h-[5vh] items-center text-white justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-black duration-300 cursor-pointer active:scale-[0.98]"
     >
    <button className="px-5 py-2">Nous contacter</button>
    </div>
    
   
    </>
    
  )
}

export default Contact
