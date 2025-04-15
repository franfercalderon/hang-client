import { useContext, useEffect, useState } from "react"
import useSlots from "../../hooks/useSlots"
import BtnDelete from "../BtnDelete/BtnDelete"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp, faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2"
import { AppContext } from "../../context/AppContext"
import useAlert from "../../hooks/useAlert"
import BtnSecondary from "../BtnSecondary/BtnSecondary"
import { useNavigate } from "react-router-dom"

export default function EventCard({ event, setIsLoading, refresh }){
    
    //HOOKS
    const { formatTimestampToDate, converTimestampToString, deleteOwnEvent, leaveEvent } = useSlots()
    const { alertInfo } = useAlert()

    //CONTEXT
    const { globalUser } = useContext( AppContext )

    //ROUTER
    const navigate = useNavigate()

    //STATE
    const [ showCardDetails, setShowCardDetails ]  = useState( false )
    const [ isOwnEvent, setIsOwnEvent ] = useState( null )
    

    //FUNCTIONS
    const runModalConfirmation = async ( eventId ) => {
        try {
            setIsLoading( true )
            if ( isOwnEvent ){

                await deleteOwnEvent( event.availableNow ? 'availableNowSlots' : 'scheduledSlots', eventId )   
    
            } else {
                await leaveEvent( event.availableNow ? 'availableNowSlots' : 'scheduledSlots', eventId )
            }
            await refresh()
            setIsLoading( false )
            Swal.fire({
                text: isOwnEvent ? 'Event Deleted' : 'You have left the Hang',
                icon: 'success' ,
                confirmButtonText: 'Ok',
                timer: 1300,
                buttonsStyling: false,
                showConfirmButton: false,
                showCancelButton: false,
                customClass: {
                    popup: 'hang-alert-container round-div div-shadow',
                    icon: 'alert-icon',
                    confirmButton: 'confirm-btn btn order2',
                    denyButton: 'deny-btn btn order1',
                }
            })
            
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
    }

    const handleDeleteEvent = async ( eventId ) => {

        Swal.fire({
            title: null,
            text: isOwnEvent ? 'Do you want delete your event? Friends that are attending will be notified about this.' : 'Do you want to leave this event?',
            icon: null,
            confirmButtonText: isOwnEvent ? 'Delete' : 'Leave',
            showDenyButton: true,
            denyButtonText: isOwnEvent ? 'Keep event' : 'Close',
            buttonsStyling: false,
            customClass: {
                popup: 'hang-alert-container round-div div-shadow',
                icon: 'alert-icon',
                confirmButton: 'confirm-btn btn order2',
                denyButton: 'deny-btn btn order1',
            }
        })
        .then( ( res ) => {
            if( res.isConfirmed ){
                runModalConfirmation( eventId )
            } 
        })
    }

    useEffect(() => {
        if ( globalUser ){
            setIsOwnEvent( globalUser.id === event.userId ? true : false )
        }
    }, [ globalUser, event ])


    return(
        <div className="event-card rounded">
            <div className={`title-container mb-05`}>
                <h3 className="font-big ">{ event.title ? event.title : isOwnEvent ? 'Your Hang' : `${ event.userName }'s Hang`}</h3>
                { event.description && event.description !==  '' &&
                    <p className="low-opacity">{ event.description }</p>
                }
                {
                    !showCardDetails &&
                    <p className="low-opacity">{ `${ event.availableNow ? 'Today' : formatTimestampToDate( event.starts ) }. ${ converTimestampToString( event.starts ) } - ${ converTimestampToString( event.ends ) }.` }</p>
                }
            </div>
            {
                !showCardDetails &&
                <div className="toggle-event-card-btn centered pointer" onClick={ () => setShowCardDetails( true )}>
                    <FontAwesomeIcon icon={ faChevronDown }/>
                </div>
            }
            {
                showCardDetails &&

                <div className="event-card-details">
                    <div className="details-header">
                        <span></span>
                        <p>Event Details</p>
                        <span></span>
                    </div>
                    {
                        showCardDetails &&
                        <div className="row">
                            <p className="mt-1"><span>Date:</span>{ ` ${ event.availableNow ? 'Today' : formatTimestampToDate( event.starts ) }.`}</p>
                        </div>
                    }
                    {
                        showCardDetails &&
                        <div className="row">
                            <p className="mt-1"><span>Time:</span>{ ` ${ converTimestampToString( event.starts ) } - ${ converTimestampToString( event.ends ) }.` }</p>
                        </div>
                    }
                    {
                        isOwnEvent &&
                        <div className="row">
                            <p className="mt-1"><span>Visibility:</span>{ ` ${ event.isPrivate ? 'Private' : 'Open' }`}</p>
                            {
                                event.availableNow &&
                                <div className="inline-help centered pointer" onClick={ () => alertInfo('Available Now events are visible to all your friends.') }>
                                    <p>?</p>
                                </div>
                            }
                        </div>
                    }
                    {
                        event.visibility && event.visibility === 'custom' &&
                        <>
                        {
                            isOwnEvent && event.customList &&
                            <p className="mt-1"><span>Invited:</span>{ ` ${ event.customList.length}` }</p>
                        }
                        {
                            isOwnEvent && event.customList.length > 0 &&
                            <ul >
                                {
                                    event.customList.map(( invited, idx ) => {
                                        return(
                                            <li key={ idx } className='mt-05'>
                                                    <img className="profile-img-min" src={ invited.imgUrl } alt={ `${invited.name} ${ invited.lastname}` }/>
                                                {`${invited.name} ${ invited.lastname}`}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        }
                        </>
                    }
                    {
                        isOwnEvent &&
                        <p className="mt-1"><span>Attendants:</span>{ ` ${ event.attending.length > 0 ? `${ event.attending.length }:` : event.attending.length }` }</p>
                    }
                    {
                        isOwnEvent && event.attending.length > 0 &&
                        <ul >
                            {
                                event.attending.map(( attendant, idx ) => {
                                    return(
                                        <li key={ idx } className='mt-05'>
                                                <img className="profile-img-min" src={ attendant.userImg } alt={ `${attendant.name} ${ attendant.lastname}` }/>
                                            {`${attendant.name} ${ attendant.lastname}`}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                    <p className="mt-1"><span>Location: </span>{ event.location.address ? event.location.address : event.location }</p>
                    {   
                        event.location.mapUrl &&
                        <div className="directions-btn rounded pointer mt-1">
                            <a href={ event.location.mapUrl } target="_blank" rel="noopener noreferrer" >Get Directions</a>
                            <FontAwesomeIcon icon={ faLocationArrow }/>
                        </div>
                        
                    }
                    <div className="mt-2" >
                        {
                            isOwnEvent && !event.availableNow &&
                            <BtnSecondary displayText={ 'Edit Event'} enabled={ true } submit={ false } action={ () =>navigate('/editEvent', { state: { event } }) }/>
                        }
                        <BtnDelete displayText={  !isOwnEvent ? 'Leave Event' : 'Delete Event' } action={ () => handleDeleteEvent( event.id ) } enabled={ true }/>
                    </div>
                    <div className="toggle-event-card-btn centered pointer" onClick={ () => setShowCardDetails( false )}>
                        <FontAwesomeIcon icon={ faChevronUp }/>
                    </div>
                    
                </div>
            }
        </div>
    )
}
