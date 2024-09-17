

// ----------- Hook provide by React -----------
import { useState} from "react"

// --------------- Export function from authSlice  ---------------
import { setCredientials } from "../../redux/features/auth/authSlice"

// --------------- function provide By Redux for the store and reducer  ---------------
import { useSelector, useDispatch } from "react-redux"

// --------------- Export function from apiUserSlice  ---------------
import { useRegisterMutation } from "../../redux/api/userApiSlice"

// ----------- Hook provide by react-router-dom -----------
import { useNavigate,  Link } from "react-router-dom"

// --------------- Style & Animation  ---------------

// ---------- Toast
import { toast } from "react-toastify"

// ---------- Image
import imgLogin from "/assets/imgLogin.png"


const Register = () => {


  // Here we use user info for the redirectiion
const { userInfo } = useSelector( (state) => state.auth)

// Here with useState for the info that we need in our back-end for the login user
const [ username, setUsername ] = useState('')
const [ email, setEmail ] = useState('')
const [ password, setPassword ] = useState('')

// We add confirmPassword for more security
const [ confirmPassword, setConfirmPassword ] = useState('')


const dispatch = useDispatch()
const navigate = useNavigate()


   // Thanks to the new object provide by the RTQ query powerful we create a function which trigger the API call for the register
    // We use also an object if there is a loading
const [ register , {isLoading, error}] = useRegisterMutation()


if(isLoading) return `Chargement...`
if(error) return `Error : ${error.data.message || error.error}`



    // We take the infos form the form and set in the trigger API Call 'login'
    // After thanks to the dispath we send the payload in the store => reducer => localStorage
const handleRegister = async (e) =>{

  e.preventDefault()

  if(password !== confirmPassword){
    toast.error("Passwords do not match")
    
  }else{

    try{
  
        const res = await register({ username, email, password}).unwrap()
        dispatch(setCredientials({...res}))
        toast.success(`Bienvenue ${username}`)
        navigate('/')
  
    }catch(err){
      console.log(err);
      toast.error(err.data.message || err.error)
    }

  }



}


  return (

    <main className="h-[170vh] bg-white lg:flex justify-center items-center md:h-[100vh] lg:h-[190vh] ">


        <section className='sm:h-[160vh] bg-[#f7f7f7]  flex flex-col justify-start items-center space-y-10 p-6 md:h-[145vh] lg:w-[50vw]' >

           <Link
           to="/"
           >
            <h1>Retour à la page d'accueil</h1>
           </Link>

          <img className="sm:h-[15vh] w-[40vw] bg-blue-400 lg:w-[20vw]" src={imgLogin} alt="tigre"/>
          

            <h className="sm:font-bold uppercase text-[1.3rem]">créez votre compte</h>

            <p className='sm:text-center md:max-w-[35vw]'>Cet espace vous permet de gérer vos informations personnelles, vos commandes en ligne, votre abonnement aux newsletters et flux d’actualités.</p>

            <p className=''>* Champs obligatoires</p>

            <form onSubmit={handleRegister} className="flex flex-col justify-start items-center space-y-10 p-6 md:items-center">


            <input
            // className='sm:border-b-2 border-black w-[90vw] mt-6 sm:text-[0.9rem] md:w-[45vw] text-[1.1rem] p-1'
             className='sm:w-[65vw] mt-6 sm:text-[0.9rem] bg-transparent border-b-2 border-b-black border-t-transparent border-l-transparent border-r-transparent md:text-[1.1rem] p-1 lg:w-[25vw]'
            type='text'
            id='username'
            value={username}
            placeholder='Rentrez votre nom d utilisateur'
            onChange={ (e) => setUsername(e.target.value)}
            >

            </input>

            <input
             className='sm:w-[65vw] mt-6 sm:text-[0.9rem] bg-transparent border-b-2 border-b-black border-t-transparent border-l-transparent border-r-transparent md:text-[1.1rem] p-1 lg:w-[25vw]'
            type='email'
            id="email"
            value={email}
            placeholder='Rentrez votre adresse email'
            onChange={ (e) => setEmail(e.target.value)}
            >

            </input>


            <input
              className='sm:w-[65vw] mt-6 sm:text-[0.9rem] bg-transparent border-b-2 border-b-black border-t-transparent border-l-transparent border-r-transparent md:text-[1.1rem] p-1 lg:w-[25vw]'
            type='password'
            placeholder='Rentrez votre mot de passe'
            id="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
            >

            </input>

            <input
              className='sm:w-[65vw] mt-6 sm:text-[0.9rem] bg-transparent border-b-2 border-b-black border-t-transparent border-l-transparent border-r-transparent md:text-[1.1rem] p-1 lg:w-[25vw]'
            type='password'
            placeholder='Veuillez confirmer votre mot de passe'
            id="confirmPassword"
            value={confirmPassword}
            onChange={ (e) => setConfirmPassword(e.target.value)}
            >

            </input>


            <button 
          className='sm:h-[3rem] w-[50vw] rounded-full bg-black text-white md:w-[25vw] sm:text-[0.9rem] '
          disabled={isLoading}
          type="submit"

          >
            Créer mon compte
          </button>


         


            </form>

            <p>Dejà un compte ? <Link to="/login">Se connecter</Link></p>


          

        </section>


      
    </main>
  )
}

export default Register
