import { useContext, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Invite () {

    //STATE
    const { pendingInvitation, setPendingInvitation, globalUser } = useContext( AppContext ) 
    const [ searchParams ] = useSearchParams()

    //ROUTER
    const navigate = useNavigate()
    const { id } = useParams()

    //EFFECTS
    useEffect(()=> {
        if ( pendingInvitation ){
            navigate('/')
        }
    }, [ pendingInvitation, navigate ])
    
    useEffect(()=> {
        if( id ){
            
            const nameData = searchParams.get('name')
            setPendingInvitation( {
                userId: id,
                userName: decodeURIComponent( nameData )
            } )

        }
    }, [ id, setPendingInvitation, searchParams, globalUser ])

    return(
        <Loader/>
    )
}