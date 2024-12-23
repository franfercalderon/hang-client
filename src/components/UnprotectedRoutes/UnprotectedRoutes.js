import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from '../../context/AppContext'

export default function UnprotectedRoute({ children }) {

    //CONTEXT
    const { globalUser } = useContext( AppContext )

    if ( globalUser ) {
        return <Navigate to="/" replace/>
    }
    
    return <Outlet />
}