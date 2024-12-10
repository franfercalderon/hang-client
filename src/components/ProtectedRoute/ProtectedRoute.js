import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from '../../context/AppContext'
import Loader from "../Loader/Loader";

export default function ProtectedRoute({ children }) {

    //CONTEXT
    const { globalUser, tokenLoading } = useContext( AppContext )

    if( tokenLoading ){
        return(
            <Loader/>
        )
    }

    if ( !globalUser ) {

        return <Navigate to="/login"  />
    }
    
    return children
}