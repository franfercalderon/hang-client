import { useContext, useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { AppContext } from "../context/AppContext"
import Loader from "../components/Loader/Loader"


export default function Feed () {

    //STATE
    const [ isLoading, setIsLoading ] = useState( false )

    //CONTEXT
    const { getGlobalUser, authToken, globalUser } = useContext( AppContext )
    const { signOutUser } = useAuth()

    //EFFECTS
    useEffect(() => {
        if ( authToken !== '' ){
            getGlobalUser()
        }
    }, [ getGlobalUser, authToken ])

    useEffect(() => {
        if( globalUser ){
            setIsLoading( false )
        }
    }, [ globalUser ])

    return(
        <>
            {
                isLoading ? 
                <Loader/>
                :
                <>
                    <p>FEEF</p>
                    <button onClick={signOutUser}>Sign Out</button>
                </>
            }
        </>
    )
}