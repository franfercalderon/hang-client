import { createContext, useState , useEffect, useCallback } from "react"
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { app } from "../fb"
import { useNavigate } from "react-router-dom"
import useUsers from "../hooks/useUsers"
import useFriends from "../hooks/useFriends"
import useNotifications from "../hooks/useNotifications"
import useSlots from "../hooks/useSlots"
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
    const [ notifications, setNotifications ] = useState( [] )
    const [ hangSuggestions, setHangSuggestions ] = useState( [] )
    const [ notificationBadge, setNotificationBadge ] = useState( false )
    const [ userInvites, setUserInvites ] = useState( null ) 

    //HOOKS
    const { getUser } = useUsers()
    const { getUserFriendShipsRequests } = useFriends()
    const { getUserNotifications } = useNotifications()
    const { getEventInvites } = useSlots()

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

    const removeNotification = ( id ) => {
        const updatedArray = notifications.filter(( notification ) => notification.id !== id )
        setNotifications( updatedArray.length > 0 ? updatedArray : null )
    }
    
    const getUserData = useCallback( async ( token ) => {
        
        const friendshipRequests = await getUserFriendShipsRequests( token )
        setFriendshipRequest( friendshipRequests.length > 0 ? friendshipRequests : null )
        
        const notifications = await getUserNotifications( token )
        setNotifications( notifications.length > 0 ? notifications : null )

        const invites = await getEventInvites()
        invites.sort(( a, b ) => a.event.starts - b.event.starts ) 
        setUserInvites( invites )


    }, [ getUserFriendShipsRequests, getUserNotifications, getEventInvites ] )

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
            }
        });
    
        return () => unsubscribe();
    }, [ auth, navigate, getGlobalUser, getUserData ]);

    useEffect(() => {
        if ( authToken && authToken !== '' && populateUser ){
            getGlobalUser( authToken )
        }
    }, [ authToken, populateUser, getGlobalUser ] )

    useEffect(() => {
        if( notifications?.length > 0 || friendshipRequest?.length > 0 || userInvites?.length > 0 ){
            console.log('si');
            setNotificationBadge( true )
        } else {
            console.log('no');
            setNotificationBadge( false )
        } 
   
    }, [ friendshipRequest, hangSuggestions, notifications, userInvites ])

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
            notifications,
            removeNotification,
            userInvites
        }}>
            { children }
        </Provider>
    )
}

export { AppContext, AppProvider }