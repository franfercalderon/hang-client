import axios from "axios"
import { useCallback, useContext } from "react"
import { AppContext } from "../context/AppContext"

function useCalendarAPI(){

    //CONTEXT
    const { authToken } = useContext( AppContext )

    //FUNCTIONS
    const checkCalendarConnection = useCallback( async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/calendarAPI/checkConnection`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            return response 
            
        } catch ( error ) {
            throw error
        }
    }, [ authToken ])

    const connectCalendar = () => {
        window.location.href = '/auth/google'
    }

    return {
        checkCalendarConnection,
        connectCalendar

    }

}

export default useCalendarAPI