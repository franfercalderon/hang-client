import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from '../../context/AppContext'

export default function ProtectedRoute({ children }) {

    //CONTEXT
    const { authToken, tokenLoading } = useContext( AppContext )

    if( tokenLoading ){
        return(
            <p>Loading Baia</p>
        )
    }

    if ( !authToken || authToken === "" ) {

        return <Navigate to="/welcome"  />
    }
    
    return children
}