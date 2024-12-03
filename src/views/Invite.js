import { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Invite () {

    //STATE
    const { inviterId, setInviterId } = useContext( AppContext )

    //ROUTER
    const navigate = useNavigate()
    const { id } = useParams()

    //EFFECTS
    useEffect(()=> {
        if ( inviterId ){
            navigate('/')
        }
    }, [ inviterId, navigate ])
    
    useEffect(()=> {
        if ( id ){
            setInviterId( id )
        }
    }, [ id, setInviterId ])

    return(
        <Loader/>
    )
}