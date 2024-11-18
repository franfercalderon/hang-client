import { createContext, useState , useEffect, useCallback } from "react"
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth'
import app from "../fb"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
const AuthContext = createContext('')
const { Provider } = AuthContext

const AuthProvider = ({ children }) => {

    //AUTH STATE
    const [ globalUser, setGlobalUser ] = useState( null )
    const [ authToken, setAuthToken ] = useState( '' )
    const [ populateUser, setPopulateUser ] = useState( false )

    //FIREBASE
    const auth = getAuth( app )

    //ROUTER
    const navigate = useNavigate()

    //FUNCTIONS
    const userLogin = async () => {

        try{
            // await signInWithEmailAndPassword(auth, data.email, data.password)

        } catch ( error ){
            throw error
        }
    }

    const createUserInDb = async () => {
        try {
            
        } catch ( error ) {
            throw error
        }
    }



    //EFFECTS
    useEffect(() => {
        const unsubscribe = onAuthStateChanged( auth, async ( user ) => {
            if ( user ) {
                try {
                    const token = await user.getIdToken();
                    setAuthToken( token );
                } catch (error) {
                    console.error( "Error getting ID token:", error );
                }
            } else {
                setAuthToken( '' );
                navigate('/login');
            }
        });
    
        return () => unsubscribe();
    }, [ auth, navigate ]);

    useEffect(() => {
        if( authToken && authToken !== '' && populateUser ){

        }
    }, [ authToken, populateUser ] )

    return(
        <Provider value={{
            globalUser
        }}>
            { children }
        </Provider>
    )
}

export { AuthContext, AuthProvider }