import axios from "axios"
import { useCallback, useContext } from "react"
import { AppContext } from "../context/AppContext"


function useSlots (){

    //CONTEXT
    const { authToken } = useContext( AppContext )

    //FUNCTIONS
    const postFixedSlot = async ( slot ) => {

        try{
            //CREATES USER IN DB   
            await axios.post(`${process.env.REACT_APP_API_URL}/slots/fixed`, slot, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  

        } catch ( error ) {
            throw error
        } 
    }

    const postAvailableNowSlot = async ( slot ) => {

        try{
            //CREATES USER IN DB   
            await axios.post(`${process.env.REACT_APP_API_URL}/slots/now`, slot, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  

        } catch ( error ) {
            throw error
        } 
    }

    const postScheduledSlot = async ( slot ) => {

        try{
            //CREATES USER IN DB   
            await axios.post(`${process.env.REACT_APP_API_URL}/slots/schedule`, slot, {
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

    const convertTimeToTimestamp = useCallback(( time, date ) => {
        
        const { hour, minute, ampm } = time
        if (!hour || !minute || !ampm ){
            throw new Error('Incomplete time object')
        }
        
        let hour24 = parseInt( hour, 10 )
        if( ampm.toLowerCase() === 'pm' && hour24 !== 12 ){
            hour24 += 12
        } else if( ampm.toLowerCase() === 'am' && hour24 === 12 ){
            hour24 = 0
        }
        const now = new Date()
        const timeStamp = new Date (
            date ? date.getFullYear() : now.getFullYear(),
            date ? date.getMonth() : now.getMonth(),
            date ? date.getDate() : now.getDate(),
            hour24,
            parseInt( minute, 10 ),
            0,
            0
        )
        return timeStamp.getTime()

    }, [] )



    return({
        postFixedSlot,
        validateTimes,
        convertTimeToTimestamp,
        postAvailableNowSlot,
        postScheduledSlot
    })

}

export default useSlots