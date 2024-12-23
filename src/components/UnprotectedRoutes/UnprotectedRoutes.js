import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from '../../context/AppContext'
import Loader from "../Loader/Loader";

export default function UnprotectedRoute({ children }) {

    //CONTEXT
    const { globalUser } = useContext( AppContext )

    // if( tokenLoading ){
    //     return(
    //         <Loader/>
    //     )
    // }

    if ( globalUser ) {
        console.log('a ver');
        return <Navigate to="/" replace/>
    }
    
    return <Outlet />
}