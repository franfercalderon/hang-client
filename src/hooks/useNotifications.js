import axios from "axios"
import { useCallback, useContext } from "react"
import { AppContext } from "../context/AppContext"
import useLogs from "./useLogs"

function useNotifications (){

    //CONTEXT
    const { authToken } = useContext( AppContext )

    //HOOKS
    const { postLog } = useLogs()

    //FUNCTIONS
    const getUserNotifications = useCallback( async ( token ) => {
        try{
            //GETS AVAILABLE NOTIFICATIONS   
            const availableNotifications = await axios.get(`${process.env.REACT_APP_API_URL}/notifications/`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ token ? token : authToken }`
                }
            })  

            return availableNotifications.data

        } catch ( error ) {
            await postLog( 'useNotifications', 'getUserNotifications', error.message )
            throw error
        } 
    }, [ authToken, postLog ])


    const deleteNotification = async ( notificationId ) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/notifications/${ notificationId }`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            
        } catch ( error ) {
            await postLog( 'useNotifications', 'deleteNotification', error.message )
            throw error
        }
    }

    const updateNotificationChannels = useCallback( async ( updatedPreferences ) => {

        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/notifications/updatePreferences`, updatedPreferences, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            
        } catch ( error ) {
            await postLog( 'useNotifications', 'updateNotificationChannels', error.message )
            throw error
        }

    }, [ authToken, postLog ])

    return({
        getUserNotifications,
        deleteNotification,
        updateNotificationChannels
    })

}

export default useNotifications