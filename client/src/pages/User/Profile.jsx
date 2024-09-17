import React from 'react'

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useUpdateProfileMutation } from "../../redux/api/userApiSlice"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"



const Profile = () => {


  const { userInfo } = useSelector((state)=> state.auth)

// Here with useState for the info that we need in our back-end for the update user
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

// We add confirmPassword for more security
  const [ confirmPassword, setConfirmPassword ] = useState('')

  const dispatch = useDispatch()

   // profile : Thanks to the new object provide by the RTQ query powerful we create a function which trigger the API call for the register
    // We use also an object if there is a loading
    // refetch : We use refetch to make the data up to date that can be replace useEffect here
  const [ profile, { isLoading : isLoadingProfile, refetch } ] = useUpdateProfileMutation()


  if(isLoadingProfile) return `Chargement...`


  console.log(refetch);
  console.log(isLoadingProfile);


  // Here we use the useEffect for have the data of the user direclty
  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]
);


  const handleProfile = async (e)=>{

    e.preventDefault();

    if(password !== confirmPassword){ 
      toast.error("Passwords do not match")
  }else{

    try {


      // we send the date in the back-end
      // we set a specific ID because we need it in the back-end
      const res = await profile({
         _id : userInfo._id, 
         username,
         email,
         password}).unwrap()

      dispatch(setCredientials({...res}))
      refetch()
      
      toast.success("Profile updated successfully")
      
    } catch (error) {
      toast.error(error.data.message || error.error)
    }
  }

}

  return (
    <main className="h-[250vh] bg-blue-500 ">


        <section className='sm:h-[140vh] bg-rose-200 flex flex-col justify-start items-center space-y-10 p-6 md:items-center'>

           <p
           to="/login"
           >
            <h1>Edit profile</h1>
           </p>


            <form onSubmit={handleProfile} className="flex flex-col justify-start items-center space-y-10 p-6 md:items-center">


            <input
            className='sm:border-b-2 border-black w-[90vw] mt-6 sm:text-[0.9rem] md:w-[45vw] text-[1.1rem] p-1'
            type='text'
            id='username'
            value={username}
            placeholder='Rentrez votre nom d utilisateur'
            onChange={ (e) => setUsername(e.target.value)}
            >

            </input>

            <input
            className='sm:border-b-2 border-black w-[90vw] mt-6 sm:text-[0.9rem] md:w-[45vw] text-[1.1rem] p-1'
            type='email'
            id="email"
            value={email}
            placeholder='Rentrez votre adresse email'
            onChange={ (e) => setEmail(e.target.value)}
            >

            </input>


            <input
            className='sm:border-b-2 border-black w-[90vw] mt-6 sm:text-[0.9rem] md:w-[45vw] text-[1.1rem] p-1'
            type='password'
            placeholder='Rentrez votre mot de passe'
            id="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
            >

            </input>

            <input
            className='sm:border-b-2 border-black w-[90vw] mt-6 sm:text-[0.9rem] md:w-[45vw] text-[1.1rem] p-1'
            type='password'
            placeholder='Veuillez confirmer votre mot de passe'
            id="confirmPassword"
            value={confirmPassword}
            onChange={ (e) => setConfirmPassword(e.target.value)}
            >

            </input>


            <button 
          className='sm:h-[3rem] w-[90vw] rounded-full bg-black text-white md:w-[45vw] sm:text-[0.9rem] '
          disabled={isLoadingProfile}
          type="submit"

          >
            {isLoadingProfile ? 'Update In...' : 'Update'}
          </button>


            {isLoadingProfile && ( <span>LOADING</span>)}


            </form>

        


          

        </section>


      
    </main>
  )
}

export default Profile
