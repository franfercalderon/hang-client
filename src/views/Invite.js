import { useContext, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Invite () {

    //STATE
    // const { inviterId, setInviterId } = useContext( AppContext ) 
    const { pendingInvitation, setPendingInvitation } = useContext( AppContext ) 
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
        if ( id ){
            const nameData = searchParams.get('name')
            console.log(nameData)
            console.log(decodeURIComponent(nameData))
            // setPendingInvitation( {
            //     userId: id,
            //     userName: 
            // } )
        }
    }, [ id, setPendingInvitation, searchParams ])

    return(
        <Loader/>
    )
}