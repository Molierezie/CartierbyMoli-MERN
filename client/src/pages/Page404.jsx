import React from 'react' 

import { Link } from 'react-router-dom'


import page404 from '/assets/page404.png'

const Page404 = () => {
  return (
    
    <section className='h-[100vh] flex flex-col justify-center items-center text-center gap-y-8'>


        <div>
        <img src={page404} alt="page404" className='w-[20vw] h-20vh]'/>
        </div>

        <p className='text-[1.5rem] uppercase font-bold'>Désolés, une erreur s’est produite.</p>

        <p>La page que vous recherchez pourrait avoir été supprimée ou bien être temporairement indisponible.</p>

        <Link to="/" className='text-red-700'>Retourner à la page d'accueil</Link>



    </section>
  )
}

export default Page404
