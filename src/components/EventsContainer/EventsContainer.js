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
            const event = ['lkaks']
            setTimeout(() => {
                setUserEvents( event )
            }, 1000);
            //SET USER EVENTS STATE
            setIsLoading( false )
        } else if ( !showUserEvents && !scheduledEvents ){
            setIsLoading( true )
            const event = ['lkaks']
            setTimeout(() => {
                setScheduledEvents( event )
            }, 1000);
            setIsLoading( false )
        }

    }, [ showUserEvents, userEvents, scheduledEvents ])


    return(

        <>
        { isLoading ?
        <Loader/>
        :
        <div className="section-container">
            <button onClick={() => setShowUserEvents( !showUserEvents )}>CLICK</button>
        </div>
        }
        </>

    )
}