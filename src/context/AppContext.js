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

    //TEST
    const testUser = {
        friends: [],
        id: "kNLM7MIzTIakz8Qjzw5WLiGD7ib2",
        createdAt: "1733852690542",
        phoneNumber: "+15555555555",
        acceptedInvites: 0,
        master: true,
        name: "Franco",
        email: "franco@genaiuniversity.com",
        lastname: "Fernandez",
        profilePhoto: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Fimage.webp9b84ef4d-2af2-45de-9275-ef8880e93a07?alt=media&token=93a043a5-1346-46af-b2b9-a3f18ca595f6"
    }

    //FUNCTIONS
    const getGlobalUser = useCallback( async ( token ) => {
        const user = await getUser( token ? token : authToken )
        setGlobalUser( user )
        return user 
        // setGlobalUser( testUser )
    }, [ getUser, authToken ]) 

    const mergeArraysById = ( array1, array2 ) => {

        return array1.map( item1 => {

            const match = array2.find( item2 => item2.id === item1.id )

            return {
                ...item1,
                match
            }
        })
    }

    //EFFECTS
    useEffect(() => {
        const unsubscribe = onAuthStateChanged( auth, async ( user ) => {
            setTokenLoading( true )
            if ( user ) {
                try {
                    const token = await user.getIdToken();
                    setAuthToken( token );
                    getGlobalUser( token )
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
            setPopulateUser,
            mergeArraysById
        }}>
            { children }
        </Provider>
    )
}

export { AppContext, AppProvider }