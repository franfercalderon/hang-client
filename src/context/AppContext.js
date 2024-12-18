import { createContext, useState , useEffect, useCallback, useContext } from "react"
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { app } from "../fb"
import { useNavigate } from "react-router-dom"
import useUsers from "../hooks/useUsers"
import useFriends from "../hooks/useFriends"
// import useSlots from "../hooks/useSlots"
import { SlotsContext } from "./SlotsContext"
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
    const [ friendshipRequest, setFriendshipRequest ] = useState( [] )
    // const [ availableNowSlots, setAvailableNowSlots ] = useState( [] )
    // const [ scheduledSlots, setScheuledSlots ] = useState( [] )
    const [ hangSuggestions, setHangSuggestions ] = useState( [] )
    const [ notificationBadge, setNotificationBadge ] = useState( false )

    //CONTEXT
    const { resetSlotContextState } = useContext( SlotsContext )

    //HOOKS
    const { getUser } = useUsers()
    const { getUserFriendShipsRequests } = useFriends()
    // const { getAvailableNowSlots, getScheduledSlots } = useSlots()

    //FIREBASE
    const auth = getAuth( app )

    //ROUTER
    const navigate = useNavigate()

    //FUNCTIONS
    const getGlobalUser = useCallback( async ( token ) => {
        const user = await getUser( token ? token : authToken )
        setGlobalUser( user )
        return user 
    }, [ getUser, authToken ]) 

    const getUserData = useCallback( async ( token ) => {

        const friendshipRequests = await getUserFriendShipsRequests( token )
        setFriendshipRequest( friendshipRequests.length > 0 ? friendshipRequests : null )
    
        //GET NOTIFICATIONS


    }, [ getUserFriendShipsRequests ] )

    const mergeArraysById = ( array1, array2 ) => {

        return array1.map( item1 => {

            const match = array2.find( item2 => item2.id === item1.id )

            return {
                ...item1,
                priority: match.priority
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
                    getUserData( token )
                    setTokenLoading( false )
                } catch (error) {
                    console.error( "Error getting ID token:", error );
                }
            } else {
                setAuthToken( '' );
                setGlobalUser( null )
                setPopulateUser( null )
                setTokenLoading( false )
                setNotificationBadge( false )
                resetSlotContextState( )
            }
        });
    
        return () => unsubscribe();
    }, [ auth, navigate, getGlobalUser, getUserData, resetSlotContextState ]);

    useEffect(() => {
        if ( authToken && authToken !== '' && populateUser ){
            getGlobalUser( authToken )
        }
    }, [ authToken, populateUser, getGlobalUser ] )

    useEffect(() => {
        setNotificationBadge( friendshipRequest?.length > 0 || hangSuggestions?.length > 0 ? true : false )
   
    }, [ friendshipRequest, hangSuggestions ])

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
            mergeArraysById,
            friendshipRequest,
            getUserData,
            notificationBadge,
        }}>
            { children }
        </Provider>
    )
}

export { AppContext, AppProvider }