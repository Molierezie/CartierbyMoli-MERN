import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";


const PrivateRoute = () => {


    // For the protected route
    // We take the actual state of the user in the sate with useSelector
    // If there is an user and this user isn't an Admin he can passed in the nested route inside the main.jsx file
    // e.g if there is no user or if the user is an Admin it cannot pass in the nested route

    const { userInfo } = useSelector( (state)=> state.auth)

    
    const isAdmin = userInfo && userInfo.isAdmin


    return userInfo && !isAdmin ? ( <Outlet/> )  : ( <Navigate to='/' replace />)




}

export default PrivateRoute