import { createContext, useState , useEffect, useCallback } from "react"
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { app } from "../fb"
import { useNavigate } from "react-router-dom"
import useUsers from "../hooks/useUsers"
// import axios from 'axios'
const AppContext = createContext('')
const { Provider } = AppContext

const AppProvider = ({ children }) => {

    //STATE
    const [ globalUser, setGlobalUser ] = useState( null )
    const [ authToken, setAuthToken ] = useState( "" )
    const [ tokenLoading, setTokenLoading ] = useState( true  )
    const [ populateUser, setPopulateUser ] = useState( false )
    const [ authUser, setAuthUser ] = useState( null )
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
    const getGlobalUser = useCallback( async () => {
        console.log('entro sin ser llamado');
        const user = await getUser( authToken )
        console.log(user);
        setGlobalUser( user )
        return user 
    }, [ getUser, authToken ]) 

    //EFFECTS
    useEffect(() => {
        const unsubscribe = onAuthStateChanged( auth, async ( user ) => {
            setTokenLoading( true )
            if ( user ) {
                try {
                    const token = await user.getIdToken();
                    setAuthToken( token );
                    setAuthUser( user )
                    setTokenLoading( false )
                } catch (error) {
                    console.error( "Error getting ID token:", error );
                }
            } else {
                setAuthToken( '' );
                setTokenLoading( false )
            }
        });
    
        return () => unsubscribe();
    }, [ auth, navigate ]);

    useEffect(() => {
        if( authToken !== '' ){
            console.log('entonces será llamado');
            getGlobalUser()
        }
    }, [ authToken, getGlobalUser, firebaseUserId ] )

    // useEffect(()=> {
    //     console.log(populateUser);
    // }, [ populateUser])

    return(
        <Provider value={{
            authToken,
            globalUser,
            setPopulateUser,
            tokenLoading,
            authUser,
            setGlobalUser,
            firebaseUserId, 
            setFirebaseUserId,
            getGlobalUser,
            inviterId, 
            setInviterId,
            masterToken, 
            setMasterToken
        }}>
            { children }
        </Provider>
    )
}

export { AppContext, AppProvider }