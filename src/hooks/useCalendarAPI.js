import axios from "axios"
import { useCallback, useContext } from "react"
import { AppContext } from "../context/AppContext"
import useLogs from "./useLogs"

function useCalendarAPI(){

    //CONTEXT
    const { authToken } = useContext( AppContext )

    //HOOKS
    const { postLog } = useLogs()

    //FUNCTIONS
    const checkCalendarConnection = useCallback( async ( authToken ) => {
        if( !authToken ){
            return false 
        }
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/calendarAPI/checkConnection`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            return response.data.isConnected || false 
            
        } catch ( error ) {
            console.error( "Failed to check calendar connection:", error )
            await postLog( 'useCalendarAPI', 'checkCalendarConnection', error.message )
            return false
        }
    }, [ postLog ])

    const connectCalendar = useCallback(( source ) => {
        window.location.href = `https://api.gethangapp.com/calendarAPI/auth/google?authToken=${ authToken }&source=${ source }` 

    }, [ authToken ] )

    const deleteCalendarConnection = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/calendarAPI/auth/calendarConnection`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            
        } catch  (error ) {
            await postLog( 'useCalendarAPI', 'deleteCalendarConnection', error.message )
            throw error
        }
    }

    return {
        checkCalendarConnection,
        connectCalendar,
        deleteCalendarConnection

    }

}

export default useCalendarAPI