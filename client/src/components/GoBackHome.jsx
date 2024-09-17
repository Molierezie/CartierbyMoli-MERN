import React from 'react'
import { Link } from 'react-router-dom'

const GoBackHome = () => {
  return (


    <div className='h-[4vh] w-full bg-white flex justify-start'>
    <Link to="/" >Revenir à la page d'accueil</Link>
    </div>
  )
}

export default GoBackHome