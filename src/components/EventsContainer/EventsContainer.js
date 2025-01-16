import { useEffect, useState } from "react"
import Loader from "../Loader/Loader"

export default function EventsContainer() {

    //STATE 
    const [ isLoading, setIsLoading ] = useState()
    const [ showUserEvents, setShowUserEvents ] = useState( true )
    const [ userEvents, setUserEvents ] = useState( null )
    const [ scheduledEvents, setScheduledEvents ] = useState( null )

    //FUNCTIONS

    //EFFECTS
    useEffect(() => {
        if ( showUserEvents && !userEvents ){
            setIsLoading( true )
            //FETCH USER EVENTS
            const event = ['User Events']
            setTimeout(() => {
                setUserEvents( event )
                setIsLoading( false )
            }, 1000);
            //SET USER EVENTS STATE
        } else if ( !showUserEvents && !scheduledEvents ){
            setIsLoading( true )
            const event = ['Scheduled Events']
            setTimeout(() => {
                setScheduledEvents( event )
                setIsLoading( false )
            }, 1000);
        }

    }, [ showUserEvents, userEvents, scheduledEvents ])


    return(
        <>
            <div className="section-container mt-2">
                <div className="full-width-toggle mt-1">
                    <div className={`inner ${ showUserEvents ? 'active' : '' }`} onClick={() => setShowUserEvents( true )}>
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
                    {/* <button onClick={() => setShowUserEvents( !showUserEvents )}>CLICK</button> */}
                </div>
            }
        
        </>


    )
}