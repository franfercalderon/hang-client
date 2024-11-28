import axios from "axios"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"


function useSlots (){

    //CONTEXT
    const { authToken } = useContext( AppContext )

    //FUNCTIONS
    const createSlot = async ( slot ) => {

        try{
            //CREATES USER IN DB   
            await axios.post(`${process.env.REACT_APP_API_URL}/slots/`, slot, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  

        } catch ( error ) {
            throw error
        } 
    }

    const validateTimes = ( slot ) => {

        const convertTo24Hs = ( time ) => {
            let convertedHour = parseInt( time.hour , 10 )
            const convertedMinute = parseInt( time.minute, 10 )
            if ( time.ampm === 'pm' && convertedHour !== 12 ){
                convertedHour += 12
            }
            if ( time.ampm === 'am' && convertedHour === 12 ) {
                convertedHour = 0
            }
            return convertedHour * 60 + convertedMinute
        }

        const startMinutes = convertTo24Hs( slot.startTime )
        const endMinutes = convertTo24Hs( slot.endTime )

        return startMinutes < endMinutes
    }

    return({
        createSlot,
        validateTimes
    })

}

export default useSlots