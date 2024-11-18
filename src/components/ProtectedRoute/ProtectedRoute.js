import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext'

export default function ProtectedRoute({ children }) {

    //CONTEXT
    const { authToken } = useContext( AuthContext )
    
    if ( !authToken || authToken === "" ) {

        return <Navigate to="/login" replace />
    }
    
    return children
}