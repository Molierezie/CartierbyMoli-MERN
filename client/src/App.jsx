
// ----------- Hook provide by react-router-dom -----------
import { Outlet } from 'react-router-dom'

// -------- Reusable components --------------
import Navigation from './pages/Auth/Navigation';

// --------------- Style & Animation  ---------------

// -------- Toast
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


// Outlet is used for the children / nested router 
// the children router is used for the nested router
// the nested routes of app ar all the routes is our app
// So with Outlet we automatically render the nested routes

function App() {
  

  return (
    <>

    {/* If we don't store ToastContainer here we cannot use inside the components */}
    <ToastContainer />
    <Navigation />
    
    <main className="py-3">

        <Outlet />
    </main>

    
    </>
  )
}

export default App
