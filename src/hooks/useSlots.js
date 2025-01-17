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

            const fakeData = [
                {
                    title: "Dinner",
                    starts: 1737147600000,
                    ends: 1737154800000,
                    location: {
                        address: "El Salvador 5860, C1414BQJ Cdad. Autónoma de Buenos Aires, Argentina",
                        coordinates: {
                            lat: -34.5812926,
                            lng: -58.4380536
                        },
                        mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJG81VHZO1vJURnTSLMnh4yC8"
                    },
                    spots: 1,
                    isPrivate: true,
                    userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2FScreenshot%202024-12-13%20at%203.55.29%E2%80%AFPM.pnga29486b2-7843-4501-a61f-97d2b50ac146?alt=media&token=f7ca5960-ad73-4e50-b2ba-67edf0f0d6bd",
                    userName: "Loreen",
                    userLastname: "Dallas",
                    userId: "iuYmKKbSqMfWlARqIt4y2oTHytr1",
                    id: "44e0c3e7-6ad4-4233-911b-7a6d5ca74f90",
                    attending: [
                        {
                            name: "Bobby",
                            lastname: "Coleman",
                            userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Fmale2.pngc3b292b3-a351-4b3b-9ac5-8f7d0dcb3077?alt=media&token=5ad3cb4c-d65b-4b9a-bf26-eb73088a8a56",
                            userId: "FnNSENwcBGUGFv94jMIqN9E4pQn1"
                        },
                        {
                            name: "Sarah",
                            lastname: "Blaustein",
                            userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Ffemale1.pnge4601148-be0f-42c2-af96-3abbbfeb8039?alt=media&token=3cb6562c-0782-4de7-9a63-8c7b1abd9fa2",
                            userId: "FnNSENwcBGUGFv94jMIqN9E4pQn1"
                        },
                        {
                            name: "Derrick",
                            lastname: "Smith",
                            userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Fmale1.png6433d34e-1953-4d7b-af83-0500060861fc?alt=media&token=74c14b4e-27db-4b4a-87fa-77bf01fb5f47",
                            userId: "FnNSENwcBGUGFv94jMIqN9E4pQn1"
                        }
                    ]
                },
                {
                    attending: [],
                    title: "After office 💸",
                    starts: 1737581400000,
                    ends: 1737585000000,
                    location: {
                        address: "Av. del Libertador 3949, C1426 Cdad. Autónoma de Buenos Aires, Argentina",
                        coordinates: {
                            lat: -34.5697595,
                            lng: -58.4244154
                        },
                        mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJAThMnZi1vJURiYnClw7laKY"
                    },
                    spots: 1,
                    isPrivate: true,
                    userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2FScreenshot%202024-12-13%20at%203.55.29%E2%80%AFPM.pnga29486b2-7843-4501-a61f-97d2b50ac146?alt=media&token=f7ca5960-ad73-4e50-b2ba-67edf0f0d6bd",
                    userName: "Loreen",
                    userLastname: "Dallas",
                    userId: "iuYmKKbSqMfWlARqIt4y2oTHytr1",
                    id: "76892952-8bf8-4009-8d2a-c7930bb48987"
                },
                {
                    title: "My bday 🎂",
                    starts: 1737581400000,
                    ends: 1737585000000,
                    location: {
                        address: "Av. Costanera Rafael Obligado 7030, C1428 Cdad. Autónoma de Buenos Aires, Argentina",
                        coordinates: {
                            lat: -34.5438535,
                            lng: -58.4332017
                        },
                        mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJE6T9P0-0vJURMBIWo4aqD7w"
                    },
                    spots: 1,
                    isPrivate: true,
                    userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2FScreenshot%202024-12-13%20at%203.55.29%E2%80%AFPM.pnga29486b2-7843-4501-a61f-97d2b50ac146?alt=media&token=f7ca5960-ad73-4e50-b2ba-67edf0f0d6bd",
                    userName: "Loreen",
                    userLastname: "Dallas",
                    userId: "iuYmKKbSqMfWlARqIt4y2oTHytr1",
                    id: "9accd87a-3df1-4ecf-a3f2-54ff96a2cc50",
                    attending: [
                        {
                            name: "Bobby",
                            lastname: "Coleman",
                            userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Fmale2.pngc3b292b3-a351-4b3b-9ac5-8f7d0dcb3077?alt=media&token=5ad3cb4c-d65b-4b9a-bf26-eb73088a8a56",
                            userId: "FnNSENwcBGUGFv94jMIqN9E4pQn1"
                        }
                    ]
                },
                {
                    attending: [],
                    title: "New one 👀",
                    starts: 1737581400000,
                    ends: 1737585000000,
                    location: {
                        address: "Malabia 1720, C1414 Cdad. Autónoma de Buenos Aires, Argentina",
                        coordinates: {
                            lat: -34.58962,
                            lng: -58.42594
                        },
                        mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJ4we_eoe1vJURZ2qACroYgyc"
                    },
                    spots: 0,
                    isPrivate: false,
                    userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2FScreenshot%202024-12-13%20at%203.55.29%E2%80%AFPM.pnga29486b2-7843-4501-a61f-97d2b50ac146?alt=media&token=f7ca5960-ad73-4e50-b2ba-67edf0f0d6bd",
                    userName: "Loreen",
                    userLastname: "Dallas",
                    userId: "iuYmKKbSqMfWlARqIt4y2oTHytr1",
                    id: "31a5524c-7b26-45b2-8f75-1568cca8368d"
                },
                {
                    attending: [],
                    title: "Telescope night 🌌",
                    starts: 1737581400000,
                    ends: 1737585000000,
                    location: {
                        address: "Palmares Open Mall, RP82 2650, M5501 Godoy Cruz, Mendoza, Argentina",
                        coordinates: {
                            lat: -32.9557044,
                            lng: -68.8589034
                        },
                        mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJBU_ytkwKfpYREx144g6nxgQ"
                    },
                    spots: 1,
                    isPrivate: true,
                    userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2FScreenshot%202024-12-13%20at%203.55.29%E2%80%AFPM.pnga29486b2-7843-4501-a61f-97d2b50ac146?alt=media&token=f7ca5960-ad73-4e50-b2ba-67edf0f0d6bd",
                    userName: "Loreen",
                    userLastname: "Dallas",
                    userId: "iuYmKKbSqMfWlARqIt4y2oTHytr1",
                    id: "b9d647af-5fe9-4496-888c-b1fc4f327543"
                }
            ]
            return fakeData

            

        } catch ( error ) {
            throw error
        } 

    }, [ authToken ])

    const getAttendingEvents = useCallback( async () => {
        try{
            // //GETS EVENTS USER IS ATTENDING   
            // const events = await axios.get(`${process.env.REACT_APP_API_URL}/slots/attendingEvents`,{
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${ authToken  }`
            //     }
            // })  

            // return events.data
            const fakeData = [
                {
                    title: "Beers and stars 🌠",
                    starts: 1737230400000,
                    ends: 1737234000000,
                    userId: "FnNSENwcBGUGFv94jMIqN9E4pQn1",
                    userName: "Bobby",
                    userLastname: "Coleman",
                    userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Fmale2.pngc3b292b3-a351-4b3b-9ac5-8f7d0dcb3077?alt=media&token=5ad3cb4c-d65b-4b9a-bf26-eb73088a8a56",
                    id: "e74ced77-de46-4de1-9b84-0be554d4abea",
                    location: {
                        address: "Av. Corrientes 222 piso 19, C1043 Cdad. Autónoma de Buenos Aires, Argentina",
                        coordinates: {
                            lat: -34.6031892,
                            lng: -58.37064950000001
                        },
                        mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJL4vp1rI1o5UR2pdCZgadG9w"
                    }
                },
                {
                    title: "",
                    starts: 1737234000000,
                    ends: 1737237600000,
                    userId: "FnNSENwcBGUGFv94jMIqN9E4pQn1",
                    userName: "Bobby",
                    userLastname: "Coleman",
                    userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Fmale2.pngc3b292b3-a351-4b3b-9ac5-8f7d0dcb3077?alt=media&token=5ad3cb4c-d65b-4b9a-bf26-eb73088a8a56",
                    id: "f05baa8f-e888-4431-9651-42c70bf2fe55",
                    location: {
                        address: "The Tennis Ct, Birmingham B15 2RB, UK",
                        coordinates: {
                            lat: 52.4571796,
                            lng: -1.9259933
                        },
                        mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJQ4R0eUu8cEgRvt6MLRXJ_xg"
                    }
                }
            ]
            return fakeData

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