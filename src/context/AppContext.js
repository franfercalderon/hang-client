import { createContext, useState , useEffect, useCallback } from "react"
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { app } from "../fb"
import { useNavigate } from "react-router-dom"
import useUsers from "../hooks/useUsers"
import { faL } from "@fortawesome/free-solid-svg-icons"
const AppContext = createContext('')
const { Provider } = AppContext

const AppProvider = ({ children }) => {

    //STATE
    const [ globalUser, setGlobalUser ] = useState( null )
    const [ authToken, setAuthToken ] = useState( "" )
    const [ tokenLoading, setTokenLoading ] = useState( true  )
    const [ populateUser, setPopulateUser ] = useState( false )
    const [ firebaseUserId, setFirebaseUserId ] = useState('')
    const [ inviterId, setInviterId ] = useState( '' )
    const [ masterToken, setMasterToken ] = useState( '' )

    //HOOKS
    const { getUser } = useUsers()

    //FIREBASE
    const auth = getAuth( app )

    //ROUTER
    const navigate = useNavigate()

    //FUNCTIONS
    const getGlobalUser = useCallback( async ( token ) => {
        const user = await getUser( token )
        setGlobalUser( user )
        return user 
    }, [ getUser ]) 

    //EFFECTS
    useEffect(() => {
        const unsubscribe = onAuthStateChanged( auth, async ( user ) => {
            setTokenLoading( true )
            if ( user ) {
                try {
                    const token = await user.getIdToken();
                    setAuthToken( token );
                    setTokenLoading( false )
                } catch (error) {
                    console.error( "Error getting ID token:", error );
                }
            } else {
                setAuthToken( '' );
                setGlobalUser( null )
                setPopulateUser( null )
                setTokenLoading( false )
            }
        });
    
        return () => unsubscribe();
    }, [ auth, navigate, getGlobalUser ]);

    useEffect(() => {
        if ( authToken && authToken !== '' && populateUser ){
            getGlobalUser( authToken )
        }
    }, [ authToken, populateUser, getGlobalUser ] )

    return(
        <Provider value={{
            authToken,
            globalUser,
            tokenLoading,
            setGlobalUser,
            firebaseUserId, 
            setFirebaseUserId,
            getGlobalUser,
            inviterId, 
            setInviterId,
            masterToken, 
            setMasterToken,
            setPopulateUser
        }}>
            { children }
        </Provider>
    )
}

export { AppContext, AppProvider }