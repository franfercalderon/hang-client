import axios from "axios"
import { useCallback, useContext } from "react"
import { AppContext } from "../context/AppContext"
import moment from 'moment-timezone'
import useLogs from "./useLogs"


function useSlots (){

    //CONTEXT
    const { authToken, globalUser } = useContext( AppContext )

    //HOOKS
    const { postLog } = useLogs()

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
            await postLog( 'useSlots', 'postFixedSlot', error.message )
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
            await postLog( 'useSlots', 'postAvailableNowSlot', error.message )
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

            return availableNowSlots.data

        } catch ( error ) {
            await postLog( 'useSlots', 'getAvailableNowSlots', error.message )

            throw error
        } 
    }, [ authToken, postLog ])

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
            await postLog( 'useSlots', 'postScheduledSlot', error.message )

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
            return scheduledSlots.data

        } catch ( error ) {
            await postLog( 'useSlots', 'getScheduledSlots', error.message )
            
            throw error
        } 
    }, [ authToken , postLog])

    const getRecurringMatches = useCallback( async () => {
        try{
            //GETS RECURRING MATCHES   
            const matches = await axios.get(`${process.env.REACT_APP_API_URL}/slots/matches/fixed`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            return matches.data

        } catch ( error ) {
            await postLog( 'useSlots', 'getRecurringMatches', error.message )

            throw error
        } 
    }, [ authToken, postLog ])

    const getEventInvites = useCallback( async ( token ) => {
        try{
            //GETS INVITES FOR USER   
            const invites = await axios.get(`${process.env.REACT_APP_API_URL}/slots/invites`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ token  }`
                }
            })  
            return invites.data

        } catch ( error ) {
            await postLog( 'useSlots', 'getEventInvites', error.message )

            throw error
        } 
    }, [ postLog ])

    const getOwnEvents = useCallback( async () => {

        try{
            //GETS EVENTS USER IS HOSTING   
            const events = await axios.get(`${process.env.REACT_APP_API_URL}/slots/ownEvents`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken  }`
                }
            })  
            return events.data

            

        } catch ( error ) { 
            await postLog( 'useSlots', 'getOwnEvents', error.message )

            throw error
        } 

    }, [ authToken, postLog ])

    const updateEventData = async ( eventId, eventData ) => {

        const data = {
            eventId,
            eventData
        }
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/slots/update`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            
        } catch ( error ) {
            await postLog( 'useSlots', 'updateEventData', error.message )

            throw error.response.data
        }

    }

    const getAttendingEvents = useCallback( async () => {
        try{
            // //GETS EVENTS USER IS ATTENDING   
            const events = await axios.get(`${process.env.REACT_APP_API_URL}/slots/attendingEvents`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken  }`
                }
            })  

            return events.data


        } catch ( error ) {
            await postLog( 'useSlots', 'getAttendingEvents', error.message )

            throw error
            
        } 

    }, [ authToken, postLog ])


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
    
    const convertTimestampToTime = useCallback(( timestamp ) => {

        const date = new Date( timestamp )
    
        let hour = date.getHours();
        const minute = date.getMinutes();
        const ampm = hour >= 12 ? "pm" : "am"
    
        if ( hour > 12 ) {
            hour -= 12;
        } else if ( hour === 0 ) {
            hour = 12;
        }
    
        return { hour, minute, ampm }
    }, [])
    

    const convertTimeToTimestamp = useCallback(( time, date ) => {
        
        const { hour, minute, ampm } = time
        if ( hour == null || minute == null || ampm == null ){
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
            await postLog( 'useSlots', 'getUserFixedSlots', error.message )

            throw error
        } 
    }, [ authToken, postLog ])

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
            await postLog( 'useSlots', 'deleteFixedSlot', error.message )

            throw error
        }
    }

    const formatTimestampToDate = ( timestamp, timezone = 'America/Chicago'  )  => {
    
        const timeZoned = moment.utc( timestamp ).tz( timezone )
        const formattedDate = timeZoned.format('MMMM DD, YYYY')
        return formattedDate
    }
    
    const getDaySuffix = ( day ) => {
        if ( day >= 11 && day <= 13 ) return "th"
        switch (day % 10 ) {

            case 1: return "st"
            case 2: return "nd"
            case 3: return "rd"
            default: return "th"
        }
    }

    const joinEvent = async ( eventId, collection ) => {

        const data = {
            event: {
                id: eventId,
                collection
            },
            user: {
                id: globalUser.id,
                imgUrl: globalUser.profilePhoto ? globalUser.profilePhoto : null ,
                name: globalUser.name,
                lastname: globalUser.lastname
            }
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/slots/join`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            
        } catch ( error ) {

            if (error.response) {
        
                await postLog( 'useSlots', 'joinEvent', error.message )

                throw error.response.data;
            } else {

                console.error("Error without response:", error);
                await postLog( 'useSlots', 'joinEvent', error.message )

                throw new Error( "An error occurred, but no response was received.", error );
            }
        
        }
    }

    const converTimestampToString = ( timestamp, timezone = 'America/Chicago' ) => {
    
        const current = Date.now()
        if( timestamp < current ){
            return 'now'
    
        } else {
            const timeZoned = moment.utc( timestamp ).tz( timezone ) 
            const timeZoneDate = timeZoned.format( 'h:mm a' )
    
            return timeZoneDate 
        }
    }

    const replyEventInvite = async ( eventId, collection, accepted ) => {

        const data = {
            accepted,
            collection,
            userData: {
                name: globalUser.name,
                lastname: globalUser.lastname,
                img: globalUser.profilePhoto
            }
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/slots/invite/${ eventId }`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }` 
                }
            })  
            
        } catch ( error ) {
            await postLog( 'useSlots', 'replyEventInvite', error.message )

            throw error.response.data
        }
    }

    const deleteOwnEvent = async ( collection, eventId ) => {

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/slots/event?collection=${ collection }&eventId=${ eventId }`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            
        } catch ( error ) {
            await postLog( 'useSlots', 'deleteOwnEvent', error.message )

            throw error.response.data
        }
    }

    const leaveEvent = async ( collection, eventId ) => {

        const data = {
            collection,
            eventId
        }
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/slots/event?collection=${ collection }&eventId=${ eventId }`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            
        } catch ( error ) {
            await postLog( 'useSlots', 'leaveEvent', error.message )

            throw error.response.data
        }
    }

    

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
        formatTimestampToDate,
        joinEvent,
        getRecurringMatches,
        getEventInvites,
        replyEventInvite,
        converTimestampToString,
        getAttendingEvents,
        getOwnEvents,
        deleteOwnEvent,
        leaveEvent,
        convertTimestampToTime,
        updateEventData

    })

}

export default useSlots