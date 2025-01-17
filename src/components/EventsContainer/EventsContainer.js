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
    const { getAttendingEvents, getOwnEvents } = useSlots()

    //FUNCTIONS
    const fetchEvents = useCallback( async () => {
        try {
            setIsLoading( true )
            if( showUserEvents ){
                const events = await getOwnEvents()
                events.sort(( a, b ) => a.starts - b.starts )
                setUserEvents( events )
            } else {
                const events = await getAttendingEvents()
                events.sort(( a, b ) => a.starts - b.starts )
                setAttendingEvents( events )
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
    }, [ getAttendingEvents, getOwnEvents, showUserEvents ])

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
                                                        
                                                        <EventCard event={ event } key={ idx } setIsLoading={ setIsLoading }/>
                                                    )
                                                })
                                            }
                                        </>
                                        :
                                        <div>
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
                                                        <EventCard event={ event } key={ idx } setIsLoading={ setIsLoading }/>
                                                    )
                                                })
                                            }
                                        </>
                                        :
                                        <div>
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