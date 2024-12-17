import axios from "axios"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "../context/AppContext"


function useSlots (){

    //STATE
    const [ availableNowSlots, setAvailableNowSlots ] = useState( [] )
    const [ scheduledSlots, setScheduledSlots ] = useState( [] )

    //REF
    const populatedFriendsData = useRef( false );

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

    const getAvailableNowSlots = useCallback( async () => {
        try{
            //GETS AVAILABLE NOW SLOTS   
            const availableNowSlots = await axios.get(`${process.env.REACT_APP_API_URL}/slots/now`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  

            setAvailableNowSlots( availableNowSlots.data )
            return availableNowSlots.data

        } catch ( error ) {
            throw error
        } 
    }, [ authToken ])

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

    const getScheduledSlots = useCallback( async () => {
        try{
            //GETS SCHEDULED SLOTS   
            const scheduledSlots = await axios.get(`${process.env.REACT_APP_API_URL}/slots/scheduled`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            console.log(scheduledSlots.data);
            setScheduledSlots( scheduledSlots.data )
            return scheduledSlots.data

        } catch ( error ) {
            throw error
        } 
    }, [ authToken ])

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

    const getUserFixedSlots = useCallback( async ( userId ) => {
        try{
            //GETS FIXED SLOTS   
            const fixedSlots = await axios.get(`${process.env.REACT_APP_API_URL}/slots/fixed/user/${ userId }`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  

            return fixedSlots.data

        } catch ( error ) {
            throw error
        } 
    }, [ authToken ])

    const convertArrayToString = ( array ) => {
        const result = array
            .map( ( day ) => day.charAt(0).toUpperCase() + day.slice( 1 ))
            .join(', ')

        return result
    }

    const deleteFixedSlot = async ( slotId ) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/slots/fixed/${ slotId }`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            
        } catch ( error ) {
            throw error
        }
    }

    //EFFECTS
    // useEffect(() => {
    //     if( authToken && !populatedFriendsData.current ){
    //         getScheduledSlots()
    //         getAvailableNowSlots()
    //         populatedFriendsData.current = true 
    //     }
    // }, [ getAvailableNowSlots, getScheduledSlots, authToken ])


    return({
        postFixedSlot,
        validateTimes,
        convertTimeToTimestamp,
        postAvailableNowSlot,
        postScheduledSlot,
        getUserFixedSlots,
        convertArrayToString,
        deleteFixedSlot,
        getAvailableNowSlots,
        getScheduledSlots,
        availableNowSlots,
        scheduledSlots

    })

}

export default useSlots