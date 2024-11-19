import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from '../../context/AppContext'

export default function ProtectedRoute({ children }) {

    // //CONTEXT
    const { authToken } = useContext( AppContext )

    if ( !authToken || authToken === "" ) {
        console.log(authToken);

        return <Navigate to="/welcome" replace />
    }
    
    return children
}