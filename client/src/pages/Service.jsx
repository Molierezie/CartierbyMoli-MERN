import React from 'react'


import ImageAndDesc from '../components/ImageAndDesc'


import service from '/assets/service.png'
const Service = () => {
  return (
    

    <>
    
    <ImageAndDesc
    
        image={service}
        title="Services"
        description="Chez Cartier, le service est un art. Conseil, entretien, réparation, ajustement ou personnalisation : la Maison s’engage à créer une relation de confiance singulière, riche et vivante, avec chacun de ses clients et à l’inscrire dans le temps. Pour faire de chaque moment un rendez-vous entre vous et Cartier."
    
    >




    </ImageAndDesc>
    
      <div 
              className="sm:w-[35vw] mt-10 bg-black mx-auto lg:w-[20vw] h-[5vh] items-center text-white justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-black duration-300 cursor-pointer active:scale-[0.98]"
     >
    <button className="px-5 py-2">Demander un service</button>
    </div>
    
    </>
    
    
  )
}

export default Service