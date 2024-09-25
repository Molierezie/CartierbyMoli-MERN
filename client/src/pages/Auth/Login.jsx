import React from 'react'

// ----------- Hook provide by React -----------
import { useState, useEffect } from 'react'

// ----------- Hook provide by react-router-dom -----------
import { Link, useNavigate, useLocation } from 'react-router-dom'

// --------------- function provide By Redux for the store and reducer  ---------------
import { useSelector, useDispatch } from 'react-redux'


import { useLoginMutation } from '../../redux/api/userApiSlice'

// --------------- Export function from authSlice  ---------------
import { setCredientials } from '../../redux/features/auth/authSlice'


// ---------------  Reusable component  ---------------
import GoBackHome from '@/components/GoBackHome';



// --------------- Style & Animation  ---------------

// -------- Toast
import { toast } from 'react-toastify'

// -------- Icon
import { FaCircle } from "react-icons/fa";

// -------- image
import imgLogin from '/assets/imgLogin.png'

// -------- AOS Scroll Animation
import AOS from "aos";
import "aos/dist/aos.css";



const Login = () => {

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
      
    });
  }, []);


  // Here we use user info for the redirectiion
    const { userInfo } = useSelector( (state) => state.auth );

    // Here with useState for the info that we need in our back-end for the login user
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");

    // We store the dispatch function and navigate for use later 
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // Thanks to the new object provide by the RTQ query powerful we create a function which trigger the API call for the login
    // We use also an object if there is a loading or error
    const [ login, { isLoading : isLoadingLogin, error : errorLogin } ] = useLoginMutation();



    // Here we creat an message if in our API call there is an error or loading
    if(isLoadingLogin ) return <h1>Chargement ...</h1>
    if(errorLogin ) return <h1>error ...</h1>



    // We take the infos form the form and set in the trigger API Call 'login'
    // After thanks to the dispath we send the payload in the store => reducer => localStorage
    const submitHandler = async (e)=>{

      e.preventDefault();

      try {

        const res = await login({ email, password}).unwrap()
        console.log(res);
        console.log(JSON.parse(localStorage.getItem('userInfo')));
    
        dispatch(setCredientials({...res}));
        navigate("/");
        toast.success("Connexion reussie");
        
      } catch (err) {
        console.log(err);
        toast.error("Mot de passe incorrect");
        
      }
    }

   


  return (

    
    <>

    <GoBackHome/>
    
<main className="sm:h-[270vh] flex flex-col p-4 lg:flex-row justify-center items-center md:h-[250vh] lg:h-[150vh] lg:p-20">


            <div className='sm:h-[110vh] bg-red-100 w-full flex flex-col justify-start items-center border-b-2 border-b-gray-500  md:w-[55vw] md:h-[85vh]  lg:h-[120vh]  lg:pr-6 lg:border-b-0 lg:border-r-2 lg:border-gray-500'>


            <div className='sm:min-w-[20rem] h-[80vh] w-[55vw] space-y-12 p-10 lg:w-[45vw] lg:h-[90vh]'>

              <h1 className="sm:font-bold uppercase text-[1.3rem]">DÉJÀ INSCRIT(E) ?</h1>

              <p className='md:max-w-[45vw]'>Si vous êtes déjà inscrit(e) chez Cartier, veuillez vous connecter ici :</p>

              <p>* Champs obligatoires</p>


              <form onSubmit={submitHandler} className='flex flex-col gap-y-8'>

                <input
                 className='sm:w-[35vw] mt-6 sm:text-[0.9rem] bg-transparent border-b-2 border-b-black border-t-transparent border-l-transparent border-r-transparent md:text-[1.1rem] p-1'
                type='email'
                id='email'
                value={email}
                placeholder='Email*'
                onChange={(e) => setEmail(e.target.value)}>

                </input>

                <input
                className='sm:w-[35vw]  mt-6 sm:text-[0.9rem] bg-transparent border-b-2 border-b-black border-t-transparent border-l-transparent border-r-transparent text-[1.1rem] p-1'
                type='password'
                id='password'
                value={password}
                placeholder='Mot de passe*'
                onChange={(e)=> setPassword(e.target.value)}
                >

                
                </input>

                
          <p className='sm:text-[0.8rem] max-w-[60vw] md:text-[1.1rem]  md:max-w-[45vw]'>
          Vous avez oublié votre mot de passe ?
          Pour plus de renseignements sur la façon dont nous utilisons vos données à caractère personnel,
          veuillez consulter notre Politique de Confidentialité.
          </p>

          <button 
          className='sm:h-[3rem] w-[40vw] rounded-full bg-red-700 text-white sm:text-[0.9rem] md:w-[25vw]'
          // disabled={isLoadingLogin}
          type="submit"

          >
 
            Connexion
          </button>


            


              </form>



            </div>

            </div> 


            <div className='sm:h-[120vh] bg-[#f7f7f7] w-full flex flex-col justify-start items-center border-b-2 md:h-[110vh] md:w-[85vw] lg:h-[120vh] lg:pl-6'>

            <div className='sm:min-w-[20rem] h-[80vh] w-[55vw] space-y-12 p-10  md:items-center justify-start lg:w-[45vw] lg:h-[80vh]'>

              <h1 className="sm:font-bold uppercase text-[1.3rem]">CRÉEZ VOTRE COMPTE</h1>

              <p className='md:max-w-[45vw]'> Inscrivez-vous pour profiter des avantages de votre compte My Cartier :</p>

             
            <div className='sm:p-4'>

              <span className='flex justify-start items-center space-x-6'>
                <FaCircle size={7}/>
                <p>Gérer votre profil</p>
              </span>

              <span className='flex justify-start items-center space-x-6'>
                <FaCircle size={7}/>
                <p>Enregistrer vos adresses de livraison</p>
              </span>

              <span className='flex justify-start items-center space-x-6'>
                <FaCircle size={7}/>
                <p>Vérifier vos commandes</p>
              </span>

              <span className='flex justify-start items-center space-x-6'>
                <FaCircle size={8}/>
                <p>Gérer votre collection et vos services commandés</p>
              </span>
              

            </div>

            <button  className='sm:h-[3rem] w-[40vw] mx-auto rounded-full bg-red-700 text-white sm:text-[0.9rem] md:w-[25vw]'>
              <Link to="/register">
                Créer votre compte
      
              </Link>
              </button>

              <img  src={imgLogin} alt='imgPanthere' className='sm:h-[15vh] w-full bg-blue-400 md:h-[25vh] lg:h-[35vh] lg:w-[95%]' />



              </div>

              </div> 

              </main>
    
    </>

  )
}

export default Login
