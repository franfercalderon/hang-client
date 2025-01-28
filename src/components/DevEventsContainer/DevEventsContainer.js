import { useCallback, useEffect, useState } from "react"
import Loader from "../Loader/Loader"
import useSlots from "../../hooks/useSlots"
import Swal from "sweetalert2"
import EventCard from "../EventCard/EventCard"

export default function EventsContainer() {

    //STATE 
    const [ isLoading, setIsLoading ] = useState()
    const [ showUserEvents, setShowUserEvents ] = useState( true )
    const [ userEvents, setUserEvents ] = useState( null )
    const [ attendingEvents, setAttendingEvents ] = useState( null )

    //HOOKS
    const { getAttendingEvents, getOwnEvents } = useSlots(  )

    //FUNCTIONS
    const fetchEvents = useCallback( async () => {
        try {
            setIsLoading( true )
            if( showUserEvents ){
                // const events = await getOwnEvents()
                // events.sort(( a, b ) => a.starts - b.starts ) 
                // console.log(events);
                const events = [
                    {
                        attending: [],
                        customList: [],
                        ends: 1738369800000,
                        id: "3542a0eb-26b4-4dcd-8b25-0d30c6f63085",
                        isPrivate: false,
                        location: 
                            {
                                address: '1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates', 
                                coordinates: {do:'someting'}, 
                                mapUrl: 'https://maps.google.com/?cid=18394360053605775330'
                            },
                        spots: 0,
                        starts: 1738360800000,
                        title: "Test Event",
                        userId: "FnNSENwcBGUGFv94jMIqN9E4pQn1",
                        userImg: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2FScreenshot%202025-01-22%20at%203.08.41%E2%80%AFPM.pnga0fda4b3-bedb-4610-bf34-a1b7192a88f3?alt=media&token=d26964e2-69c4-4bf3-a61a-435bc97a2650",
                        userLastname: "Coleman",
                        userName: "Bobby",
                        visibility: "everybody"
                    }
                ]
                setUserEvents( events )
            } else {
                // const events = await getAttendingEvents()
                // events.sort(( a, b ) => a.starts - b.starts )
                // setAttendingEvents( events )
            }
            setIsLoading( false )

        } catch ( error ) {

            setIsLoading( false )
            Swal.fire({
                title: 'Oops!',
                text: error.message,
                icon: 'warning',
                confirmButtonText: 'Ok',
                buttonsStyling: false,
                customClass: {
                    popup: 'hang-alert-container round-div div-shadow',
                    icon: 'alert-icon',
                    confirmButton: 'confirm-btn btn order2',
                    denyButton: 'deny-btn btn order1',
                }
            })
        }
    }, [ showUserEvents ])

    //EFFECTS
    useEffect(() => {
        fetchEvents()
    }, [ setShowUserEvents, fetchEvents ])

    return(
        <>
            <div className="section-container">
                <div className="full-width-toggle mt-1">
                    <div className={`inner ${ showUserEvents ? 'active' : '' }`} onClick={ () => setShowUserEvents( true ) }>
                        <p>My Hangs</p>
                    </div>
                    <div className={`inner ${ !showUserEvents ? 'active' : '' }`} onClick={() => setShowUserEvents( false )}>
                        <p>Joined Hangs</p>
                    </div>
                </div>

            </div>
            { isLoading ?
                <Loader/>
                :
                <div className="section-container">
                    {
                        showUserEvents ? 
                        <>
                            { userEvents &&

                                <>
                                    {
                                        userEvents.length > 0 ? 
                                        <>
                                            {
                                                userEvents.map(( event, idx ) => {
                                                    return(
                                                        
                                                        <EventCard event={ event } key={ idx } setIsLoading={ setIsLoading } refresh={ fetchEvents }  />
                                                    )
                                                })
                                            }
                                        </>
                                        :
                                        <div className="no-data-container centered">
                                            <p>You have no upcoming events hosted by you</p>
                                        </div>
                                    }
                                </>
                            }
                        </>
                        :
                        <>
                            { attendingEvents &&

                                <>
                                    {
                                        attendingEvents.length > 0 ? 
                                        <>
                                            {
                                                attendingEvents.map(( event, idx ) => {
                                                    return(
                                                        <EventCard event={ event } key={ idx } setIsLoading={ setIsLoading } refresh={ fetchEvents }/>
                                                    )
                                                })
                                            }
                                        </>
                                        :
                                        <div className="no-data-container centered">
                                            <p>You have no upcoming events</p>
                                        </div>
                                    }
                                </>

                            }
                        </>
                    }
                    
                </div>
            }
        
        </>


    )
}