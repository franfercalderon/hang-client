import { useState, useEffect, useCallback, useContext } from "react"
import { getToken, onMessage } from "firebase/messaging"
import { messaging } from "../fb"
import { AppContext } from "../context/AppContext"
import axios from "axios"

function usePushNotifications () {

    const [ token, setToken ] = useState( null )
    const [ message, setMessage ] = useState( null )
    const [ permissionStatus, setPermissionStatus ] = useState('unsupported')

    //CONTEXT
    const {  authToken } = useContext( AppContext )

    const postFCMToken = useCallback( async ( token ) => {

        const data = { FCMToken: token }
        try{
            //POSTS NEW FCM TOKEN   
            await axios.post(`${process.env.REACT_APP_API_URL}/users/FCMToken`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            return 
        } catch ( error ) {
            throw error.response.data
        } 
    }, [ authToken ])


    const requestNotificationPermission = useCallback( async () => {
    
        try {
            let permission = Notification.permission
            
            if( permission === 'default'){
                permission = await Notification.requestPermission()
                setPermissionStatus( permission )
            }
            if( permission === 'granted'){
                const registration = await navigator.serviceWorker.ready

                const currentToken = await getToken( messaging, { 
                    vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
                    serviceWorkerRegistration: registration
                })
                
                if( currentToken ){
                    setToken( currentToken )
                    await postFCMToken( currentToken )
                } else {
                    console.warn('No FCM Token available.' )
                }
            } else if ( permission === 'denied' ){
                console.warn('Push notification permission denied by user.')
            }
            
        } catch ( error ) {
            console.error( 'Error in requestNotificationPermission: ', error )
        }
    }, [ ])


    const testPushNotification = async () => {

        try{
            //POSTS NEW FCM TOKEN   
            await axios.post(`${process.env.REACT_APP_API_URL}/notifications/push`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            return 
        } catch ( error ) {
            throw error.response.data
        } 
    }

    useEffect(() => {
        const unsubscribe = onMessage( messaging, ( payload ) => {
            setMessage( payload )
        })
        return () => unsubscribe()
    }, [])


    useEffect(() => {
        if ( typeof window !== 'undefined' && 'Notification' in window ) {
            setPermissionStatus( Notification.permission ) 
        }
    }, [])


    return{
        token, 
        message,
        permissionStatus,
        requestNotificationPermission,
        testPushNotification
    }
}

export default usePushNotifications