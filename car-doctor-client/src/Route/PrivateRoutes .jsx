
import { useContext } from 'react';
import { AuthContext } from './../Providers/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoutes  = ({children}) => {
    const { user , loading } = useContext(AuthContext)
    if(loading){
        return <div className=" text-4xl text-red-300">Loading...</div> // for loading speaner if loading  found.
     }
     if(user){   // if user found it return user.
         return children;
     }
     return <Navigate state={location.pathname} to="/signin"></Navigate> 

     

};

export default PrivateRoutes ;