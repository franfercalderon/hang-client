import axios from "axios"
import { useCallback, useContext } from "react"
import { AppContext } from "../context/AppContext"


function useSlots (){

    //CONTEXT
    const { authToken, globalUser } = useContext( AppContext )

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
            return scheduledSlots.data

        } catch ( error ) {
            throw error
        } 
    }, [ authToken ])

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
            throw error
        } 
    }, [ authToken ])

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
            throw error
        } 
    }, [ ])

    const getOwnEvents = useCallback( async () => {

        try{
            //GETS EVENTS USER IS HOSTING   
            // const events = await axios.get(`${process.env.REACT_APP_API_URL}/slots/ownEvents`,{
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${ authToken  }`
            //     }
            // })  
            // return events.data
            console.log('runs getOwnEvents');

        } catch ( error ) {
            throw error
        } 

    }, [ authToken ])

    const getAttendingEvents = useCallback( async () => {
        try{
            //GETS EVENTS USER IS ATTENDING   
            // const events = await axios.get(`${process.env.REACT_APP_API_URL}/slots/attendingEvents`,{
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${ authToken  }`
            //     }
            // })  

            // return events.data
            console.log('runs getAttendingEvents');

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

    const formatTimestampToDate = ( timestamp )  => {

        const date = new Date( timestamp )
        const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
        
        const day = date.getDate()
        const daySuffix = getDaySuffix(day)
        
        return `${ monthNames[ date.getMonth() ]} ${ day }${ daySuffix }`
    }
    
    const getDaySuffix = ( day ) => {
        if (day >= 11 && day <= 13) return "th"
        switch (day % 10) {

            case 1: return "st"
            case 2: return "nd"
            case 3: return "rd"
            default: return "th"
        }
    }

    const joinEvent = async ( eventId, limitedSeats ) => {

        const data = {
            event: {
                id: eventId,
                limitedSeats
            },
            user: {
                id: globalUser.id,
                imgUrl: globalUser.profilePhoto ? globalUser.profilePhoto : null ,
                name: globalUser.name
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
            throw error.response.data
        }
    }

    const converTimestampToString = ( timestamp ) => {

        const current = Date.now()

        if( timestamp < current ){
            return 'now'
        } else {
            const date = new Date( timestamp )
            let hours = date.getHours()
            const minutes = date.getMinutes()
            const ampm = hours >= 12 ? 'pm' : 'am'
            hours = hours % 12 || 12
            const formattedMinutes = minutes.toString().padStart( 2, '0' )
    
            return `${ hours }:${ formattedMinutes } ${ ampm }`
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
        getOwnEvents

    })

}

export default useSlots