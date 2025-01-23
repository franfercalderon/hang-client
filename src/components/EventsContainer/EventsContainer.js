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
                const events = await getOwnEvents()
                events.sort(( a, b ) => a.starts - b.starts )
                setUserEvents( events )
            } else {
                const events = await getAttendingEvents()
                events.sort(( a, b ) => a.starts - b.starts )
                setAttendingEvents( events )
            }
            setIsLoading( false )


            // setIsLoading( true )
            // const fakeEvents = [
            //     {
            //         attending: [
            //             {
            //                 lastname:"Dallas",
            //                 name:  "Loreen",
            //                 userId: "iuYmKKbSqMfWlARqIt4y2oTHytr1",
            //                 userImg:  "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2FScreenshot%202024-12-13%20at%203.55.29%E2%80%AFPM.pnga29486b2-7843-4501-a61f-97d2b50ac146?alt=media&token=f7ca5960-ad73-4e50-b2ba-67edf0f0d6bd"
            //             },
            //         ],
            //         customList: [
            //             {
            //                 id:  "iuYmKKbSqMfWlARqIt4y2oTHytr1",
            //                 imgUrl : "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2FScreenshot%202024-12-13%20at%203.55.29%E2%80%AFPM.pnga29486b2-7843-4501-a61f-97d2b50ac146?alt=media&token=f7ca5960-ad73-4e50-b2ba-67edf0f0d6bd",
            //                 lastname: "Dallas",
            //                 name:  "Loreen",
            //             }
            //         ],
            //         ends: 1737678600000,
            //         id:  "79963114-1906-4a22-9c2b-0a66591c6afe",
            //         isPrivate:  true,
            //         location :  {
            //             address: '1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates', 
            //             coordinates: {}, 
            //             mapUrl: 'https://maps.google.com/?cid=18394360053605775330'
            //         },
            //         spots: 1,
            //         starts :  1737673200000,
            //         title :  "Test Event 🪐",
            //         userId :  "FnNSENwcBGUGFv94jMIqN9E4pQn1",
            //         userImg:  "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Fmale2.pngc3b292b3-a351-4b3b-9ac5-8f7d0dcb3077?alt=media&token=5ad3cb4c-d65b-4b9a-bf26-eb73088a8a56",
            //         userLastname : "Coleman",
            //         userName:  "Bobby",
            //         visibility:  "custom",
            //     },
            // ]
            // setTimeout(() => {
            //     setUserEvents( fakeEvents )
            //     setIsLoading( false )
                
            // }, 1000);

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
                                                        
                                                        <EventCard event={ event } key={ idx } setIsLoading={ setIsLoading } refresh={ fetchEvents } />
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
                                                        <EventCard event={ event } key={ idx } setIsLoading={ setIsLoading } refresh={ fetchEvents }/>
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