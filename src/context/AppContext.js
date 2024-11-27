import { createContext, useState , useEffect, useCallback } from "react"
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth'
import { app } from "../fb"
import { useNavigate } from "react-router-dom"
// import axios from 'axios'
const AppContext = createContext('')
const { Provider } = AppContext

const AppProvider = ({ children }) => {

    //AUTH STATE
    const [ globalUser, setGlobalUser ] = useState( null )
    const [ authToken, setAuthToken ] = useState( "" )
    const [ tokenLoading, setTokenLoading ] = useState( true  )
    const [ populateUser, setPopulateUser ] = useState( false )
    const [ authUser, setAuthUser ] = useState( null )
    const [ firebaseUserId, setFirebaseUserId ] = useState('')


    //FIREBASE
    const auth = getAuth( app )

    //ROUTER
    const navigate = useNavigate()

    //FUNCTIONS
    // const userLogin = async () => {

    //     try{
    //         // await signInWithEmailAndPassword(auth, data.email, data.password)

    //     } catch ( error ){
    //         throw error
    //     }
    // }

    // const createUserInDb = async () => {
    //     try {
            
    //     } catch ( error ) {
    //         throw error
    //     }
    // }



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
        if( authToken && authToken !== '' && populateUser ){
            //GET USER FROM DB
            //SET GLOBAL USER

        }
    }, [ authToken, populateUser ] )

    return(
        <Provider value={{
            authToken,
            globalUser,
            setPopulateUser,
            tokenLoading,
            authUser,
            setGlobalUser,
            firebaseUserId, 
            setFirebaseUserId
        }}>
            { children }
        </Provider>
    )
}

export { AppContext, AppProvider }